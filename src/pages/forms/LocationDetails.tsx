import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocationDetailsMutation } from "../../Redux/Api/form.api";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import "../../font.css";
import { z } from "zod";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";

/* =======================
   ZOD SCHEMA
======================= */
const locationSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  fullAddress: z
    .string()
    .min(10, "Full address must be at least 10 characters"),
});

type LocationFormData = z.infer<typeof locationSchema>;

const LocationDetails: React.FC = () => {
  const navigate = useNavigate();
  const [isExclusive, setExclusive] = useState(false);
  const [states, setStates] = useState<any[]>([]);

  /* =======================
     CHECK EXCLUSIVE MODE
  ======================= */
  useEffect(() => {
    const exclusive = localStorage.getItem("isExclusive");
    if (exclusive) {
      setExclusive(true);
    }
  }, []);

  /* =======================
     API
  ======================= */
  const [locationDetails, { isLoading }] = useLocationDetailsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
  });

  type ApiResponse = {
    success: boolean;
    message: string;
  };

  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
  };

  /* =======================
     SUBMIT HANDLER
  ======================= */
  const onSubmit = async (data: LocationFormData) => {
    try {
      const selectedCountry = Country.getCountryByCode(data.country);
      const countryName = selectedCountry
        ? selectedCountry.name
        : data.country;

      const payload = {
        ...data,
        country: countryName,
      };
    //   console.log("location data are ", payload);
      const res = await locationDetails(payload);

      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;
        if (errorData.data?.success === false) {
          toast.error(errorData.data.message);
          return;
        }
      } else {
        const successData = res.data as ApiResponse;
        toast.success(successData.message);
        navigate("/photoupload");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
  };

  /* =======================
     COUNTRY CHANGE
  ======================= */
  const handleCountryChange = (countryCode: string) => {
    const countryData = Country.getCountryByCode(countryCode);
    if (countryData) {
      const countryStates = State.getStatesOfCountry(countryData.isoCode);
      setStates(countryStates || []);
    } else {
      setStates([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f6f6] to-[#FD5C90] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="/logotest3.png"
          alt="logo"
          className="h-24 w-auto"
        />
      </div>

      <div className="w-full max-w-3xl">
        {/* Heading */}
        <div className="text-center text-[#FD5C90] mb-8">
          <h1 className="text-4xl font-[Bembo-MT-Pro-Bold] mb-2">
            Your Location Details
          </h1>
          <p className="text-lg font-[Bembo-MT-Pro-Light]">
            Adding your location helps us find matches nearby or in regions that
            suit your preferences
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-6 font-[Bembo-MT-Pro-Regular]"
        >
          {/* Country + State */}
          <div>
            <label className="block text-white mb-2">
              Current Location*
            </label>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Country */}
              <div className="w-full">
                <select
                  className="w-full rounded-[0.5rem] border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
                  {...register("country")}
                  onChange={(e) => handleCountryChange(e.target.value)}
                >
                  <option value="" disabled selected>
                    Country
                  </option>
                  {Country.getAllCountries().map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-orange-200">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* State */}
              <div className="w-full">
                <select
                  disabled={!states.length}
                  className="w-full rounded-[0.5rem] border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
                  {...register("state")}
                >
                  <option value="" disabled selected>
                    State
                  </option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-orange-200">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Full Address */}
          <div>
            <label className="block text-white mb-2">
              Full Address*
            </label>
            <textarea
              rows={4}
              placeholder="House no, street, city, landmark, pincode"
              className="w-full rounded-[0.5rem] border bg-[#F9F5FFE5] p-3 text-[#838E9E] resize-none"
              {...register("fullAddress")}
            />
            {errors.fullAddress && (
              <p className="text-orange-200">
                {errors.fullAddress.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className={`w-full md:w-32 rounded-[0.5rem] bg-[#F9F5FFE5] px-4 py-2 ${
                isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
              }`}
            >
              {isLoading ? (
                <LoadingOutlined className="animate-spin" />
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
