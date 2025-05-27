import React from 'react';
import Input from '../Input';
import Link from 'next/link';


interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
<div className="flex items-center justify-center   ">
<div className="backdrop-blur-xl

  p-8 rounded-lg absolute top-16 xl:top-32 md:right-20 xl:w-[50%] ">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-black bg-white rounded-sm w-10">&times;</button>
        <form className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-5">
          <div className="mb-4 md:col-span-2">
            <Input label='' type="email" className="border w-full  bg-white border-gray-300 px-10 p-2 rounded-3xl" placeholder='Enter your email' />
          </div>
          <div className="mb-4 md:col-span-2">
            <Input label='' type="password" className="border w-full bg-white border-gray-300 px-10 p-2 rounded-3xl"  placeholder='Enter your password'/>
          </div>
          <button type="submit" className="bg-[#E65555] text-white px-4 py-2  h-10 w-full rounded-3xl">Login</button>
         
        </form>
        <div className="flex flex-col xl:flex-row items-center justify-between xl:justify-between  mb-4 mt-2 ">
            <div className="flex items-center">
              <input type="checkbox" id="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe" className="text-white">Remember me</label>
            </div>
            <Link href="/forgotpassword" className="text-white xl:mr-40 underline">Forgot your login details?</Link>
          </div>
          <div className="flex items-center justify-center my-4">
          <hr className="flex-grow border-gray-400" />
          <span className="mx-4 text-white">Or</span>
          <hr className="flex-grow border-gray-400" />
        </div>
        <div className="flex xl:items-left xl:justify-left ">
          <p>New User ? <Link href="/register" className="text-white ">Create an account</Link></p>
        </div>

      </div>
      
    </div>
  );
};

export default Login;
