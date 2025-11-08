import React from "react";

const question = [
    {
        id: 9,
        text: "Which spiritual organization do you follow?",
        options: [
            "ISKCON",
            "Isha Foundation",
            "Brahma Kumaris",
            "Premanand Ji Maharaj",
            "Gayatri Pariwar",
            "Other",
        ],
    },
];

type QuestionProps = {
    selectedOptions: { questionId: number; answerValue: string | string[] }[];
    handleOptionChange: (
        questionId: number,
        answerValue: string | string[]
    ) => void;
};

const Question12: React.FC<QuestionProps> = ({
    selectedOptions,
    handleOptionChange
}) => {
    const getSelectedValue = (questionId: number) => {
        const selected = selectedOptions.find((sel) => sel.questionId === questionId);
        return typeof selected?.answerValue === "string" ? selected.answerValue : "";
    };

    
    

    

    return (
        <div className="text-left md:text-center">
            {question.map((ques) => (
                <div key={ques.id}>
                    <h2 className="w-full text-2xl font-bold md:text-3xl mb-4">
                        {ques.text}
                    </h2>

                    <div className="relative py-4 flex justify-center">
                        <select
                            title="options"
                           value={getSelectedValue(ques.id)}
                          onChange={(e) => handleOptionChange(ques.id, e.target.value)}
                            className="w-full appearance-none bg-[#FD5C90] text-white border border-[#FD5C90] rounded-xl px-5 py-3 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#FD5C90] transition duration-200"
                        >
                            <option value="" disabled className="text-white">
                                Select an option
                            </option>
                            {ques.options.map((option, index) => (
                                <option key={index} value={option} className="bg-[#FD5C90]">
                                    {option}
                                </option>
                            ))}
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>

                    
                </div>
            ))}
        </div>
    );
};

export default Question12;






// import React from "react";

// const question = [
//     {
//         id: 9,
//         text: "Which spiritual organization do you follow?",
       
//         options: ["ISKCON", "Art of Living", "Brahma Kumaris","Ramakrishna Mission","Gayatri Pariwar", "Others"],
//     },
// ];

// type QuestionProps = {
//     selectedOptions: { questionId: number; answerValue: string | string[] }[];
//     handleOptionChange: (questionId: number, answerValue: string | string[]) => void;
// };

// const Question12: React.FC<QuestionProps> = ({ selectedOptions, handleOptionChange }) => {
//     const getSelectedValue = (questionId: number) => {
//         const selected = selectedOptions.find((sel) => sel.questionId === questionId);
//         return typeof selected?.answerValue === "string" ? selected.answerValue : "";
//     };

//     return (
//         <div>
//             {question.map((ques) => (
//                 <div key={ques.id} className="text-left md:text-center">
//                     <h2 className="w-full text-2xl font-bold md:text-3xl mb-4">{ques.text}</h2>
                    

//                     <div className=" relative py-4 flex justify-center">
//                         <select title="options"
//                             value={getSelectedValue(ques.id)}
//                             onChange={(e) => handleOptionChange(ques.id, e.target.value)}
//                             className="w-full appearance-none bg-[#FD5C90]  text-[#fffff] border border-[#FD5C90] rounded-xl px-5 py-3  text-lg  shadow-md focus:outline-none focus:ring-2 focus:ring-[#FD5C90] transition duration-200"

//                         >
//                             <option value="" disabled className="text-white">Select an option</option>
//                             {ques.options.map((option, index) => (
//                                 <option key={index} value={option} className="bg-[#FD5C90]">
//                                     {option}
//                                 </option>
//                             ))}
//                         </select>
//                         {/* Dropdown arrow */}
//                         <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
//                             <svg
//                                 className="w-5 h-5 text-[#ffffff]"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Question12;
