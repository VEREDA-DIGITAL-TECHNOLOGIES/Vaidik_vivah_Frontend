"use client";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

import Image from "next/image";

const questions = [
  {
    id: 1,
    text: "I am a",
    options: ["men", "women", "Non-binary"],
    text2: "I am looking for a",
    options1: ["Man", "Women", "Non-binary"],
    type: "checkbox",
    skip: false,
  },
  {
    id: 2,
    text: "Have you tried looking for your  life partner online before?",
    summary:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    options: ["I am new to it", "Sometimes", "Prefer not to say"],
    type: "checkbox",
    skip: false,
  },
  {
    id: 3,
    text: "What are your wedding goals?",
    summary:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    options: [
      "Serious to get married soon",
      "Should understand each other first",
      "Not sure, just browsing",
    ],
    type: "checkbox",
    skip: false,
  },
  {
    id: 4,
    text: "How long have you been looking for?",
    summary:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    options: [
      "Just started",
      "It's been a while",
      "My friend or family were looking for me before",
    ],
    type: "checkbox",
    skip: true,
  },
  {
    id: 5,
    text: "For whom are you looking?",
    summary:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    options: ["Child", "Myself", "Sibling", "Friend", "Relative"],
    type: "checkbox",
    skip: false,
  },
  {
    id: 6,
    text: "I am age",
    summary:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    options: ["18", "19", "20", "21", "22", "23"],
    type: "Dropdown",
    skip: false,
  },
  {
    id: 7,
    text: "I am looking for a partner of age",
    summary:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    options: ["18", "19", "20", "21", "22", "23"],
    text2: "to",
    options1: ["18", "19", "20", "21", "22", "23"],
    type: "Dropdown",
    skip: false,
  },
  {
    id: 8,
    text: "Are you looking for a partner living in Australia?",
    summary:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    options: ["Yes", "No", "Doesn't matter"],
    type: "checkbox",
    skip: false,
  },
  {
    id: 9,
    text: "Do you believe in horoscope match?",
    summary:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    options: ["It's must", "Doesn't matter", "Prefer not to say"],
    type: "checkbox",
    skip: false,
  },
  {
    id: 10,
    text: "Does religion and caste matter for your preferred partner?",
    summary:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    options: ["It's must", "Doesn't matter", "Prefer not to say"],
    type: "checkbox",
    skip: false,
  },
  {
    id: 11,
    text: "What are your interests and hobbies?",
    summary:
      "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
    options: [
      "Sports",
      "Photography",
      "Dancing",
      "Theater",
      "Literature",
      "Art",
      "Music",
      "Cooking",
      "Cinema",
      "History",
      "Craft",
      "Pottery",
      "Carpentry",
      "Collecting",
      "None",
    ], // this is should be multiple choice
    type: "checkbox",
    skip: true,
  },
];

