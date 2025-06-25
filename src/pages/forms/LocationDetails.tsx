import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocationDetailsMutation } from "../../Redux/Api/form.api";
import type{ FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import "../../font.css";
import { z } from "zod";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";


const locationSchema = z.object({
    
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
  
});
const LocationDetails: React.FC = () => {
    const navigate = useNavigate();
    const [isExclusive, setExclusive] = useState(false);
    const [states, setStates] = useState<any[]>([]);
   

   



    useEffect(() => {
        const isExclusive = localStorage.getItem("isExclusive");
        if (isExclusive) {
            setExclusive(true);
        }
    }, []);

   



    const [locationDetails, { isLoading }] = useLocationDetailsMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(locationSchema),
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

            const selectedCountry = Country.getCountryByCode(data.country);
            const countryName = selectedCountry ? selectedCountry.name : data.country;


            const payload = {
                ...data,
                country: countryName,
            };

            const res = await locationDetails(payload);
            console.log(res);

            if ("error" in res && res.error) {
                const errorData = res.error as FetchBaseQueryErrorWithData;

                if (errorData.data?.success == false) {
                    console.log(errorData.data.message);
                    toast.error(errorData.data.message);
                    return;
                }
            } else {
                const successData = res.data as ApiResponse;
                console.log(successData);
                toast.success(successData.message);
                navigate("/photoupload");
            }
        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred.");
        }
    };

    // Country change handler
    const handleCountryChange = (country: string) => {

        const countryData = Country.getCountryByCode(country); // Changed to getCountryByCode
        if (countryData) {
            // Check if country data is valid before getting states
            const countryStates = State.getStatesOfCountry(countryData.isoCode);
            setStates(countryStates || []); // Ensure the states are an empty array if none are found
        } else {
            setStates([]); // Clear states if no valid country
        }
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

            <div className="text-center text-white mb-8">
                <h1 className="text-4xl font-[Bembo-MT-Pro-Bold] mb-2">Your Location details</h1>
                <p className="text-lg font-[Bembo-MT-Pro-Light]">
                    Adding your location helps us find matches nearby or in regions that
                    suit your preferences
                </p>
            </div>

            <form
                className="md:px-30 mt-5 flex flex-col font-[Bembo-MT-Pro-Regular]  xl:px-40 2xl:px-60 3xl:mt-20 3xl:px-60"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* <div className="mb-4">
                    <label className="block text-white">Citizenship*</label>
                    <div>
                        <select
                            className="w-full rounded-[0.5rem] border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
                            {...register("citizenShip")}
                        >
                            <option value="" disabled selected>
                                Select your Citizenship
                            </option>
                            {citizenShip.map((citizenship) => (
                                <option key={citizenship.id} value={citizenship.value}>
                                    {citizenship.value}
                                </option>
                            ))}
                        </select>
                        {errors.citizenShip && (
                            <p className="text-orange-200">
                                {errors.citizenShip.message?.toString()}
                            </p>
                        )}
                    </div>
                </div> */}

                <div className="mb-4">
                    <label className="block text-white">Current Location*</label>
                    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                        <div className="w-full">
                            <select
                                className="w-full rounded-[0.5rem] border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
                                {...register("country")}
                                onChange={(e) => handleCountryChange(e.target.value)} // Handle country change
                            >
                                <option value="" disabled selected>
                                    Country
                                </option>
                                {
                                    Country.getAllCountries().map((country, index) => (
                                        <option key={index} value={country.isoCode}>
                                            {country.name}
                                        </option>
                                    ))
                                }
                            </select>
                            {errors.country && (
                                <p className="text-orange-200">
                                    {errors.country.message?.toString()}
                                </p>
                            )}
                        </div>

                        <div className="w-full">
                            <select
                                className="w-full rounded-[0.5rem] border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
                                {...register("state")}
                            >
                                <option value="" disabled selected>
                                    State
                                </option>
                                {states.map((state, index) => (
                                    <option key={index} value={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                            {errors.state && (
                                <p className="text-orange-200">
                                    {errors.state.message?.toString()}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* <div className="mb-4">
                    <label className="block text-white">
                        Indian visa status (if applicable)*
                    </label>
                    <div className="mb-4">
                        <select
                            className="w-full rounded-[0.5rem] border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
                            {...register("austrailanVisaStatus")}
                        >
                            <option value="" disabled selected>
                                Select your visa status
                            </option>
                            {australianVisaStatus.map((visaStatus) => (
                                <option key={visaStatus.id} value={visaStatus.value}>
                                    {visaStatus.value}
                                </option>
                            ))}
                        </select>
                        {errors.austrailanVisaStatus && (
                            <p className="text-orange-200 flex-col">
                                {errors.austrailanVisaStatus.message?.toString()}
                            </p>
                        )}
                    </div>
                </div> */}

                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className={`w-full rounded-[0.5rem] bg-[#F9F5FFE5] px-4 py-2 ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
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
            </form>
            </div>
        </div>
    );
};

export default LocationDetails;
