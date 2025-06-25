import { useState, useEffect } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



import Welcome from "./Welcome";
import Question1 from "./Question1";
// import Question2 from "./Question2";
// import Question3 from "./Question3";
// import Question4 from "./Question4";
import Question5 from "./Question5";
import Question6 from "./Question6";
import Question7 from "./Question7";
// import Question8 from "./Question8";
import Question9 from "./Question9";
import Question10 from "./Question10";
import Question11 from "./Question11";

const Multistep = () => {
    const [isExclusive, setExclusive] = useState(false);
    const [isWelcome, setWelcome] = useState(true);

    const navigate = useNavigate();

    const [selectedOptions, setSelectedOptions] = useState<
        { questionId: number; answerValue: string | string[] }[]
    >([]);



    useEffect(() => {
        const isExclusive = localStorage.getItem("isExclusive");
        if (isExclusive) {
            setExclusive(true)
        }

    })


    console.log(selectedOptions, "selected")

    const [page, setPage] = useState(0);

    const PageTitles = [
        "Question 1/11",
        // "Question 2/11",
        // "Question 3/11",
        // "Question 4/11",
        "Question 5/11",
        "Question 6/11",
        "Question 7/11",
        // "Question 8/11",
        "Question 9/11",
        "Question 10/11",
        "Question 11/11",
    ];



    const PageDisplay = () => {
        switch (page) {
            case 0:
                return (
                    <Question1
                        selectedOptions={selectedOptions}
                        handleOptionChange={handleOptionChange}
                    />
                );
            // case 1:
            //     return (
            //         <Question2
            //             selectedOptions={selectedOptions}
            //             handleOptionChange={handleOptionChange}
            //         />
            //     );
            // case 2:
            //     return (
            //         <Question3
            //             selectedOptions={selectedOptions}
            //             handleOptionChange={handleOptionChange}
            //         />
            //     );
            // case 3:
            //     return (
            //         <Question4
            //             selectedOptions={selectedOptions}
            //             handleOptionChange={handleOptionChange}
            //         />
            //     );
            case 1:
                return (
                    <Question5
                        selectedOptions={selectedOptions}
                        handleOptionChange={handleOptionChange}
                    />
                );
            case 2:
                return (
                    <Question6
                        selectedOptions={selectedOptions}
                        handleOptionChange={handleOptionChange}
                    />
                );
            case 3:
                return (
                    <Question7
                        selectedOptions={selectedOptions}
                        handleOptionChange={handleOptionChange}
                    />
                );
            // case 5:
            //     return (
            //         <Question8
            //             selectedOptions={selectedOptions}
            //             handleOptionChange={handleOptionChange}
            //         />
            //     );
            case 4:
                return (
                    <Question9
                        selectedOptions={selectedOptions}
                        handleOptionChange={handleOptionChange}
                    />
                );
            case 5:
                return (
                    <Question10
                        selectedOptions={selectedOptions}
                        handleOptionChange={handleOptionChange}
                    />
                );
            case 6:
                return (
                    <Question11
                        selectedOptions={selectedOptions}
                        handleOptionChange={handleOptionChange}
                    />
                );

            default:
                return null;
        }
    };

    const handlePrevious = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleOptionChange = (questionId: number, answerValue: string | string[]) => {
        setSelectedOptions((prev) => {

            const updatedOptions = prev.filter(
                (option) => option.questionId !== questionId
            );
            return [...updatedOptions, { questionId, answerValue }];
        });
    };



    const handleNext = () => {




        if (page === 0) {
            const has1AnsweredAll = selectedOptions.some(
                (sel) => sel.questionId === 1
            );

            if (!has1AnsweredAll) {
                toast.error("Please answer Your gender before proceeding!");
                return;
            }

            const has2AnsweredAll = selectedOptions.some(
                (sel) => sel.questionId === 2
            );
            if (!has2AnsweredAll) {
                toast.error("Please answer Partner looking for before proceeding!");
                return;
            }
        }

        // if (page === 1) {
        //     const hasAnsweredAll = selectedOptions.some(
        //         (sel) => sel.questionId === 3
        //     );
        //     if (!hasAnsweredAll) {
        //         toast.error("Please answer Have you tried looking for your life partner online before? before proceeding!");
        //         return;
        //     }
        // }

        // if (page === 2) {
        //     const hasAnsweredAll = selectedOptions.some(
        //         (sel) => sel.questionId === 4
        //     );
        //     if (!hasAnsweredAll) {
        //         toast.error("Please answer What are your wedding goals? before proceeding!");
        //         return;
        //     }
        // }

        // if (page === 3) {
        //     const hasAnsweredAll = selectedOptions.some(
        //         (sel) => sel.questionId === 5
        //     );
        //     if (!hasAnsweredAll) {
        //         toast.error("Please answer How long have you been looking for? before proceeding!");
        //         return;
        //     }
        // }
        if (page === 1) {
            const hasAnsweredAll = selectedOptions.some(
                (sel) => sel.questionId === 3
            );
            if (!hasAnsweredAll) {
                toast.error("Please answer For whom are you looking? before proceeding!");
                return;
            }
        }
        if (page === 2) {
            const hasAnsweredAll = selectedOptions.some(
                (sel) => sel.questionId === 4
            );
            if (!hasAnsweredAll) {
                toast.error("Please answer Your age  before proceeding!");
                return;
            }
        }

        if (page === 3) { // Validation for Question 8
            const answerValue = selectedOptions.find((sel) => sel.questionId === 5)?.answerValue;

            if (!answerValue) {
                toast.error("Please select both minimum and maximum age before proceeding!");
                return;
            }

            const [minAge, maxAge] = (typeof answerValue === 'string' ? answerValue : '').split('-').map(Number);

            if (!minAge || !maxAge || isNaN(minAge) || isNaN(maxAge)) {
                toast.error("Invalid age range. Please select valid ages!");
                return;
            }

            if (minAge >= maxAge) {
                toast.error("Minimum age should be less than maximum age!");
                return;
            }
        }

        // if (page === 5) {
        //     const hasAnsweredAll = selectedOptions.some(
        //         (sel) => sel.questionId === 7
        //     );
        //     if (!hasAnsweredAll) {
        //         toast.error("Please answer Are you looking for a partner living in Australia? before proceeding!");
        //         return;
        //     }
        // }

        if (page === 4) {
            const hasAnsweredAll = selectedOptions.some(
                (sel) => sel.questionId === 6
            );
            if (!hasAnsweredAll) {
                toast.error("Please answer Do you believe in horoscope match? before proceeding!");
                return;
            }
        }

        if (page === 5) {
            const hasAnsweredAll = selectedOptions.some(
                (sel) => sel.questionId === 7
            );
            if (!hasAnsweredAll) {
                toast.error("Please answer Does religion and caste matter for your preferred partner? before proceeding!");
                return;
            }
        }

        if (page === 6) {
            const selectedAnswer = selectedOptions.find((sel) => sel.questionId === 8)?.answerValue;

            if (!selectedAnswer || selectedAnswer.length === 0) {
                toast.error("Please answer 'What are your interests and hobbies?' before proceeding!");
                return;
            }
        }




        if (page < PageTitles.length - 1) {
            setPage(page + 1);
        } else if (page === PageTitles.length - 1) {
            Cookies.set("answers", JSON.stringify(selectedOptions));
            navigate("/register");
        }
    };

    const handleWelcomeContinue = () => {
        setWelcome(false);
        setPage(0);
    };



    return (
        <div className={`min-w-screen relative flex min-h-screen flex-col items-center  ${isExclusive ? 'bg-[#ffffff]' : 'bg-[#ffffff]'} px-2 text-white md:px-28 lg:px-60 3xl:px-60`}>
            <div className="mt-5 flex w-full items-center justify-between md:mt-10  font-[Bembo-MT-Pro-Bold] ">
                {page > 0 ? (
                    <button
                        type="button"
                        className="h-[48px] gap-2 text-xl text-white bg-[#FD5C90] p-6 rounded-3xl flex items-center  cursor-pointer"
                        onClick={handlePrevious}
                    >
                        <FaArrowLeftLong />   Back
                    </button>
                ) : (
                    <button
                        type="button"
                            className="h-[48px] gap-2 text-xl text-white bg-[#FD5C90] p-6 rounded-3xl flex items-center  cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <FaArrowLeftLong />   Back
                    </button>
                )}

                <Link to={"/"} className="mx-auto  " >
                <img
              src="/logotest3.png"
              alt="logo"
              className="h-24 w-auto md:h-24 ml-3"
            />
                </Link>
            </div>
            {
                isWelcome ? <Welcome handleNext={handleWelcomeContinue} /> :
                    <div className="rounded-3xl bg-gradient-to-r from-[#FECEDC] to-[#FD5C90] p-8 ">

                        <div className="mt-10 w-full text-center ">
                            {/* <h2 className="text-2xl" style={{ fontFamily: "Bembo-MT-Pro-Bold, sans-serif" }}>
                                {PageTitles[page]}
                            </h2> */}
                            <div className="mb-6 mt-1 h-2.5 rounded-full bg-[#9e2727]">
                                <div
                                    className="h-2.5 rounded-full bg-[#31F7C8]"
                                    style={{
                                        width: `${((page + 1) / PageTitles.length) * 100}%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="form-container w-full md:w-auto">
                            <div className="form-body font-[Bembo-MT-Pro-Bold] ">{PageDisplay()}</div>

                            <div className="form-footer">
                                <div className="max-md:bottom-5 2xl:bottom-10  flex w-full flex-col items-center justify-end   md:absolute md:right-20 md:flex-row lg:right-40 xl:mt-6 3xl:right-60">
                                    <div className="flex w-full items-end justify-between md:justify-end md:gap-10">

                                        <button
                                            type="button"
                                            className={`flex  h-[48px] w-full mb-5 items-center justify-center gap-2 cursor-pointer rounded-md bg-[#FD5C90]  px-4 py-4 ${isExclusive ? 'text-[#fffff]' : 'text-[#ffffff]'} md:w-auto xl:mt-20 md:mt-0 mb-5r`}
                                            onClick={handleNext}
                                        >
                                            Continue <FaArrowRightLong />
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Multistep;
