// src/App.tsx
import { useEffect, useState } from "react";
import { useGayatriDetialsMutation } from "../../Redux/Api/form.api";
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";

type ApiResponse = {
    success: boolean;
    message: string;
};

type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
};

const GayatriDetails = () => {
    const [isExclusive, setExclusive] = useState(false);
    const [isMember, setIsMember] = useState<boolean | null>(null);
    const [dikshaId, setDikshaId] = useState("");
    const [gayatriDetials, { isLoading }] = useGayatriDetialsMutation();

        const navigate = useNavigate();
    
    useEffect(() => {
        const exclusive = localStorage.getItem("isExclusive");
        if (exclusive) {
            setExclusive(true);
        }
    }, []);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form default reload

        const payload = {
            isMember,
            dikshaId: isMember ? dikshaId : null,
        };

        try {
            const res = await gayatriDetials(payload);
            if ("error" in res) {
                const errorData = res.error as FetchBaseQueryErrorWithData;
                if (errorData.data?.success === false) {
                    toast.error(errorData.data.message);
                    return;
                }
            } else {
                toast.success("Details saved successfully!");
                navigate("/qualification-details");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#ffffff] ">
            

            <div className='bg-gradient-to-r from-[#FECEDC] to-[#FD5C90] p-8 rounded-3xl'>

            <form
                onSubmit={onSubmit}
                className="md:px-30 mt-5 grid grid-cols-1 md:grid-cols-2 md:gap-2 xl:px-40 2xl:px-60 3xl:mt-20 3xl:px-60"
            >
                <div className="p-6 font-[Bembo-MT-Pro-Regular] rounded-2xl shadow-md w-full max-w-5xl text-center ">
                    <h2 className="text-xl font-[Bembo-MT-Pro-Bold] mb-4 text-gray-800">
                        Are you part of Gayatri Pariwar?
                    </h2>
                    <div className="flex justify-around mb-4">
                        <button
                            type="button"
                            className={`px-4 py-2 cursor-pointer rounded-lg ${isMember === true ? "bg-pink-500 text-white" : "bg-gray-200"}`}
                            onClick={() => setIsMember(true)}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 cursor-pointer rounded-lg ${isMember === false ? "bg-pink-500 text-white" : "bg-gray-200"}`}
                            onClick={() => setIsMember(false)}
                        >
                            No
                        </button>
                    </div>

                    {isMember && (
                        <input
                            type="text"
                            placeholder="Enter Diksha ID"
                            value={dikshaId}
                            onChange={(e) => setDikshaId(e.target.value)}
                            className="w-full p-2 border rounded-lg mb-4"
                        />
                    )}

                    <div className="col-span-2 mt-2 mb-4 flex justify-end">
                        <button
                            type="submit"
                            className={`w-full rounded-[0.5rem] cursor-pointer bg-[#F9F5FFE5] px-4 py-2 ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                                } md:w-20 2xl:w-32`}
                        >
                            {isLoading ? (
                                <LoadingOutlined
                                    className={`${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                                        } animate-spin`}
                                />
                            ) : (
                                "Save"
                            )}
                        </button>
                    </div>
                </div>
            </form>
            </div>
          
        </div>
    );
};

export default GayatriDetails;
