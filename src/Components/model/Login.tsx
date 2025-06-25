import React from "react";
import Input from "../input/Input.tsx";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../../Redux/Api/user.api.ts";
import { setUser } from "../../Redux/Reducers/user.reducer.ts";
import {  useForm } from "react-hook-form";
import type{ SubmitHandler } from "react-hook-form";

import { useDispatch } from "react-redux";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { LoadingOutlined } from "@ant-design/icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/firebaseConfig.ts";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, "Password is required"),
});

type FormData = z.infer<typeof loginSchema>;

interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
  }

const LoginModal: React.FC<LoginProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();




    const [login, { isLoading }] = useLoginMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    });

    type ApiResponse = {
        success: boolean;
        message: string;
        user?: any;
    };

    type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
        data: ApiResponse;
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {


            const res = await login(data);

            if ("error" in res && res.error) {
                const errorData = res.error as FetchBaseQueryErrorWithData;

                if (errorData.data?.success === false) {
                    toast.error(errorData.data.message);
                    return;
                }
            }
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            console.log('signIn user', user);


            dispatch(setUser(res.data));

            const successData = res.data as ApiResponse;
            toast.success(successData.message);

            if (successData.success === true) {

                const isLocationFormFilled = successData?.user?.isLocationFormFilled;
                const isPersonalFormFilled = successData?.user?.isPersonalFormFilled;
                const isImageFormFilled = successData?.user?.isImageFormFilled;
                const isQualificationFormFilled = successData?.user?.isQualificationFormFilled;
                const isOtherFormFilled = successData?.user?.isOtherFormFilled;




                const allFormsFilled = isLocationFormFilled && isPersonalFormFilled && isImageFormFilled && isQualificationFormFilled && isOtherFormFilled

                if (allFormsFilled) {
                    navigate('/user-dashboard');
                }
                else {
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
                    }
                }
            }


        } catch (error) {
            toast.error("An error occurred");
            console.log(error)
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
            <div className="bg-gradient-to-t from-[#FD5C90] to-[#f78aad]  p-6 rounded-lg w-full max-w-md relative sm:rounded-2xl  sm:p-8  overflow-y-auto max-h-[90vh]">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white text-3xl cursor-pointer hover:text-black"
                >
                    &times;
                </button>

                {/* Logo */}
                {/* <div className="flex justify-center mb-4">
                    <Link to={"/"} className='mx-auto mb-2 fixed top-10'>
                        <img src="/logotest3.png" alt="Logo" className="w-72 h-24 " />
                    </Link>
                </div> */}

                {/* Heading */}
                <h2 className="text-2xl font-[Bembo-MT-Pro-Bold] text-center mb-4 ">Login</h2>
                <p className=" text-center mb-6 font-[Bembo-MT-Pro-Regular]">
                    Please fill in your Email and Password to Sign In.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-4 font-[Bembo-MT-Pro-Regular]">
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <Input
                            label=""
                            {...register("email")}
                            type="email"
                            className="border w-full  bg-white border-gray-300  text-black px-10 p-2 rounded-3xl"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-orange-200">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="mb-4 font-[Bembo-MT-Pro-Regular]">
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <Input
                            label=""
                            type="password"
                            {...register("password")}
                            className="border w-full bg-white border-gray-300 text-black px-10 p-2 rounded-3xl"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-orange-200">{errors.password.message}</p>
                        )}
                    </div>

                    

                    <button
                        type="submit"
                        className="w-full bg-[#FD5C90] cursor-pointer text-white py-2 text-lg rounded-lg hover:bg-[#FD5C90] transition font-[Bembo-MT-Pro-Regular]"
                    >
                        {isLoading ? (
                            <LoadingOutlined className="text-white animate-spin" />
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                {/* Footer Text */}
                <div className=" text-sm space-y-1 font-[Bembo-MT-Pro-Regular]">
                    <div className="flex justify-between items-center mb-4 mt-2">
                        <div className="flex items-center">
                            <input type="checkbox" id="rememberMe" className="mr-2" />
                            <label htmlFor="rememberMe" className="text-white">
                                Remember me
                            </label>
                        </div>

                        <Link
                            to="/forgot-password"
                            className="text-white underline"
                        >
                            Forgot your login details?
                        </Link>
                    </div>

                    <div className="flex items-center justify-center my-4">
                        <hr className="flex-grow border-gray-400" />
                        <span className="mx-4 text-[white]">Or</span>
                        <hr className="flex-grow border-gray-400" />
                    </div>
                    <div className="flex xl:items-center xl:justify-center ">
                        <p>
                            New User ?{" "}
                            <Link to="/questions" className="text-[white] underline ">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            
            </div>
        </div>
    );
};

export default LoginModal;
