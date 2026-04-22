
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useSendWhatsAppOtpMutation,
  useVerifyWhatsAppOtpMutation,
} from "../../Redux/Api/user.api";

import { setUser } from "../../Redux/Reducers/user.reducer";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { connectSocket } from "../../services/socketservice";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

import { Helmet } from "react-helmet-async";
import { z } from "zod";

import { LoadingOutlined } from "@ant-design/icons";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../../../utils/firebaseConfig.ts";

/* ================= VALIDATION ================= */

const schema = z.object({
  phone: z.string().min(10, "Enter valid 10 digit number"),
  otp: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const WhatsAppLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState<"phone" | "otp">("phone");

  const [sendOtp, { isLoading: sendingOtp }] =
    useSendWhatsAppOtpMutation();
  const [verifyOtp, { isLoading: verifyingOtp }] =
    useVerifyWhatsAppOtpMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      phone: "",
      otp: "",
    },
    resolver: zodResolver(schema),
  });

  const [otpValues, setOtpValues] = useState(Array(6).fill(""));

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    const combined = newOtp.join("");
    setValue("otp", combined);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleOtpKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  type ApiResponse = {
    success: boolean;
    message: string;
    user: any;
  };

  type FetchError = FetchBaseQueryError & {
    data?: ApiResponse;
  };

  /* ================= SUBMIT ================= */

  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    try {
      event?.preventDefault();

      if (step === "phone") {
        const res = await sendOtp({ phone: data.phone });

        if ("error" in res) {
          const err = res.error as FetchError;
          toast.error(err?.data?.message || "Failed to send OTP");
          return;
        }

        toast.success("OTP sent to WhatsApp");
        setStep("otp");
        return;
      }

      if (step === "otp") {
        const res = await verifyOtp({
          phone: data.phone,
          otp: data.otp,
        });

        if ("error" in res) {
          const err = res.error as FetchError;

          if (err.status === 403) {
            navigate("/user-suspended");
            return;
          }

          toast.error(err?.data?.message || "Invalid OTP");
          return;
        }

        if ("data" in res && res.data) {
          const successData = res.data;

          try {
            await signInWithCustomToken(
              auth,
              successData.user.firebaseToken
            );
          } catch (err) {
            toast.error("Firebase login failed");
            return;
          }

          dispatch(setUser(successData));
          connectSocket();

          toast.success(successData.message);

          const user = successData.user;

          await Promise.resolve();

          if (!user.isPersonalFormFilled) {
            navigate("/personal-details");
          } else if (!user.isQualificationFormFilled) {
            navigate("/qualification-details");
          } else if (!user.isLocationFormFilled) {
            navigate("/location-details");
          } else if (!user.isImageFormFilled) {
            navigate("/photoupload");
          } else if (!user.isOtherFormFilled) {
            navigate("/other-details");
          } else {
            navigate("/user-dashboard");
          }
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Helmet>
        <title>WhatsApp Login | Vedvivah</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-w-screen h-screen flex items-center justify-center bg-gradient-to-b from-[#f6f6f6] to-[#FD5C90]">
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl w-full max-w-md">

          <div className="flex justify-center mb-6">
            <Link to="/">
              <img src="/logotest3.png" className="h-20" />
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-center">
            Login with WhatsApp
          </h1>

          <p className="text-center text-gray-500 text-sm mt-2">
            Enter your WhatsApp number to receive OTP
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">

            <div>
              <label className="text-sm font-medium">WhatsApp Number</label>

              <div className="flex items-center border rounded-xl px-3 py-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  className="w-5 h-5 mr-2"
                />
                <input
                  {...register("phone")}
                  placeholder="Enter 10 digit number"
                  className="w-full outline-none"
                />
              </div>

              {errors.phone && (
                <p className="text-red-500 text-sm">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* ✅ 6 DIGIT OTP BOX */}
            {step === "otp" && (
              <div>
                <label className="text-sm font-medium">Enter OTP</label>
                <div className="flex justify-between gap-2 mt-2">
                  {otpValues.map((val, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={val}
                      onChange={(e) =>
                        handleOtpChange(e.target.value, i)
                      }
                      onKeyDown={(e) =>
                        handleOtpKeyDown(e, i)
                      }
                      className="w-10 h-12 text-center border rounded-md text-lg outline-none focus:ring-2 focus:ring-[#FD5C90]"
                    />
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 bg-[#FD5C90] text-white rounded-md"
              disabled={sendingOtp || verifyingOtp}
            >
              {sendingOtp || verifyingOtp ? (
                <LoadingOutlined className="animate-spin" />
              ) : step === "phone" ? (
                "Send OTP"
              ) : (
                "Verify & Login"
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/login" className="text-[#FD5C90] text-sm">
              Login with Email & Password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsAppLogin;