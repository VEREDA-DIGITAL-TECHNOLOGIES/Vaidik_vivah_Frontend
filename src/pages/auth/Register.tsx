import { useState, useEffect } from 'react';
import Input from '../../Components/input/Input';
import { useRegisterUserMutation } from "../../Redux/Api/user.api";
import { setActivationToken } from "../../Redux/Reducers/user.reducer";
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { LoadingOutlined, InfoCircleOutlined } from '@ant-design/icons'; // Added Info icon
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import { z } from 'zod';
import { Helmet } from "react-helmet-async";

/* ================= VALIDATION ================= */

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  whatsapp: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{10}$/.test(val), {
      message: "Enter valid 10 digit number",
    }),
});

type FormData = z.infer<typeof schema>;

/* ================= COMPONENT ================= */

const Register = () => {
  const [isExclusive, setExclusive] = useState(false);
  console.log(isExclusive)
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive) setExclusive(true);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      whatsapp: "",
    },
    resolver: zodResolver(schema),
  });

  type ApiResponse = {
    success: boolean;
    message: string;
    activationToken?: string;
  };

  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data?: ApiResponse;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      localStorage.setItem("email", data.email);

      const res = await registerUser({
        email: data.email,
        whatsapp: data.whatsapp?.trim() || undefined,
      });

      if ('error' in res) {
        const errorData = res.error as FetchBaseQueryErrorWithData;

        if (errorData?.data?.success === false) {
          toast.error(errorData.data.message);
          return;
        }

        toast.error("Something went wrong");
        return;
      }

      const successData = res.data as ApiResponse | undefined;

      if (!successData) {
        toast.error("Unexpected response");
        return;
      }

      toast.success(successData.message);
      dispatch(setActivationToken(successData.activationToken!));
      navigate("/verification");

    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Account | Vedvivah Signup</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f6f6f6] to-[#FD5C90] px-4 py-10">
        
        {/* Card Container */}
        <div className="bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/20">

          {/* LOGO */}
          <div className="flex justify-center mb-10">
            <Link to={"/"} className="transition-transform hover:scale-105 duration-300">
              <img src="/logotest3.png" alt="logo" className="h-20 w-auto object-contain" />
            </Link>
          </div>

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Create Account</h1>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              OTP will be sent to your email and <br/> WhatsApp (if provided)
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            {/* EMAIL */}
            <div className="space-y-1">
              <Input
                label="Email Address"
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-medium ml-1">{errors.email.message}</p>
              )}
            </div>

            {/* WHATSAPP */}
            <div className="relative space-y-1">

              {/* LABEL WITH INFO ICON */}
              <div className="flex items-center justify-between px-1">
                <label className="text-sm font-semibold text-gray-700">
                  WhatsApp Number
                  <span className="text-gray-400 font-normal ml-1">(Optional)</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-gray-400 hover:text-[#FD5C90] transition-colors duration-200"
                  aria-label="Toggle information"
                >
                  <InfoCircleOutlined style={{ fontSize: '16px' }} />
                </button>
              </div>

              {/* INPUT BOX */}
              <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 bg-white transition-all duration-200 focus-within:border-[#FD5C90] focus-within:ring-4 focus-within:ring-[#FD5C90]/10 shadow-sm">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="whatsapp"
                  className="w-5 h-5 mr-3 opacity-80"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10 digit mobile number"
                  {...register("whatsapp")}
                  className="w-full outline-none text-sm font-medium text-gray-800 placeholder:text-gray-400 bg-transparent"
                />
              </div>

              {/* INFO BOX */}
              {showInfo && (
                <div className="mt-3 text-[13px] leading-relaxed text-gray-600 bg-gray-50 border border-gray-100 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                  Use your WhatsApp number to receive updates and login easily. 
                  You can always update this in your profile settings later.
                </div>
              )}

              {errors.whatsapp && (
                <p className="text-red-500 text-xs font-medium ml-1">
                  {errors.whatsapp.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#FD5C90] text-white font-bold text-lg shadow-lg shadow-[#FD5C90]/30 hover:shadow-[#FD5C90]/40 hover:translate-y-[-1px] active:translate-y-[1px] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                disabled={isSubmitting || isLoading}
              >
                {isLoading ? (
                  <LoadingOutlined className="animate-spin text-xl" />
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
            
            <p className="text-center text-sm text-gray-500 pt-2">
              Already have an account? <Link to="/login" className="text-[#FD5C90] font-bold hover:underline">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;