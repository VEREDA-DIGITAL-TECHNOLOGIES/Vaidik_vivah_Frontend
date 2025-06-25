import React from "react";

const questions = [
    {
        id: 1,
        text: "I am a",
        options: ["Man", "Woman"],
    },
    {
        id: 2,
        text: "I am looking for a",
        options: ["Man", "Woman"],
    },
];

type QuestionProps = {
    selectedOptions: { questionId: number; answerValue: string | string[] }[];
    handleOptionChange: (questionId: number, answerValue: string | string[]) => void;
};

const Question1: React.FC<QuestionProps> = ({ selectedOptions, handleOptionChange }) => {
    const handleChange = (questionId: number, answerValue: string) => {
        handleOptionChange(questionId, answerValue);

        // If question 1 is answered, auto-fill question 2 with opposite
        if (questionId === 1) {
            const opposite = answerValue === "Man" ? "Woman" : "Man";
            handleOptionChange(2, opposite);
        }
    };

    return (
        <div className="flex flex-col gap-10 py-6 ">
            {questions.map((question) => {
                const selected = selectedOptions.find(sel => sel.questionId === question.id)?.answerValue || "";

                return (
                    <div key={question.id} className="flex flex-col gap-4 ">
                        <p className="font-[Bembo-MT-Pro-Bold] text-white text-xl sm:text-2xl md:text-3xl">
                            {question.text}
                        </p>

                        <div className="relative w-full sm:w-[350px] md:w-[700px]">
                            <select title="option"
                                value={selected}
                                onChange={(e) => handleChange(question.id, e.target.value)}
                                className="w-full appearance-none bg-white text-[#007EAF] border border-[#007EAF] rounded-xl px-5 py-3  text-lg  shadow-md focus:outline-none focus:ring-2 focus:ring-[#007EAF] transition duration-200"
                            >
                                <option value="" disabled>
                                    Select an option
                                </option>
                                {question.options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            {/* Dropdown arrow */}
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                                <svg
                                    className="w-5 h-5 text-[#007EAF]"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Question1;
