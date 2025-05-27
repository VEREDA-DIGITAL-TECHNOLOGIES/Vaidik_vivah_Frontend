'use client'
import React, { useState } from "react";
import Input from "../../Components/Input";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Registration = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/verification");
    
  };

  return ( 
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-top  bg-[#E65555] ">
      <div className="flex items-center justify-center mb-14">
        <Image src="/logowhite.png" alt="Logo"   width={238} height={90}/>
      </div>

      <div className="flex flex-col items-center justify-center mt-8 mb-2">
        <div className="bg-white flex items-center justify-center rounded-md w-10 h-10 ">
          <Image src="/star.png" alt="Star" width={24} height={24} />
        </div>

        <div className="flex flex-col items-center justify-center text-white mt-4">
          <h1 className="text-4xl font-bold">Create an account</h1>
          <p className="mt-4 md:text-xl">Start your free 30-day trial. Cancel at any time.</p>
        </div>
      </div>

      



      <div className="w-full max-w-md px-2  py-4">
        <form action="" className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email"
            value={username}
            placeholder="Enter your email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 text-[#E65555] rounded bg-[#ffffff]"
          >
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
