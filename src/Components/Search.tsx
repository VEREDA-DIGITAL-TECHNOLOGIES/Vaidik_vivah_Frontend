import Image from "next/image";
import React from "react";
import '../app/font.css';


const Search = () => {
  const Profile = [
    {
        
      img: "/p1.png",
      ct: "Bengali",
    },
    {
        img: "/p2.png",
        ct: "Gujarati",
      },
      {
        img: "/p3.png",
        ct: "Hindi",
      },
      {
        img: "/p4.png",
        ct: "Kannada",
      },
      {
        img: "/p4.png",
        ct: "Kannada",
      },
      {
        img: "/p4.png",
        ct: "Kannada",
      },
    
      {
        img: "/p5.png",
        ct: "Malayalam",
      },
      {
        img: "/p6.png",
        ct: "Marathi",
      },
      {
        img: "/p7.png",
        ct: "Odia",
      },
      {
        img: "/p8.png",
        ct: "Punjabi",
      },
      {
        img: "/p8.png",
        ct: "Telugu",
      },
      {
        img: "/p8.png",
        ct: "Telugu",
      },
    
  ];

  return (
    <div>
      {" "}
      <div
        className="md:space-y-10 relative min-h-screen  md:px-20 md:py-10  p-8 
    bg-[#E6F2F7]"
      >
          <Image
        src="/curvesm.svg"
        alt="arw"
        width={665}
        height={665}
        className="absolute  w-[48rem] -right-60 top-2 z-10"
      />
        
        <div className="md:space-y-10 space-y-5">
          <div className="flex items-center  justify-between pr-20">
            <h1 className=" text-[64px]  text-[#E65555]" style={{fontFamily: 'Proxima-Nova-Bold, sans-serif', lineHeight: '89.6px'}}>
              Browse matrimonial profiles by
            </h1>
          </div>
          <p className=" text-[28px]  text-[#101828E5]" style={{fontFamily: 'Proxima-Nova-Regular, sans-serif', lineHeight: '42px', letterSpacing:'2px'}}>
            Your search for a great relationship has never been easier with <br />
            groundbreaking overhaul of the eharmony you know and trust.
          </p>
        </div>
        <div className="md:flex justify-left gap-10 items-center ">
          <div className="rounded-full cursor-pointer hover:bg-[#f6a137] hover:text-white text-[#838E9E] p-4 text-[24px]" style={{fontFamily:'Proxima-Nova-SemiBold, sans-serif',lineHeight:'36px', letterSpacing:'3%'}}>
            Mother Tongue
          </div>
          <div className="rounded-full cursor-pointer hover:bg-[#f6a137] hover:text-white text-[#838E9E] p-4  text-[24px]" style={{fontFamily:'Proxima-Nova-SemiBold, sans-serif',lineHeight:'36px', letterSpacing:'3%'}}>
            Religion
          </div>
          <div className="rounded-full cursor-pointer hover:bg-[#f6a137] hover:text-white text-[#838E9E] p-4  text-[24px]" style={{fontFamily:'Proxima-Nova-SemiBold, sans-serif',lineHeight:'36px', letterSpacing:'3%'}}>
            Community
          </div>
          <div className="rounded-full cursor-pointer hover:bg-[#f6a137] hover:text-white text-[#838E9E] p-4  text-[24px]" style={{fontFamily:'Proxima-Nova-SemiBold, sans-serif',lineHeight:'36px', letterSpacing:'3%'}}>
            Nationality
          </div>
        </div>
        <div className="flex flex-col items-left gap-10">     
             <div className="grid md:grid-cols-6 grid-cols-3 gap-3">
            {Profile.map((P, index) =>
        (
            <div key={index} className="flex flex-col items-center gap-2">
            <Image
              src={P.img}
              alt="p1"
              width={150}
              height={100}
              className="rounded-full"
            />
            <h1>{P.ct}</h1>
          </div>
        ))}
         
        </div>
        <div className="underline  flex justify-end text-[28px] text-[#E65555] relative " style={{fontFamily:'Proxima-Nova-SemiBold, sans-serif',lineHeight:'42px'}}>
          <span>More Matrimonial</span>
          <span>{">"}</span>
        </div>
      </div>
      </div>

    </div>
  );
};

export default Search;
