import React from "react";

const question = [
    {
        id: 3,
        text: "Have you tried looking for your life partner online before?",
        summary:
            "Understanding your experience with online matchmaking helps us tailor your journey for a smoother and more effective process",
        options: ["I am new to it", "Sometimes", "Prefer not to say"],
    },
];

type QuestionProps = {
    selectedOptions: { questionId: number; answerValue: string | string[] }[];
    handleOptionChange: (questionId: number, answerValue: string | string[]) => void;
};

const Question2: React.FC<QuestionProps> = ({ selectedOptions, handleOptionChange }) => {
    const getSelectedValue = (questionId: number) => {
        const selected = selectedOptions.find((sel) => sel.questionId === questionId);
        return typeof selected?.answerValue === "string" ? selected.answerValue : "";
    };

    return (
        <div>
            {question.map((ques) => (
                <div key={ques.id} className="text-left md:text-center">
                    <h2 className="w-full text-2xl font-Proxima-Nova-SemiBold md:text-3xl mb-4">
                        {ques.text}
                    </h2>
                    <p className="text-[#FFFFFF90]">{ques.summary}</p>

                    <div className="py-4 flex justify-center">
                        <select title="options"
                            value={getSelectedValue(ques.id)}
                            onChange={(e) => handleOptionChange(ques.id, e.target.value)}
                            className="bg-white text-[#007EAF] px-6 py-4 rounded-xl w-full  text-lg"
                        >
                            <option value="" disabled>Select an option</option>
                            {ques.options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Question2;
