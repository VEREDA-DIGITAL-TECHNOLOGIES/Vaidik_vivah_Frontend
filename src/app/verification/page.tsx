"use client";
import React, { useState } from "react";
import Input from "../../Components/Input";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Verification = () => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/createpassword");
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-top  bg-[#E65555] ">
      <div className="flex items-center justify-center mb-14 ">
        <Image src="/logowhite.png" alt="" width={268} height={90} />
      </div>
      <div className="flex flex-col items-center justify-center mt-8 mb-2">
        <div className="bg-white flex items-center justify-center rounded-md w-12 h-12  ">
          <Image src="/lock.png" alt="Star" width={16} height={18} />
        </div>

        <div className="flex flex-col items-center justify-center text-white mt-4">
          <h1 className="text-4xl font-bold">Verification code</h1>
          <p className="mt-4 md:text-lg text-center">
            Enter verification code which is sent to your email <br /> address
            and you verify
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <form action=" " onSubmit={handleSubmit}>
            <div className="flex gap-4">
              {[0, 1, 2, 3].map((index) => (
               <Input
               key={index}
               label=""
               value={verificationCode[index]}
               onChange={(value) => handleChange(index, value)}
               className="w-16 h-16 text-center rounded-xl text-3xl text-[#E65555] placeholder-[#E65555] outline-gray-400"
               type="text"
               inputMode="numeric"
               maxLength={1}
               placeholder="0"
            
             />
              ))}
            </div>
            <div className="flex items-center justify-center mt-8 text-[#F9F5FF] gap-1 text-lg">
              <p>Did you not receive code? </p>
              <button> Click to resend.</button>
            </div>
            <button className="bg-white text-[#E65555] w-full h-12 rounded-xl">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verification;
