export interface Qn {
    id: number | undefined;
    question: string;
    options: string[];
    correctOption: number | undefined;
    points: number;
    isComplete: boolean;
    successfull: boolean;
    selectedOption: number | undefined;
    explanation: string | undefined;
}

export type handleResponseprops = {
    selectedOption: number | undefined;
    questionId: number;
    correctOptionId: number;
};

export type option = {
    id: string;
    value: string;
    isSelected: boolean;
    isCorrect: boolean;
};

export type Qnl = {
    questions: Qn[];
};