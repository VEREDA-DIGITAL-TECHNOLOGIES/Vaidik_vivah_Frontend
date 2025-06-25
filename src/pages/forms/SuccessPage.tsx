import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../../font.css";

const SuccessPage: React.FC = () => {
    const [isExclusive, setExclusive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isExclusiveValue = localStorage.getItem("isExclusive");
        if (isExclusiveValue) {
            setExclusive(true);
        }

        const timer = setTimeout(() => {
            navigate("/user-dashboard");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`flex min-h-screen flex-col items-center ${isExclusive ? "bg-[#ffffff]" : "bg-[#ffffff]"
                } px-5 md:px-20 lg:px-40 3xl:px-60`}
        >
            <img
                src="/logotest3.png"
                alt="logo"
                className="h-24 w-auto md:h-24 ml-3"
            />
            <div className='bg-gradient-to-r from-[#FECEDC] to-[#FD5C90] p-8 rounded-3xl'>

            <div className="flex flex-grow flex-col items-center justify-start text-center md:flex-grow-0 md:justify-center">
                <motion.img
                    src="/confirm.png"
                    alt="verified"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="mb-10 mt-10 h-auto w-10 md:w-20 lg:w-20"
                />

                <div className="text-center">
                    <h1
                        className="mb-6 text-xl font-semibold text-[#F9F5FFE5] md:text-3xl lg:text-4xl 3xl:text-5xl"
                        style={{ fontFamily: "Bembo-MT-Pro-Regular, sans-serif" }}
                    >
                        Your profile created successfully
                    </h1>
                    <p className="md:text-md text-sm text-[#F9F5FFE5] 3xl:text-lg font-[Bembo-MT-Pro-Regular]">
                        Let your matchmaking journey begin with us
                    </p>
                </div>
            </div>
            </div>
        </motion.div>
    );
};

export default SuccessPage;
