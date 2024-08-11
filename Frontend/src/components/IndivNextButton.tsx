import { useQuiz } from '../context/QuizContext';

function IndivNextButton() {
    const { dispatch, answer, index, numQuestions } = useQuiz();

    //if (answer === null) return <></>;
    //if (index < numQuestions - 1)
    return (answer === null ? <></> : (index < numQuestions - 1) ?
        <button
            className='btn btn-ui'
            onClick={() => dispatch({ type: 'indivnewQuestion', payload: answer })}
        >
            Next
        </button>
        :
        <button
            className='btn btn-ui'
            onClick={() => dispatch({ type: 'finished', payload: answer })}
        >
            Finish
        </button>
    );
}

export default IndivNextButton;