'use client'
import React from "react";
import Input from "../../Components/Input";
import Image from "next/image";

const Login = () => {
  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-top  bg-[#E65555] ">
      <div className="flex items-center justify-center mb-2 md:mb-10 ">
        <Image src="/logowhite.png" alt="" width={268} height={90} />
      </div>
      <div className="flex flex-col items-center justify-center mt-4 ">
        <div className="bg-white flex items-center justify-center rounded-md w-12 h-12">
          <Image src="/login.png" alt="login" width={20} height={20} />
        </div>
      </div>

       <div className="flex flex-col items-center justify-center text-white mt-4">
          <h1 className="text-2xl md:text-4xl font-bold">Log in to your account</h1>
          <p className="mt-4 md:text-lg text-center"> Welcome back! Please enter your details. </p>
        </div>

        <div  className="w-full max-w-md px-2   py-2 mt-4">
          <form action=" ">
            <div className="">
              <Input
              placeholder="Enter your email" label="Email"  
              />
              <Input
              placeholder="Enter your password" label="Password"
  
              />
            
            </div>
            <div className="flex items-center justify-end mb-8  text-[#F9F5FF] gap-1 text-lg">
                <button>Forgot password</button>

            </div>

            
              <button className="bg-white text-[#E65555] w-full h-12 rounded-md">
                Confirm
              </button>

            </form>
              <button className=" bg-transparent border  text-[#ffffff] mt-2 w-full h-12 rounded-md"onClick={() => window.location.href = '/register'} >
                Create an account
              </button>

            </div>

    </div> 
  );
};

export default Login;
