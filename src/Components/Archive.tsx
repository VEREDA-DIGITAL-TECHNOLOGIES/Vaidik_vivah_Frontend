import React from "react";
import { CiHeart } from "react-icons/ci";
import '../app/font.css';

const Archive = () => {
  return (
    <div>
      <div className="bg-[#009BDA] text-white md:grid grid-cols-3 font-lato ">
        <div className="flex flex-col items-center gap-3 text-center justify-center py-8">
          <CiHeart className="text-4xl" />
          <h1 className="text-3xl font-bold">1000+</h1>
          <p className="text-lg" style={{ fontFamily: 'Proxima-Nova-Regular, sans-serif' }}>
            5 Star reviews from our loving <br /> customers
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 text-center bg-[#007EAF] py-8">
          <CiHeart className="text-4xl" />
          <h1 className="text-3xl font-bold">The #1 Trusted <br /> Matrimonial App</h1>
          <p className="text-lg" style={{ fontFamily: 'Proxima-Nova-Regular, sans-serif' }}>Privacy with your account</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 text-center  py-12">
          <CiHeart className="text-4xl" />
          <h1 className="text-3xl font-bold">250+</h1>
          <p className="text-lg" style={{ fontFamily: 'Proxima-Nova-Regular, sans-serif' }}>
            Cities covers by us for <br />
            services
          </p>
        </div>
      </div>
    </div>
  );
};

export default Archive;
