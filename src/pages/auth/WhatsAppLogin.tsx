
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
import { useRef, useState } from "react";

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
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  type ApiResponse = {
    success: boolean;
    message: string;
    user: any;
  };

  type FetchError = FetchBaseQueryError & {
    data?: ApiResponse;
  };

  /* ================= OTP HANDLER ================= */

  const handleOtpChange = (
    value: string,
    index: number
  ) => {
    value = value.replace(/\D/g, "");

    if (!otpRefs.current[index]) return;

    otpRefs.current[index]!.value = value;

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    updateOtpValue();
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !otpRefs.current[index]?.value &&
      index > 0
    ) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const updateOtpValue = () => {
    const otp = otpRefs.current
      .map((input) => input?.value || "")
      .join("");

    setValue("otp", otp);
  };

  /* ================= SUBMIT ================= */

  const onSubmit: SubmitHandler<FormData> = async (
    data,
    event
  ) => {
    try {
      event?.preventDefault();

      /* STEP 1 */
      if (step === "phone") {
        const res = await sendOtp({ phone: data.phone });

        if ("error" in res) {
          const err = res.error as FetchError;
          toast.error(
            err?.data?.message || "Failed to send OTP"
          );
          return;
        }

        toast.success("OTP sent to WhatsApp");
        setStep("otp");
        return;
      }

      /* STEP 2 */
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
          } catch {
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
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Helmet>
        <title>WhatsApp Login | Vedvivah</title>
      </Helmet>

      <div className="min-w-screen h-screen flex items-center justify-center bg-gradient-to-b from-[#f6f6f6] to-[#FD5C90]">
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl w-full max-w-md">

          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img
                src="/logotest3.png"
                className="h-20"
              />
            </Link>
          </div>

          {/* HEADER */}
          <h1 className="text-2xl font-bold text-center">
            Login with WhatsApp
          </h1>

          <p className="text-center text-gray-500 text-sm mt-2">
            Enter your WhatsApp number to receive OTP
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
          >
            {/* PHONE */}
            <div>
              <label className="text-sm font-medium">
                WhatsApp Number
              </label>

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

            {/* OTP BOXES */}
            {step === "otp" && (
              <div>
                <label className="text-sm font-medium block mb-2">
                  Enter OTP
                </label>

                <div className="flex justify-between gap-2">
                  {[0, 1, 2, 3, 4, 5].map(( index) => (
                    <input
                      key={index}
                      ref={(el) =>{
                        (otpRefs.current[index] = el)}
                      }
                      type="text"
                      maxLength={1}
                      onChange={(e) =>
                        handleOtpChange(
                          e.target.value,
                          index
                        )
                      }
                      onKeyDown={(e) =>
                        handleOtpKeyDown(e, index)
                      }
                      className="w-12 h-12 text-center text-xl border rounded-xl outline-none focus:border-[#FD5C90]"
                    />
                  ))}
                </div>

                <input
                  type="hidden"
                  {...register("otp")}
                />
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full h-12 bg-[#FD5C90] text-white rounded-md"
              disabled={
                sendingOtp || verifyingOtp
              }
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

          {/* LOGIN SWITCH */}
          <div className="text-center mt-4">
            <Link
              to="/login"
              className="text-[#FD5C90] text-sm"
            >
              Login with Email & Password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsAppLogin;