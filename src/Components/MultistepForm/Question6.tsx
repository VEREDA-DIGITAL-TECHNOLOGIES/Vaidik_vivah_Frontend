import React from 'react';
import Select from 'react-select';

const question = [
    {
        id: 4,
        text: "I am of age",
        summary:
            "Knowing your age allows us to create matches that are compatible and appropriate for your life stage",
        options: Array.from({ length: 85 - 18 + 1 }, (_, i) => String(i + 18)),
    },
];

type SelectedOption = { questionId: number; answerValue: string | string[] };

type QuestionProps = {
    selectedOptions: SelectedOption[];
    handleOptionChange: (questionId: number, answerValue: string | string[]) => void;
};

const Question6: React.FC<QuestionProps> = ({ selectedOptions, handleOptionChange }) => {
    const ageOptions = question[0].options.map((option) => ({
        value: option,
        label: option,
    }));

    const selectedOption = selectedOptions.find(
        (selected) => selected.questionId === question[0].id
    );

    return (
        <div>
            {question.map((ques) => (
                <div className="text-left md:text-center" key={ques.id}>
                    <h2 className="w-full text-2xl font-bold md:text-3xl mb-4">
                        {ques.text}
                    </h2>
                    <p className="text-[#FFFFFF90]">{ques.summary}</p>

                    <div className="md:w-auto py-4">
                        <Select
                            options={ageOptions}
                            value={ageOptions.find(option => option.value === selectedOption?.answerValue)}
                            onChange={(selected) =>
                                handleOptionChange(ques.id, selected?.value || "")
                            }
                            className="w-full"
                            placeholder="Select your age"
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: '#FD5C90', // Dark background
                                    color: 'white',
                                    borderColor: state.isFocused ? '#3b82f6' : '#374151', // Tailwind-like blue on focus
                                    boxShadow: 'none',
                                }),
                                singleValue: (baseStyles) => ({
                                    ...baseStyles,
                                    color: 'white',
                                }),
                                menu: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: '#1f2937',
                                }),
                                option: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: state.isSelected
                                        ? '#FD5C90'
                                        : state.isFocused
                                            ? '#ffffff'
                                            : '#FD5C90',
                                    color: 'black',
                                    cursor: 'pointer',
                                }),
                                placeholder: (baseStyles) => ({
                                    ...baseStyles,
                                    color: 'white', // Tailwind-like gray-400
                                }),
                                input: (baseStyles) => ({
                                    ...baseStyles,
                                    color: 'white',
                                }),
                            }}
                        />

                    </div>
                </div>
            ))}
        </div>
    );
};

export default Question6;