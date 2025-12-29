import React from "react";
import Select from "react-select";

/* ===================== TYPES ===================== */

type SelectedOption = {
  questionId: number;
  answerValue: string | string[];
};

type QuestionProps = {
  selectedOptions: SelectedOption[];
  handleOptionChange: (
    questionId: number,
    answerValue: string | string[]
  ) => void;
};

/* ===================== CONSTANTS ===================== */

// Mapping Q3 answer → Question text
const AGE_QUESTION_MAP: Record<string, string> = {
  child: "Age of child",
  myself: "I am of age",
  sibling: "Age of sibling",
  friend: "Age of Friend",
  relative: "Age of Relative",
};

// Summary text (same for all)
const AGE_SUMMARY =
  "Knowing the age allows us to create matches that are compatible and appropriate for the life stage";

/* ===================== COMPONENT ===================== */

const Question6: React.FC<QuestionProps> = ({
  selectedOptions,
  handleOptionChange,
}) => {
  /* ---------- Get Q3 Answer ---------- */
  const q3Answer = selectedOptions
    .find((a) => a.questionId === 3)
    ?.answerValue?.toString()
    .toLowerCase();

  /* ---------- Dynamic Question ---------- */
  const question = {
    id: 4,
    text: AGE_QUESTION_MAP[q3Answer ?? "myself"] ?? "I am of age",
    summary: AGE_SUMMARY,
    options:
      q3Answer === "child"
        ? Array.from({ length: 85 - 18 + 1  }, (_, i) => String(i + 18)) // child age
        : Array.from({ length: 85 - 18 + 1 }, (_, i) => String(i + 18)), // adult age
  };

  /* ---------- React Select Options ---------- */
  const ageOptions = question.options.map((option) => ({
    value: option,
    label: option,
  }));

  /* ---------- Selected Value ---------- */
  const selectedOption = selectedOptions.find(
    (selected) => selected.questionId === question.id
  );

  return (
    <div className="text-left md:text-center">
      <h2 className="w-full text-2xl font-bold md:text-3xl mb-4">
        {question.text}
      </h2>

      <p className="text-[#FFFFFF90] mb-6">{question.summary}</p>

      <div className="md:w-auto py-4">
        <Select
          options={ageOptions}
          value={ageOptions.find(
            (option) => option.value === selectedOption?.answerValue
          )}
          onChange={(selected) =>
            handleOptionChange(question.id, selected?.value || "")
          }
          placeholder="Select age"
          className="w-full"
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: "#FD5C90",
              color: "white",
              borderColor: state.isFocused ? "#3b82f6" : "#374151",
              boxShadow: "none",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#1f2937",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected
                ? "#FD5C90"
                : state.isFocused
                ? "#ffffff"
                : "#FD5C90",
              color: "black",
              cursor: "pointer",
            }),
            placeholder: (base) => ({
              ...base,
              color: "white",
            }),
            input: (base) => ({
              ...base,
              color: "white",
            }),
          }}
        />
      </div>
    </div>
  );
};

export default Question6;