const MultiStepForm: React.FC = () => {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<any>({});
  // const router = useRouter();

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setSelectedOption((prev: any) => ({
        ...prev,
        [name]: checked ? value : "",
      }));
    } else {
      setSelectedOption((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAnswers = [...answers, selectedOption];
    setAnswers(updatedAnswers);
    setSelectedOption({});
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log("Form completed", updatedAnswers);
      router.push("/register");
      
      
    }
  };

  const handleSkip = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }else{
      router.push("/register");
    }

  };

  const renderOptions = (question: any) => {
    if (question.type === "checkbox") {
      return (
        <>
          <div
            className={`grid ${
              question.options && question.options1
                ? " grid-cols-1  xl:w-auto md:grid-cols-3 gap-3 pl-4 pr-4"
                : "w-[30%]  grid-cols-1 gap-2"
            } ${
              question.options && question.options.length > 5
              ? "grid-cols-1 w-full md:w-auto md:grid-cols-5 gap-4 pl-4 pr-4"
              : "mt-4 grid-cols-1 gap-2 w-full md:w-[50%] px-2 text-sm"
            } mb-2 mt-4`}
          >
            {question.options.map((option: string, index: number) => (
              <div
                className="flex  items-center justify-between rounded-xl h-10 px-5 text-white bg-[#FFFFFF80] "
                key={index}
              >
                <label
                  htmlFor={`option-${index}`}
                  className="ml-3 block font-medium "
                >
                  {option}
                </label>
                <input
                  id={`option-${index}`}
                  name={`question-${currentQuestion}`}
                  type="checkbox"
                  value={option}
                  checked={
                    selectedOption[`question-${currentQuestion}`] === option
                  }
                  onChange={handleOptionChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
          {question.options1 && (
            <>
              <h2 className="mt-4  text-center font-bold text-2xl ">
                {question.text2}
              </h2>
              <div
                className={`grid ${
                  question.options1.length > 2
                    ? "grid-cols-1 w-full md:w-auto md:grid-cols-3 gap-4 pl-4 pr-4 "
                    : "grid-cols-1 "
                } mb-4`}
              >
                {question.options1.map((option: string, index: number) => (
                  <div
                    className="flex flex-row items-center justify-between rounded-xl h-10 px-5 text-white bg-[#FFFFFF80]"
                    key={index}
                  >
                    <label
                      htmlFor={`option1-${index}`}
                      className="ml-3 block font-medium "
                    >
                      {option}
                    </label>
                    <input
                      id={`option1-${index}`}
                      name={`question-${currentQuestion}-1`}
                      type="checkbox"
                      value={option}
                      checked={
                        selectedOption[`question-${currentQuestion}-1`] ===
                        option
                      }
                      onChange={handleOptionChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      );
    } else if (question.type === "Dropdown") {
      return (
        <>
        <div className=" flex items-center justify-center mt-10 xl:w-[40%] w-full px-2 xl:px-0 ">
          {question.options && (
            <select
              name={`question-${currentQuestion}-1`}
              value={selectedOption[`question-${currentQuestion}-1`] || ""}
              onChange={handleOptionChange}
              className="w-full h-10 xl:px-5 text-white  bg-[#7DB9D1]
              ]
              rounded-md"
            >
              <option value="">Select an option</option>
              {question.options.map((option: string, index: number) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {question.options1 && (
            <>
              <span className="ml-2 mr-2">{question.text2}</span>
              <select
                name={`question-${currentQuestion}-2`}
                value={selectedOption[`question-${currentQuestion}-2`] || ""}
                onChange={handleOptionChange}
                className="w-full h-10 px-0 xl:px-5 text-white bg-[#7DB9D1] rounded-md mt-2"
              >
                <option value="">Select an option</option>
                {question.options1.map((option: string, index: number) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </>
          )}
          </div>
        </>
      );
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-top  bg-[#E65555] text-white ">
        <Image
            src="/logowhite.png"
            width={400}
            height={500}
            alt="VaidikVivah Logo"
            className="w-72 h-24 mx-auto  mb-2 "
          />
          
        <div className=" xl:w-[50vw] w-full mt-10 text-center pl-4 pr-4">
          <h2 className="text-2xl font-bold">
            Question {currentQuestion + 1}/{questions.length}
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2 mb-4">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
          <p className="my-4 text-2xl md:text-4xl font-semibold">
            {questions[currentQuestion].text ||
              questions[currentQuestion].text2}
          </p>
          <p className="text-[#FFFFFF90]">
            {questions[currentQuestion].summary}
          </p>
        </div>
      <div className="w-full  space-y-6 ">
    
        <form className="flex  flex-col items-center justify-center gap-2   space-y-4" onSubmit={handleSubmit}>
          {renderOptions(questions[currentQuestion])}
          <div className="flex gap-4  justify-between  xl:mt-6 relative xl:left-[40%] ">
            {questions[currentQuestion].skip && (
              <button
                type="button"
                className="px-4 xl:mt-20 py-2 text-white bg-[#E65555] border rounded-md h-[48px]"
                onClick={handleSkip}
              >
                Skip the question
              </button>
            )}
            <button
              type="submit"
              className="px-4 mb-4 xl:mb-0 xl:mt-20 py-2 text-[#E65555] bg-white rounded-md flex items-center gap-2 h-[48px]"
              >
              Continue <FaArrowRightLong />

            </button>
          </div>
        </form>
      </div>
    
    </div>
  );
};

export default MultiStepForm;
