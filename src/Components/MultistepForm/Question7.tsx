import React from 'react';
import Select from 'react-select';
import type { StylesConfig } from 'react-select';
type Option = {
    value: string;
    label: string;
};

type SelectedOption = {
    questionId: number;
    answerValue: string | string[];
};

const question = [
    {
        id: 5,
        text: "I am looking for a partner of age",
        summary:
            "Specifying the age range of your ideal partner helps us connect you with individuals who match your preferences",
        options: Array.from({ length: 85 - 18 + 1 }, (_, i) => String(i + 18)),
        text2: "to",
        options1: Array.from({ length: 85 - 18 + 1 }, (_, i) => String(i + 18)),
    },
];

type QuestionProps = {
    selectedOptions: SelectedOption[];
    handleOptionChange: (questionId: number, answerValue: string) => void;
};



const customSelectStyles: StylesConfig<Option, false> = {
    control: (base, state) => ({
        ...base,
        backgroundColor: '#FD5C90',
        color: 'white',
        borderColor: state.isFocused ? '#3b82f6' : '#374151',
        boxShadow: 'none',
    }),
    singleValue: (base) => ({
        ...base,
        color: 'white',
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: '#1f2937',
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? '#FD5C90'
            : state.isFocused
                ? '#ffffff'
                : '#FD5C90',
        color: 'black',
        cursor: 'pointer',
    }),
    placeholder: (base) => ({
        ...base,
        color: 'white',
    }),
    input: (base) => ({
        ...base,
        color: 'white',
    }),
};


const Question7: React.FC<QuestionProps> = ({
    selectedOptions,
    handleOptionChange,
}) => {
    const ageOptions = question[0].options.map((option) => ({
        value: option,
        label: option,
    }));

    const ageOptions1 = question[0].options1.map((option) => ({
        value: option,
        label: option,
    }));

    const handleAgeChange = (selectedOption: Option | null, isFirst: boolean) => {
        const currentOption = selectedOptions.find(
            (opt) => opt.questionId === question[0].id
        );

        const currentValue = currentOption?.answerValue || "";
        const [firstAge, secondAge] = (currentValue as string).split("-");

        let updatedValue;
        if (isFirst) {
            updatedValue = `${selectedOption?.value || ""}-${secondAge || ""}`;
        } else {
            updatedValue = `${firstAge || ""}-${selectedOption?.value || ""}`;
        }

        handleOptionChange(question[0].id, updatedValue.trim());
    };

    const currentOption = selectedOptions.find(
        (opt) => opt.questionId === question[0].id
    );
    const [selectedFirstAge, selectedSecondAge] = Array.isArray(currentOption?.answerValue)
        ? []
        : (currentOption?.answerValue || "").split("-");

    return (
        <div>
            {question.map((ques) => (
                <div className="text-left md:text-center" key={ques.id}>
                    <h2 className="w-full text-2xl font-bold md:text-3xl mb-4">
                        {ques.text}
                    </h2>
                    <p className="text-[#FFFFFF90]">{ques.summary}</p>

                    <div className="md:w-auto py-6 flex items-center justify-center space-x-4">
                        <Select
                            options={ageOptions}
                            styles={customSelectStyles}
                            className="w-full"
                            placeholder="Select age"
                            value={ageOptions.find(
                                (option) => option.value === selectedFirstAge?.trim()
                            )}
                            onChange={(selectedOption) =>
                                handleAgeChange(selectedOption, true)
                            }
                        />

                        <span className="text-white">{ques.text2}</span>

                        <Select
                            options={ageOptions1}
                            styles={customSelectStyles}
                            className="w-full"
                            placeholder="Select age"
                            value={ageOptions1.find(
                                (option) => option.value === selectedSecondAge?.trim()
                            )}
                            onChange={(selectedOption) =>
                                handleAgeChange(selectedOption, false)
                            }
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Question7;
