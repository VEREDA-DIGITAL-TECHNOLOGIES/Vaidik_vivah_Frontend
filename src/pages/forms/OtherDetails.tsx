import "../../font.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOtherDetailsMutation } from "../..//Redux/Api/form.api";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../../Redux/Reducers/user.reducer";
import type{ FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import { LoadingOutlined } from '@ant-design/icons';
import { useGetReligionQuery, useGetCommunityQuery, useGetCasteQuery } from "../../Redux/Api/dropdown.api";



// caste, community, dateOfBirth, timeOfBirth, religion, placeOfBirth

const otherDetailsSchema = z.object({
    caste: z.string().min(1, "Caste is required"),
    community: z.string().min(1, "Community is required"),
    dateOfBirth: z.string().min(1, "Date of Birth is required"),
    timeOfBirth: z.string().min(1, "Time of Birth is required"),
    religion: z.string().min(1, "Religion is required"),
    placeOfBirth: z.string().min(1, "Place of Birth is required"),
});

const OtherDetails: React.FC = () => {
    const [isExclusive, setExclusive] = useState(false);
    // const [selectedReligion, setSelectedReligion] = useState("");
    // const [availableCastes, setAvailableCastes] = useState<{ id: string; name: string }[]>([]);

    const [religion, setSelectedReligionData] = useState<{ id: string; value: string }[]>([]);
    const [community, setSelectedCommunityData] = useState<{ id: string; value: string }[]>([]);
    const [caste, setSelectedCasteData] = useState<{ id: string; value: string }[]>([]);


    const { data: religiondata } = useGetReligionQuery();
    const { data: communitydata } = useGetCommunityQuery();
    const { data: castedata } = useGetCasteQuery();




    useEffect(() => {
        const isExclusive = localStorage.getItem("isExclusive");
        if (isExclusive) {
            setExclusive(true)
        }
    }, [])


    useEffect(() => {
        if (religiondata) {
            setSelectedReligionData((religiondata as any).data);
        }

        if (communitydata) {
            setSelectedCommunityData((communitydata as any).data);
        }

        if (castedata) {
            setSelectedCasteData((castedata as any).data);
        }



    }, [religiondata, communitydata, castedata]);








    const [otherDetails, { isLoading }] = useOtherDetailsMutation();
    const navigate = useNavigate();

    // const dispatch = useDispatch();




    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(otherDetailsSchema),
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

            const res = await otherDetails(data);

            if ('error' in res && res.error) {
                const errorData = res.error as FetchBaseQueryErrorWithData;

                if (errorData.data?.success === false) {
                    console.log(errorData.data.message);
                    toast.error(errorData.data.message);
                    return;
                }
            } else {

                const successData = res.data as ApiResponse;
                toast.success(successData.message);
                navigate('/success');
            }

        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred");

        }
        console.log(data);
    };

    return (
        <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center px-4">
                <div className="flex  justify-center">
                <img
                    src="/logotest3.png"
                    alt="logo"
                    className="h-24 w-auto md:h-24 ml-3"
                />
                </div>
            <div className='bg-gradient-to-r from-[#FECEDC] to-[#FD5C90] p-8 rounded-3xl'>

            <div className="max-w-4xl w-full  text-white p-8 rounded-lg">
                <h1 className="text-3xl font-bold mb-2 text-center font-[Bembo-MT-Pro-Bold]">Other Details</h1>
                <p className="text-center mb-8 font-[Bembo-MT-Pro-Light]">
                    Including additional details enriches your profile, making it easier to find meaningful and compatible connections
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="font-[Bembo-MT-Pro-Regular] mt-5 grid grid-cols-1 md:grid-cols-2 md:gap-2 md:px-20 xl:px-40 2xl:px-60 3xl:mt-20 3xl:px-60"
                >
                    <div>
                        <label className="block text-white">Religion</label>
                        <div className="mb-4">
                            <select
                                {...register("religion")}
                                className="h-10 w-full rounded border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
                                defaultValue={""}
                            >
                                <option value="" disabled>
                                    Select Religion
                                </option>
                                {
                                    religion.map((religion) => (
                                        <option value={religion.value} key={religion.id} >
                                            {religion.value}
                                        </option>
                                    ))
                                }
                            </select>
                            {errors.religion && (
                                <span className="text-orange-200">
                                    {errors.religion.message?.toString()}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-white">Community</label>
                        <div className="mb-4 ">
                            <select
                                {...register("community")}
                                className="h-10 w-full rounded border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
                            >
                                <option value="" disabled selected>
                                    Select Community
                                </option>
                                {community.map((community) => (
                                    <option value={community.value} key={community.id}>
                                        {community.value}
                                    </option>
                                ))}
                            </select>
                            {errors.community && (
                                <span className="text-orange-200">
                                    {errors.community.message?.toString()}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-white">Date of Birth</label>
                        <div className="mb-4">
                            <input
                                type="date"
                                {...register("dateOfBirth")}
                                placeholder="Date"
                                className="h-10 w-full rounded border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
                                max={new Date().toISOString().split("T")[0]}
                            />
                            {errors.dateOfBirth && (
                                <span className="text-orange-200">
                                    {errors.dateOfBirth.message?.toString()}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-white">Time of Birth</label>
                        <div className="mb-4">
                            <input
                                type="time"
                                {...register("timeOfBirth")}
                                placeholder="Time"
                                className="h-10 w-full rounded border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
                            />
                            {errors.timeOfBirth && (
                                <span className="text-orange-200">
                                    {errors.timeOfBirth.message?.toString()}
                                </span>
                            )}
                        </div>
                    </div>



                    <div>
                        <label className="block text-white">Caste</label>
                        <div className="mb-4">
                            <select
                                {...register("caste")}
                                className="h-10 w-full rounded border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
                                defaultValue={""}
                            >
                                <option value="" disabled>
                                    Select caste
                                </option>
                                {caste.map((caste) => (
                                    <option value={caste.value} key={caste.id}>
                                        {caste.value}
                                    </option>
                                ))}
                            </select>
                            {errors.caste && (
                                <span className="text-orange-200">
                                    {errors.caste.message?.toString()}
                                </span>
                            )}
                        </div>
                    </div>



                    <div>
                        <label className="block text-white">Place of Birth</label>
                        <div className="mb-4">
                            <input
                                type="text"
                                {...register("placeOfBirth")}
                                placeholder="Enter your place of birth"
                                className="h-10 w-full rounded border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
                            />
                            {errors.placeOfBirth && (
                                <span className="text-orange-200">
                                    {errors.placeOfBirth.message?.toString()}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 flex justify-end mb-5">
                        <button
                            type="submit"
                                className={`w-full rounded-[0.5rem] bg-[#F9F5FFE5] px-4 py-2 ${isExclusive ? 'text-[#FD5C90]' : 'text-[#FD5C90]'}
              md:w-20 2xl:w-32`}
                        >
                                {isLoading ? <LoadingOutlined className={`${isExclusive ? 'text-[#FD5C90]' : 'text-[#FD5C90]'} animate-spin cursor-pointer`} /> : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default OtherDetails;
