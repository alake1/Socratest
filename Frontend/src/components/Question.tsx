import React, { useState } from 'react';
import InputRadio from './InputRadio';
import SelectForm from './SelectForm';
import Footer from './Footer';
import { useQuiz } from '../context/QuizContext';
import { Qn } from '../type';
import { Typography } from '@mui/material';

type props = {
  question: Qn;
  handleResponse: any;
}

const QuestionEl: React.FC<props> = (props) => {

  const { question, handleResponse } = props;

  //console.log(question);
  const [selectedOption, setSelectedOption] = useState<number | undefined>(undefined);
  const { status } = useQuiz();

  const handleClick = (e: any) => {
    e.preventDefault();

    handleResponse({
      questionId: question.id,
      selectedOption,
      correctOptionId: question.correctOption
    });

  };

  const formSelector = (question: Qn) => {
    return question.options.map((inputOption: string, index: number) => (
      <InputRadio
        isComplete={question.isComplete || status === "finished"}
        label={inputOption}
        key={index}
        optionValue={index}
        refName={question.question}
        setSelectedOption={setSelectedOption}
        isCorrect={index === question.correctOption}
        selectedOption={question.selectedOption}
      />
    ))
  };
  const getUserAnswer = (isCompleted: boolean) => {
    const messageType = question.successfull ? "success" : "error";
    return (
      <div className={"results-message " + messageType}>
        {isCompleted ? (
          <h5 style={{ margin: 0 }}>
            {question.successfull ? "Correct!" : "Incorrect!"}
          </h5>
        ) : (
          <h5 style={{ margin: 0 }}>Unanswered</h5>
        )}
        <p style={{ margin: 0 }}>
          Response is:{" "}
          <small>
            {question.options.find(
              (e: any, index: any) => index === question.correctOption
            )}
          </small>
        </p>
        <p>{question.explanation}</p>
      </div>
    )
  };
  return (
    <div className="question-block ">
      <Typography variant="h5" gutterBottom sx={{ margin: 5 }}>
        {question.question}
      </Typography>
      {/*<h3 style={{ marginBottom: "10px" }}>{question.question}</h3>*/}
      <form className='Question-form'>
        {formSelector(question)}
        <Footer>
          <button className="btn btn-default Submit-button" disabled={question.isComplete || status === "finished"} type="button" onClick={handleClick} style={{ marginTop: 25 }}> Submit </button>
        </Footer>
      </form>
      {(question.isComplete || status === "finished") && getUserAnswer(question.isComplete)}
    </div>
  );
};

export default QuestionEl;