import React, { useEffect } from 'react';
import QuestionEl from './Question';
import { useQuiz } from '../context/QuizContext';
import { handleResponseprops, Qn } from "../type";
import './../styles/style.css';

type option = {
  id: string;
  value: string;
  isSelected: boolean;
  isCorrect: boolean;
}

type Qnl = {
  questions: Qn[];
}

const Questionlist: React.FC = () => {
  const { dispatch, secondsRemaining, state, questions } = useQuiz();
  console.log(questions);
  const totalQuestions = questions?.length
  const allCompleted = questions.filter((e: Qn) => e.isComplete)?.length
  const isAllCompleted =
    allCompleted === totalQuestions || secondsRemaining <= 0
  const nextQuestion = questions.find((e: Qn) => e.isComplete === false)
  const successfulled = questions.filter((e: Qn) => e.successfull)?.length
  const isAllCompletedClass = isAllCompleted ? " completed " : " incomplete "

  const handleResponse = (resp: handleResponseprops) => {
    const { questionId, selectedOption, correctOptionId } = resp
    const updatedListQuestions = questions.map((currentQuestion: Qn) => {
      if (currentQuestion.id === questionId) {
        currentQuestion = {
          ...currentQuestion,
          isComplete: !currentQuestion.isComplete,
          selectedOption: selectedOption,
          successfull: selectedOption === correctOptionId,
        }
      }
      return currentQuestion
    })

    dispatch({
      type: "updateQuestions",
      payload: updatedListQuestions,
    })
  }

  useEffect(() => {
    if (isAllCompleted && state !== "finished") {
      dispatch({
        type: "finished",
        payload: {
          reason: secondsRemaining <= 0 ? "timeout" : "completed",
          successfulled,
        },
      })
    }
  }, [dispatch, isAllCompleted])

  return (
    <div style={{ fontFamily: 'Rubik' }}>
      {isAllCompleted ? (
        questions.map((questionElement: Qn) => {
          console.log(questionElement)
          return (
            <QuestionEl
              key={questionElement.id}
              question={questionElement}
              handleResponse={handleResponse}
            />
          )
        })
      ) : (
        <QuestionEl
          key={nextQuestion?.id}
          question={nextQuestion!}
          handleResponse={handleResponse}
        />
      )}
      <hr
        className="question-block horizontal-rule"
        style={{ marginTop: "15px" }}
      />
      <div className={"question-block horizontal-rule"}>
        {isAllCompleted ? (
          <div className={isAllCompletedClass + " block-footer"}>
            <div className="score">
              <small className="completed-answer">
                {" "}
                Answered: {allCompleted + "/" + totalQuestions}
              </small>
              <br />
              <small className="success-answer">
                {" "}
                Correct: {successfulled + "/" + totalQuestions}
              </small>
              <br />
              <small className="error-answer">
                {" "}
                Incorrect:{" "}
                {totalQuestions - successfulled + "/" + totalQuestions}{" "}
              </small>
            </div>
            <button
              className="btn btn-default"
              type="reset"
              onClick={() => {
                localStorage.removeItem("listQuestions")
                window.location.reload()
              }}
            >
              Try again
            </button>
          </div>
        ) : (
          <div className={isAllCompletedClass + "score"}>
            Progress : {allCompleted + "/" + totalQuestions}
          </div>
        )}
      </div>
    </div>
  )
}

export default Questionlist
