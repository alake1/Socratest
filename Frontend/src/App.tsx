import "./App.css"
import React, { useState, useEffect, useRef } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import "./constants/firebase" // Import this file to initialize Firebase
import "./App.css"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { QuizProvider, useQuiz } from "./context/QuizContext"
import Header from "./components/Header";
import Topics from "./components/Topics"
import GeneralK from "./components/GeneralK";
import Questionlist from "./components/QuestionList";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import StartScreen from "./components/StartScreen";
import Sats from "./components/Sats";
import Uploader from "./components/Upload";
import IndivQuestion from "./components/IndividualQuestion"
import IndivNextButton from "./components/IndivNextButton"
const auth = getAuth();



const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const { status, dispatch, topic } = useQuiz();
  var { questions, indivquestion } = useQuiz();

  console.log(status);
  console.log(status === "indivactive");

  const myRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        // User is signed out
        setUser(null)
      }
    })

    return () => unsubscribe() // Cleanup on component unmount
  }, [auth])

  return (
    <div className="app">
      <Header user={user} />
      {status === "ready" && <><StartScreen myRef={myRef} />
        <Topics refProp={myRef} />
        <Sats />
        <Uploader />
        <GeneralK />
      </>}

      {["active", "finished"].includes(status) && (
        <>
          <div>
            <Timer />

            <Questionlist />
            <Footer>
              <NextButton />
            </Footer>
          </div>
        </>
      )}
      {status === "indivactive" && (
        <>
          <IndivQuestion />
          <Footer>
            <IndivNextButton />
          </Footer>
        </>
      )}
      {status === "indivactive" && (
        <>
          <h1>Indiv</h1>
        </>
      )}
    </div>
  )
}

export default App
