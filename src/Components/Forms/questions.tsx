"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const questions = [
  {
    id: 1,
    text1: "I am a",
    options: ["men", "women", "Non-binary"],
    text2: "I am looking for a",
    options1: ["Man", "Women", "Non-binary"],
    type: "checkbox",
    skip: false,
  },
  {
    id: 2,
    text: "Have you tried looking for your life partner online before?",
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
    options1: ["18", "19", "20", "21", "22", "23"],
    text2: "to",
    options2: ["18", "19", "20", "21", "22", "23"],
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
    ],
    type: "checkbox", //this is should be mulit
    skip: true,
  },
];

const MultiStepForm: React.FC = () => {
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
    }
  };

  const handleSkip = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E65555] text-white">
      <div className="w-full max-w-md p-2 space-y-6">
        <div className="text-center">
          <Image
            src="/logowhite.png"
            width={400}
            height={500}
            alt="VaidikVivah Logo"
            className="w-72 h-24 mx-auto mb-4"
          />
         
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2 mb-4">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
          <div className="">

            <form action="">






            </form>

            
          </div>



          </div>
        </div>
    </div>
  );
};

export default MultiStepForm;
