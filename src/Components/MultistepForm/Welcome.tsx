import { useEffect, useState } from "react";



const Welcome = ({ handleNext }: { handleNext: () => void }) => {
    const [isExclusive, setExclusive] = useState(false);

    useEffect(() => {
        const isExclusive = localStorage.getItem("isExclusive");
        if (isExclusive) {
            setExclusive(true);
        }
    }, []);


    return (
        <div
            className={`min-w-6xl rounded-3xl bg-gradient-to-r from-[#FECEDC] to-[#FD5C90] relative  flex-col  px-2 text-white md:px-28 lg:px-40 3xl:px-60`}
        >

            {/* Main Content */}
            <div className="flex mt-40 flex-col items-center justify-center text-center gap-5">
                <h1 className="text-4xl md:text-3xl font-[Bembo-MT-Pro-Bold]">Begin Your Journey with Vaidik Vivah</h1>
                <p className="text-2xl font-[Bembo-MT-Pro-Light]">
                    You’ve taken the first meaningful step toward finding a life partner who shares your values and traditions.
                </p>

                <div className="flex flex-col md:flex-row gap-4 mt-2">
                    {/* <Link
                        to="/"
                        className={`flex h-[48px] px-10 md:px-12 rounded-md items-center justify-center gap-2 bg-white  py-2 ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                            } md:w-auto xl:mt-10 md:mt-0`}

                    >
                        Cancel
                    </Link> */}
                    <button
                        type="button"
                        className={`flex h-[48px] px-10  items-center justify-center gap-2 cursor-pointer rounded-md bg-white  md:px-20 py-2 ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                            } md:w-auto xl:mt-10 md:mt-0 mb-4`}
                        onClick={handleNext}
                    >
                        Click to continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
