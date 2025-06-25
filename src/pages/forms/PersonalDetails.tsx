
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { usePersonalDetialsMutation } from "../../Redux/Api/form.api";
import type{ FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { zodResolver } from "@hookform/resolvers/zod";
import { auth, database } from '../../../utils/firebaseConfig.ts';
import { ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../../Redux/Reducers/user.reducer";
import "../../font.css";
import { toast } from 'sonner'
import { LoadingOutlined } from '@ant-design/icons';
import { useGetMaritalStatusQuery } from "../../Redux/Api/dropdown.api.ts";

const personalDetailsSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    displayName: z.string().min(1, { message: "Display name is required" }),
    maritalStatus: z.string().min(1, { message: "Marital status is required" }),
    numberOfChildren: z.enum(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], { message: "Number of children is required" }),
    contactNumber: z
        .string()
        .min(1, { message: "Contact number is required" })
        .length(10, { message: "Contact number must be 10 digits" })
        .regex(/^\d+$/, { message: "Contact number must contain only digits" }),
    aboutYourSelf: z.string().min(1, { message: "Description is required" }),


});

const PersonalDetails: React.FC = () => {
    const [isExclusive, setExclusive] = useState(false);
    const [maritalStatus, setMaritalStatus] = useState<{ id: string; value: string }[]>([]);

    const { data: maritalStatusData } = useGetMaritalStatusQuery();
    console.log(maritalStatusData);

    useEffect(() => {
        const isExclusive = localStorage.getItem("isExclusive");
        if (isExclusive) {
            setExclusive(true)
        }
    }, [])

    // const dispatch = useDispatch();

    const [personalDetials, { isLoading }] = usePersonalDetialsMutation();


    const navigate = useNavigate();

    useEffect(() => {
        if (maritalStatusData) {
            setMaritalStatus((maritalStatusData as any).data);
        }
    }, [maritalStatusData]);



    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(personalDetailsSchema),
    });



    type ApiResponse = {
        success: boolean;
        message: string;
    };
    type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
        data: ApiResponse;
    };

    const onSubmit = async (data: any) => {
        try {
            const res = await personalDetials(data);

            if (res?.error) {
                const errorData = res.error as FetchBaseQueryErrorWithData;
                console.log(errorData.data);

                if (errorData.data?.success == false) {
                    toast.error(errorData.data.message);
                    return;
                }

            } else {
                const successData = res.data as ApiResponse;
                await update(ref(database, `users/${auth.currentUser?.uid}`), {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    displayName: data.displayName,
                })

                // const isPersonalDetailsFormFilled = true
                toast.success(successData.message);
                // dispatch(setUser(isPersonalDetailsFormFilled));
                navigate("/gayatri-details");
            }

        } catch (error) {
            toast.error("An unexpected error occurred.");
            console.log(error);
        }

    };

    return (
        <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center px-4 py-10">
               <div className="flex  justify-center">
                    <img
                        src="/logotest3.png"
                        alt="logo"
                        className="h-24 w-auto md:h-24 ml-3"
                    />
               </div>
        <div className='bg-gradient-to-r from-[#FECEDC] to-[#FD5C90] p-8 rounded-3xl'>

            <div className="w-full max-w-4xl bg-transparent text-white text-center mb-8">
                <h1 className="text-3xl font-[Bembo-MT-Pro-Bold]">Add your personal details</h1>
                <p className="mt-2 text-sm font-[Bembo-MT-Pro-Light]">
                    Share your details to build a tailored profile and connect with compatible matches.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="md:px-30 font-[Bembo-MT-Pro-Regular] mt-5 grid grid-cols-1 md:grid-cols-2 md:gap-2 xl:px-40 2xl:px-60 3xl:mt-20 3xl:px-60"
            >
                <div className="col-span-2 mt-2">
                    <label className="block text-white">Your name*</label>
                    <div className="flex flex-col md:flex-row">
                        <div className="mt-2 w-full md:mt-0 md:w-1/2 md:pr-2">
                            <input
                                type="text"
                                {...register("firstName")}
                                placeholder="First name"
                                className="w-full rounded bg-[#F9F5FFE5] p-2"
                            />
                            {errors.firstName && (
                                <p className="text-orange-200 text-sm mt-1">
                                    {errors?.firstName?.message?.toString()}
                                </p>
                            )}
                        </div>
                        <div className="mt-2 w-full md:mt-0 md:w-1/2 md:pl-2">
                            <input
                                type="text"
                                {...register("lastName")}
                                placeholder="Last name"
                                className="w-full rounded border border-gray-300 bg-[#F9F5FFE5] p-2"
                            />
                            {errors.lastName && (
                                <p className="text-orange-200 text-sm mt-1">
                                    {errors?.lastName?.message?.toString()}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-span-2 mt-2">
                    <label className="block text-white">Display name</label>
                    <input
                        type="text"
                        {...register("displayName")}
                        placeholder="Display name"
                        className="w-full rounded border border-gray-300 bg-[#F9F5FFE5] p-2"
                    />
                </div>
                {errors.displayName && (
                    <p className="text-orange-200 text-sm mt-1">
                        {errors?.displayName?.message?.toString()}
                    </p>
                )}

                <div className="col-span-2 mt-2">
                    <label className="block text-white">Contact number*</label>
                    <input
                        type="text"
                        {...register("contactNumber")}
                        placeholder="Contact number"
                        className="w-full rounded border-none bg-[#F9F5FFE5] p-2"
                    />
                    {errors.contactNumber && (
                        <p className="text-orange-200 text-sm mt-1">
                            {errors?.contactNumber?.message?.toString()}
                        </p>
                    )}
                </div>

                <div className="col-span-2 mt-2 grid gap-4 md:grid-cols-2">
                    <div className="col-span-1">
                        <label className="block text-white">Marital status*</label>
                        <select
                            {...register("maritalStatus")}
                            className="w-full rounded border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select your marital status
                            </option>

                            {maritalStatus.map((status) => (

                                <option key={status.id} value={status.value}>
                                    {status.value}
                                </option>
                            ))}
                        </select>
                        {errors.maritalStatus && (
                            <p className="text-orange-200 text-sm mt-1">
                                {errors?.maritalStatus?.message?.toString()}
                            </p>
                        )}
                    </div>

                    <div className="col-span-1">
                        <label className="block text-white">Number of children</label>
                        <select
                            {...register("numberOfChildren")}
                            className="w-full rounded border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select number of children
                            </option>
                            {
                                Array.from({ length: 13 }, (_, i) => (
                                    <option key={i} value={i.toString()}>
                                        {i}
                                    </option>
                                ))
                            }
                        </select>
                        {errors.numberOfChildren && (
                            <p className="text-orange-200 text-sm mt-1">
                                {errors?.numberOfChildren?.message?.toString()}
                            </p>
                        )}
                    </div>
                </div>

                <div className="col-span-2 mt-2">
                    <label className="block text-white">
                        Describe about yourself*
                    </label>
                    <textarea
                        {...register("aboutYourSelf")}
                        placeholder="Description"
                        rows={4}
                        className="w-full resize-none rounded border border-gray-300 bg-[#F9F5FFE5] p-2"
                    ></textarea>
                    {errors.aboutYourSelf && (
                        <p className="text-orange-200 text-sm mt-1">
                            {errors?.aboutYourSelf?.message?.toString()}
                        </p>
                    )}
                </div>

                <div className="col-span-2 mt-2 mb-4 flex justify-end">
                    <button
                        type="submit"
                        className={`w-full rounded-[0.5rem] bg-[#F9F5FFE5] px-4 py-2 ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'}
              md:w-20 2xl:w-32`}
                    >
                        {isLoading ? <LoadingOutlined className={`${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} animate-spin`} /> : 'Save'}
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default PersonalDetails;
