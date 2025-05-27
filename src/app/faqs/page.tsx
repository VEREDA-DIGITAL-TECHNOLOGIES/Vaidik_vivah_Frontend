import FAQ from "@/Components/FAQs2";
import React from "react";
import { CiSearch, CiHeart } from "react-icons/ci";

const page = () => {
  return (
    <div className="pt-[83.5px] font-lato ">
      <div className="flex flex-col items-center justify-center py-16 gap-9 bg-[#E6F2F7] px-16">
        <span className="text-blue-600">FAQs</span>
        <h1 className="text-5xl font-semibold">Frequently asked questions</h1>
        <h4 className="text-[#475467]">Have questions? We’re here to help.</h4>
        <div className="flex items-center border-2 border-[#D0D5DD] rounded h-10 w-60 bg-white">
          <CiSearch className="text-3xl" />
          <input
            type="text"
            className="w-full h-full rounded border-none"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 p-20 gap-8 bg-[#F5F4F4]">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="rounded-full bg-[#F4EBFF] w-10 h-10 flex items-center justify-center">
            <CiHeart className="text-[#E65555] text-2xl"/>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-semibold">Is there a free trial available?</h1>
          <p className="text-[#475467] text-center">
            Yes, you can try us for free for 30 days. Our friendly team will
            work with you to get you up and running as soon as possible.
          </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="rounded-full bg-[#F4EBFF] w-10 h-10 flex items-center justify-center">
            <CiHeart className="text-[#E65555] text-2xl"/>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-semibold">Is there a free trial available?</h1>
          <p className="text-[#475467] text-center">
            Yes, you can try us for free for 30 days. Our friendly team will
            work with you to get you up and running as soon as possible.
          </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="rounded-full bg-[#F4EBFF] w-10 h-10 flex items-center justify-center">
            <CiHeart className="text-[#E65555] text-2xl"/>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-semibold">Is there a free trial available?</h1>
          <p className="text-[#475467] text-center">
            Yes, you can try us for free for 30 days. Our friendly team will
            work with you to get you up and running as soon as possible.
          </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="rounded-full bg-[#F4EBFF] w-10 h-10 flex items-center justify-center">
            <CiHeart className="text-[#E65555] text-2xl"/>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-semibold">Is there a free trial available?</h1>
          <p className="text-[#475467] text-center">
            Yes, you can try us for free for 30 days. Our friendly team will
            work with you to get you up and running as soon as possible.
          </p>
          </div>
        </div>
         <div className="flex flex-col items-center justify-center gap-8">
          <div className="rounded-full bg-[#F4EBFF] w-10 h-10 flex items-center justify-center">
            <CiHeart className="text-[#E65555] text-2xl"/>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-semibold">Is there a free trial available?</h1>
          <p className="text-[#475467] text-center">
            Yes, you can try us for free for 30 days. Our friendly team will
            work with you to get you up and running as soon as possible.
          </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="rounded-full bg-[#F4EBFF] w-10 h-10 flex items-center justify-center">
            <CiHeart className="text-[#E65555] text-2xl"/>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-semibold">Is there a free trial available?</h1>
          <p className="text-[#475467] text-center">
            Yes, you can try us for free for 30 days. Our friendly team will
            work with you to get you up and running as soon as possible.
          </p>
          </div>
        </div>
        
      </div>
      <FAQ/> 
      <div className="py-20 text-center bg-[#F5F4F4] space-y-8">
        <p className="">Still have questions?</p>
        <p className='text-[#475467]'>Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
        <button className="bg-light-blue text-white py-2 px-4 rounded">Get in touch</button>
      </div>
    </div>
  );
};

export default page;
