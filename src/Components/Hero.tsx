"use client";
import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import '../app/globals.css'

function Hero() {
  const imagePaths = [
    "/img1.png",
    "/img2.png",
    "/img3.png",
    "/img4.png",
    "/img5.png",
    "/img6.png",
    "/img7.png",
    "/img8.png",
    "/img9.png",
    "/img10.png",
    "/img11.png",
    "/img12.png",
    "/img13.png",
    "/img14.png",
    "/img15.png",
    "/img16.png",
    "/img17.png",
    "/img18.png",
    "/img19.png",
    "/img20.png",
    "/img21.png",
    "/img22.png",
    "/img23.png",
    "/img24.png",
    "/img25.png",
    "/img11.png",
    "/img12.png",
    "/img13.png",
    "/img21.png",
    "/img22.png",
    "/img23.png",
    "/img24.png",
    "/img25.png",
    "/img11.png",
    "/img12.png",
    "/img13.png",
    "/img21.png",
    "/img22.png",
    "/img23.png",
    "/img24.png",
    "/img21.png",
    "/img22.png",
    "/img23.png",
    "/img24.png",
    "/img25.png",
    "/img11.png",
    "/img12.png",
    

    
  ];

  return (
    <div className="relative xl:h-[46rem] h-[100vh] overflow-hidden">
       <div className="absolute inset-0 bg-black">
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-1 md:gap-2 rotate-12 h-full scale-[1.39]">
          {imagePaths.map((path, index) => (
            <div key={index} className="relative w-full h-20 md:h-auto">
              <Image src={path} layout="fill"  alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="relative bg-black  bg-opacity-60  text-white h-full md:pl-16 md:flex  md:pt-32 pt-16 md:px-10 gap-80">
        <div className="space-y-20 ">
        <div className="flex flex-col justify-center gap-10 ml-10 mt-20">
            <h1 className=" text-4xl md:text-4xl mt-10 md:mt-0 xl:text-8xl font-bold  " style={{ fontFamily: 'Proxima-Nova-Bold, sans-serif', letterSpacing: '2px' }}>
              Love At <br /> First Swipe
            </h1>
            <p className=" text-2xl "  style={{ fontFamily: 'Proxima-Nova-Thin, sans-serif', letterSpacing: '2px' }}>
              India{`'`}s most trusted Matrimony <br /> Website and Mobile
              Application
            </p>
          </div>
          <div className="absolute top-[60px] right-[130px] backdrop-blur backdrop-brightness-125 rounded-3xl w-64 h-3/5 border-8 border-white-2 flex items-center justify-center hidden md:block ">
  
          </div>

          <Link href={"/questions"}  className="flex items-center justify-between bg-[#E65555] rounded-full w-56 h-12 px-5 text-lg ml-10" >
            <div className="flex items-center gap-6">
              <span>  Start free today </span>
              <span className="text-2xl"> <IoMdArrowForward /></span>
            </div>
            
          </Link>
        </div>
        <div className="absolute bottom-0 right-0 md:bottom-0 xl:bottom-40 xl:left-[72rem] 2xl:left-[80rem] hidden md:block"
  style={{ transform: 'translateY(50%)' }}
>
  <div className="flex flex-col items-center gap-2">
    <Image src="/veri.png" width={50} height={50} alt="logo" />
    <p className="text-center md:text-[14px]" style={{ fontFamily: 'Proxima-Nova-Bold, sans-serif' }}>
      #1 matrimony <br /> website and mobile <br /> app
    </p>
    <p className="text-[6px] md:text-[10px] mt-1s" style={{ fontFamily: 'Proxima-Nova-Thin, sans-serif' }}>
      All photos are used for illustrative purposes only.
    </p>
  </div>
</div>


      </div>
    </div>
  );
}

export default Hero;
