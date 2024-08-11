import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import { Typography } from "@mui/material";

function Timer() {
  const { secondsRemaining, dispatch } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      <Typography variant="h5" gutterBottom sx={{ margin: 5 }}>
        {mins < 10 && "0"}
        {mins}:{secs < 10 && "0"}
        {secs}
      </Typography>
    </div>
  );
}

export default Timer;
