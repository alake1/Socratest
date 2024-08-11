import { useEffect, useState } from 'react';
import { useQuiz } from '../context/QuizContext';

function IndivOptions(props: any) {
    const { options, correctOption, overrideAnswer } = props;
    const { dispatch, answer, status } = useQuiz();
    const [selectedAnswer, setSelectedAnswer] = useState(
        overrideAnswer || answer
    );
    const hasAnswer = answer !== null;
    useEffect(() => {
        if (status !== 'finished') {
            setSelectedAnswer(answer);
        }
    }, [answer, status]);
    return (
        <div className='options'>
            {options.map((option: any, index: number) => (
                <button
                    className={`btn btn-option ${index === selectedAnswer ? 'answer' : ''
                        } ${hasAnswer
                            ? index === correctOption && status === 'finished'
                                ? 'correct'
                                : 'wrong'
                            : ''
                        }`}
                    key={option}
                    onClick={() => {
                        dispatch({ type: 'newAnswer', payload: index });
                        setSelectedAnswer(index);
                    }}
                    disabled={status === 'finished'}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default IndivOptions;