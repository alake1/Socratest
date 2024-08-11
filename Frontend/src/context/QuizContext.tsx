import { createContext, useReducer, useContext, useEffect } from "react"
import { updateDoc, doc, getDoc } from "firebase/firestore"
import { auth, database } from "../constants/firebase"
import { toast } from 'react-toastify';
import axios from "axios";
const QuizContext = createContext<any>({})

const SECS_PER_QUESTION = 30
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  currQuestion: [],
  answeredQuestions: []
}


function reduce(state: any, action: any) {
  // get user in firebase
  //const userRef = doc(database, `user/${auth.currentUser?.uid}`)
  console.log(JSON.stringify(action));
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" }
    case "dataFailed":
      return { ...state, questions: action.payload, status: "error" }
    case "start":
      console.log(action);
      const topic = action.topic.sub;
      //state['topic'] = topic;
      const questions = action.questions;
      return {
        ...state,
        topic: action.topic.sub,
        status: "active",
        questions: questions,
        secondsRemaining: state.questions?.length * SECS_PER_QUESTION,
      }
    case "startindiv":
      console.log('indiv');
      console.log(action);
      // const indivtopic = action.topic.topic;
      //state['topic'] = topic;
      const indivquestion = action.question;
      return {
        ...state,
        topic: action.topic.sub,
        status: "indivactive",
        indivquestion: indivquestion,
        secondsRemaining: state.questions?.length * SECS_PER_QUESTION,
      }
    case "updateQuestions":
      console.log(action.payload);
      return { ...state, questions: action.payload }
    case 'updateCurrQuestion':
      return {
        ...state,
        currQuestion: action.payload,
      };
    case "newAnswer":
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    case "newQuestion":
      return { ...state, index: state.index + 1, answer: null }
    case 'indivnewQuestion':
      return {
        ...state,
        answeredQuestions: [
          ...state.answeredQuestions,
          { ...state.currQuestion, selected: action.payload },
        ],
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" }
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      }
    case "finished":
      // update user point
      // updateDoc(userRef, {
      //   point: state.points,
      // })
      if (action.payload.reason === "timeout") {
        toast.error("Time has been ended", {
          className: "toast-error",
        })
      } else {
        toast.success("Quiz has been submitted", {
          className: "toast-success",
        })
      }
      return {
        ...state,
        status: "finished",
        points: action.payload.successfulled,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }
    case "finished":
      // update user point
      // updateDoc(userRef, {
      //   point: state.points,
      // })
      if (action.payload.reason === "timeout") {
        toast.error("Time has been ended", {
          className: "toast-error",
        })
      } else {
        toast.success("Quiz has been submitted", {
          className: "toast-success",
        })
      }
      return {
        ...state,
        status: "finished",
        points: action.payload.successfulled,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }
    default:
      throw new Error("Action is unKnown")
  }
}

function QuizProvider({ children }: any) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining, topic, indivquestion },
    dispatch,
  ] = useReducer(reduce, initialState);
  console.log(status);
  console.log(dispatch);
  // const =questions[index]
  const numQuestions = questions?.length ?? 3;
  const maxPossiblePoints = questions?.reduce(
    (prev: any, cur: any) => prev + cur.points,
    0
  )
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "dataReceived",
          payload: data.map((question: any, index: number) => ({
            ...question,
            id: index,
            selectedOption: null,
            successfull: false,
          })),
        })
      )
      .catch(() => dispatch({ type: "dataFailed" }))

    dispatch({ type: "dataReceived", payload: [] })
  }, [])

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        maxPossiblePoints,
        numQuestions,
        dispatch,
        topic
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined)
    throw new Error("QuizContext was used outside the Provider")
  return context
}
export { useQuiz, QuizProvider }
