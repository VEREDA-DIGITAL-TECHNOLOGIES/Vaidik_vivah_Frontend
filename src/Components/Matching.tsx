import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import { FiMic } from "react-icons/fi";
import { PiChatsBold } from "react-icons/pi";
import { IoMdArrowForward } from "react-icons/io";
import '../app/font.css';
const Matching = () => {
  return (
    <div className="bg-[#FFC1C1] px-6  py-6 relative  ">
      <div className="bg-[url('/shadow.png')] -rotate-342 absolute w-[80rem] h-[100%]  top-0 right-0 "></div>
      <Image
    src="/curve.png"
    alt="arw"
    width={100}
    height={100}
    className="absolute w-[32rem] right-2 -top-4 "
  />



      <div className="text-[#4E3A63] py-10 pb-10 px-14   ">
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold" style={{ fontFamily: 'Proxima-Nova-Bold, sans-serif', lineHeight: '89.5px' }}>Vedic Matchmaking</h1>
        <p className=" md:text-[28px] " style={{ fontFamily: 'Proxima-Nova-Regular, sans-serif', letterSpacing: '1px' ,lineHeight: '42px',opacity: '0.8' }}>
        Beyond algorithms — we connect hearts with purpose, rooted in timeless dharmik wisdom and cultural harmony
        </p>
      </div>
      <div className="md:flex  ml-10 justify-between items-center  w-[90%] gap-40  bg-[#FF6666] rounded-3xl px-10 py-5 opacity-95	">
      <div className="relative w-full h-full flex justify-center items-center">
        <Image
          src="/matching.svg"
          width={800}
          height={600}
          alt="couple"
          className="max-w-full max-h-full object-contain"
        />
      </div>
        <div className="space-y-5 mr-40">
          <p className="md:w-96 text-white">
          Every profile is carefully guided by dharmik principles, blending respect, privacy, and purposeful connection
          </p>
          <div className="space-y-2 ">
            <div className="flex items-center gap-5 rounded-xl bg-[#FFFFFF80] md:w-96 h-10 px-5">
              <FaStar className="text-2xl text-yellow-400 " />
              <h1 className="md:text-xl " style={{ fontFamily: 'Proxima-Nova-Bold, sans-serif' }}>Top Rated Consultants</h1>
            </div>
            <div className="flex items-center gap-5 rounded-xl bg-[#FFFFFF80] md:w-96 h-10 px-5">
              <FiMic className="text-2xl text-[#E65555] " />
              <h1 className="md:text-xl " style={{ fontFamily: 'Proxima-Nova-Bold, sans-serif' }}>100% Privacy</h1>
            </div>
            <div className="flex items-center gap-5 rounded-xl bg-[#FFFFFF80] md:w-96 h-10 px-5">
              <PiChatsBold className="md:text-2xl text-lg text-[#008435] " />
              <h1 className="md:text-xl text-sm " style={{ fontFamily: 'Proxima-Nova-Bold, sans-serif' }}>
                5 times higher success rates
              </h1>
            </div>
            <div className="flex items-center gap-5 rounded-xl bg-[#FFFFFF80] md:w-96 h-10 px-5">
              <PiChatsBold className="md:text-2xl text-lg text-[#008435] " />
              <h1 className="md:text-xl text-sm " style={{ fontFamily: 'Proxima-Nova-SemiBold, sans-serif' }}>
                5 times higher success rates
              </h1>
            </div>
            <div className="flex items-center gap-5 rounded-xl bg-[#FFFFFF80] md:w-96 h-10 px-5">
              <PiChatsBold className="md:text-2xl text-lg text-[#008435] " />
              <h1 className="md:text-xl text-sm " style={{ fontFamily: 'Proxima-Nova-SemiBold, sans-serif' }}> 
                5 times higher success rates
              </h1>
            </div>
            
          </div>
          <div className="flex items-end justify-between">
            <div className="flex items-center justify-between px-4 text-white bg-[#3C2C4C] rounded-full md:w-60 md:h-16 h-10 ">
              <button className="md:text-lg text-sm">Check your Eligibility </button>
              <IoMdArrowForward className="md:text-2xl text-lg " />
            </div>
            <div className="text-white text-sm md:text-lg cursor-pointer md:relative left-[150px] ">Read more</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matching;
