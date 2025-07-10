import React from "react";

const question = [
    {
        id: 12,
        text: "What are your spiritual goals for the future?",
    },
];

type QuestionProps = {
    selectedOptions: { questionId: number; answerValue: string | string[] }[];
    handleOptionChange: (questionId: number, answerValue: string | string[]) => void;
};

const Question15: React.FC<QuestionProps> = ({ selectedOptions, handleOptionChange }) => {
    const getSelectedValue = (questionId: number) => {
        const selected = selectedOptions.find((sel) => sel.questionId === questionId);
        return typeof selected?.answerValue === "string" ? selected.answerValue : "";
    };

    return (
        <div>
            {question.map((ques) => {
                const value = getSelectedValue(ques.id);

                return (
                    <div key={ques.id} className="text-left md:text-center">
                        <h2 className="w-full text-2xl font-bold md:text-3xl mb-4">{ques.text}</h2>

                        <div className="mt-2 flex justify-center">
                            <input
                                type="text"
                                placeholder="Type your answer"
                                value={value}
                                onChange={(e) => handleOptionChange(ques.id, e.target.value)}
                                className="w-full max-w-md px-4 py-2 border border-[#FD5C90] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FD5C90]"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Question15;
