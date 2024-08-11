import { useCallback, useEffect, useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import Options from './Options';
import { Qn } from '../type';
import IndivOptions from './IndivOptions';

function IndivQuestion(props: any) {
    console.log('indiview');
    const { overrideAnswer } = props;
    const { index, dispatch } = useQuiz();
    const [curQuestion, setCurQuestion] = useState<Qn>();

    console.log(props);
    console.log(!overrideAnswer);

    const getCurrentQuestion = useCallback(async () => {
        const res = await (
            await fetch(`http://localhost:8000/question?qid=${index}`)
        ).json();
        dispatch({ type: 'updateCurrQuestion', payload: res });
        setCurQuestion(res);
    }, [dispatch, index]);

    useEffect(() => {
        if (!overrideAnswer) {
            getCurrentQuestion();
        }
    }, [getCurrentQuestion, index, overrideAnswer]);

    return (
        <div>
            {curQuestion && (
                <>
                    <h4>{curQuestion.question}</h4>
                    <IndivOptions
                        options={curQuestion.options}
                        correctOption={curQuestion.correctOption}
                        overrideAnswer={overrideAnswer}
                    />
                </>
            )}
        </div>
    );
}

export default IndivQuestion;