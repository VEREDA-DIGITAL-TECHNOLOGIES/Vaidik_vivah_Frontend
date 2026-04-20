import Input from "../../Components/input/Input.tsx";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from "../../Redux/Api/user.api";
import { setUser } from "../../Redux/Reducers/user.reducer";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { connectSocket } from "../../services/socketservice";
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner'
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import { z } from 'zod'

import { LoadingOutlined } from '@ant-design/icons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/firebaseConfig.ts";

/* ✅ NEW: React Icons */
import { FiMail, FiLock } from "react-icons/fi";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [isExclusive, setExclusive] = useState(false);

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive) {
      setExclusive(true)
    }
  }, [])

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [login, { isLoading }] = useLoginMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  type ApiResponse = {
    success: boolean;
    message: string;
    user: {
      isLocationFormFilled: boolean;
      isPersonalFormFilled: boolean;
      isImageFormFilled: boolean;
      isQualificationFormFilled: boolean;
      isOtherFormFilled: boolean;
    };
  };

  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await login(data);

      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;

        if (errorData.status === 403) {
          navigate("/user-suspended");
          localStorage.setItem(
            "block_reason",
            errorData.data?.message || "Account blocked by admin"
          );
          return;
        }

        if (errorData.data?.success === false) {
          toast.error(errorData.data.message);
          return;
        }
      }

      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      console.log("User signed in:", user);

      if ('data' in res && res.data) {
        const successData = res.data as ApiResponse;
        dispatch(setUser(res.data));
        connectSocket();
        toast.success(successData.message);

        if (successData.success === true) {
          const {
            isLocationFormFilled,
            isPersonalFormFilled,
            isImageFormFilled,
            isQualificationFormFilled,
            isOtherFormFilled
          } = successData.user;

          if (!isPersonalFormFilled) {
            navigate('/personal-details');
          } else if (!isQualificationFormFilled) {
            navigate('/qualification-details');
          } else if (!isLocationFormFilled) {
            navigate('/location-details');
          } else if (!isImageFormFilled) {
            navigate('/photoupload');
          } else if (!isOtherFormFilled) {
            navigate('/other-details');
          } else {
            navigate("/user-dashboard");
          }
        }
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Vedvivah Account Access</title>
        <meta name="description" content="Login to your Vedvivah account to continue your matchmaking journey. Secure and trusted matrimony platform." />
        <meta name="keywords" content="login Vedvivah, matrimony login, user account login, marriage site login" />

        <meta property="og:title" content="Vedvivah Login" />
        <meta property="og:description" content="Access your Vedvivah account securely." />
        <meta property="og:image" content="https://vedvivah.com/logotest3.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vedvivah.com/login" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vedvivah Login" />
        <meta name="twitter:description" content="Login to your matrimony account." />
        <meta name="twitter:image" content="https://vedvivah.com/logotest3.png" />

        <link rel="canonical" href="https://vedvivah.com/login" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f6f6f6] to-[#FD5C90]">
        
        <div className="flex items-center justify-center mb-10">
          <Link to={"/"} className="mx-auto mb-2 fixed top-5">
            <img src="/logotest3.png" alt="logo" className="h-24 w-auto md:h-24 ml-3" />
          </Link>
        </div>

        <div className='bg-white/60 backdrop-blur-md px-5 py-6 rounded-2xl shadow-xl w-full max-w-md'>

          <div className="flex flex-col items-center justify-center mt-4">
            <div className="bg-white flex items-center justify-center rounded-xl w-14 h-14 shadow-md">
              <img src="/login.png" alt="login" className='w-12 h-12' />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-black mt-4">
            <h1 className="text-2xl md:text-3xl font-bold">Log in to your account</h1>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div className="w-full mt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* EMAIL */}
              <div className="relative">
                <Input
                  {...register("email")}
                  placeholder="Enter your email"
                  label="Email"
                />
                <FiMail className="absolute right-3 top-10 text-gray-400 text-lg" />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

              {/* PASSWORD */}
              <div className="relative">
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                  label="Password"
                />
                <FiLock className="absolute right-3 top-10 text-gray-400 text-lg" />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

              <div className="flex items-center justify-end text-sm">
                <Link to={"/forgot-password"} className="text-[#FD5C90] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className={`bg-[#FD5C90] ${isExclusive ? 'text-[#60457E]' : 'text-white'} w-full h-12 rounded-xl font-medium shadow-md hover:scale-[1.02] transition`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingOutlined className={`${isExclusive ? 'text-[#60457E]' : 'text-white'} animate-spin`} />
                ) : 'Confirm'}
              </button>
            </form>

            <button
              className="bg-transparent border mt-3 w-full h-12 rounded-xl text-[#FD5C90] hover:bg-[#FD5C90]/5 transition"
              onClick={() => navigate("/questions")}
            >
              Create an account
            </button>

            <button
              onClick={() => navigate("/login-whatsapp")}
              className="border w-full h-12 mt-3 rounded-xl text-[#FD5C90] flex items-center justify-center gap-2 hover:bg-[#FD5C90]/5 transition"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" className="w-5 h-5" />
              Login with WhatsApp
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Login;