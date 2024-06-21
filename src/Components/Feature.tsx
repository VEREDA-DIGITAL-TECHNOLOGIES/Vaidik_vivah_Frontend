import Image from 'next/image'
import React from 'react'
import '../app/font.css';

const Feature = () => {
  return (
      <div className='relative overflow-hidden '>
        <img
          src="/curvewhite.svg"
          alt="arw"
          className="absolute  w-[42rem] left-10 -top-10 -rotate-[128deg]"
        />
        <div className='bg-[#007EAF] flex flex-col md:flex-row justify-between text-white md:p-24 p-8  '>
      <div className='space-y-12 '>
        
          <h1 className='text-[52px] ' style={{fontFamily:'Proxima-Nova-Bold, sans-serif', lineHeight:'89.6px'}}>Connect with matches <br /> the way you like
          </h1>
          <p className='text-[28px] 'style={{fontFamily:'Proxima-Nova-Regular, sans-serif',lineHeight:'42px', letterSpacing:'2%'}}>Cras at pellentesque eros. Nullam vitae <br />sapien et felis eleifend luctus. Nam ac dui</p>
          <div className="">
          <div className="flex flex-col px-8 py-7 mt-9 rounded-3xl backdrop-blur-[4.6px] bg-white bg-opacity-80 md:w-1/2 lg:w-11/12 w-full max-w-lg mr-0 md:mr-20">
          <div className="flex gap-5 max-md:flex-wrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3210e61d4d30bb04cbc3ac498050ce730f1e42520cd645a03c371b6ead876f56?apiKey=8d68765060a54e4683a73062068958aa&"
            className="shrink-0 self-start w-10 aspect-square"
          />
          <div className="flex flex-col max-md:max-w-full">
            <div className="text-[28px] text-gray-900 text-opacity-90 max-md:max-w-full"  style={{fontFamily:'Proxima-Nova-Bold, sans-serif',lineHeight:'28px'}}>
              Video call
            </div>
            <div className="mt-1 text-[20px] leading-7 text-slate-600 max-md:max-w-full" style={{fontFamily:'Proxima-Nova-Regular, sans-serif',lineHeight:'28px'}}>
              Etiam sed vulputate nisl, eu elementum arcu. Vivamus dignissim
              tortor in tellus dictum pellentesque.{" "}
            </div>
          </div>
        </div>
        <div className="shrink-0 mt-6 h-px border border-solid bg-[#061C3D] opacity-15 border-[#061C3D] max-md:max-w-full" />
        <div className="flex gap-5 mt-6 max-md:flex-wrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2825795b564de286afb76a60b095a974f55deea179408dcc8b03a4ea2ab8c4af?apiKey=8d68765060a54e4683a73062068958aa&"
            className="shrink-0 self-start w-10 aspect-square"
          />
          <div className="flex flex-col max-md:max-w-full">
            <div className="text-[28px] text-gray-900 text-opacity-90 max-md:max-w-full" style={{fontFamily:'Proxima-Nova-Bold, sans-serif',lineHeight:'28px'}} >
              Message
            </div>
            <div style={{fontFamily:'Proxima-Nova-Regular, sans-serif',lineHeight:'28px'}} className="mt-1 text-xl leading-7 text-slate-600 max-md:max-w-full" >
              Vivamus dignissim tortor in tellus dictum pellentesque. Praesent
              mauris metus, dictum quis velit non.
            </div>
          </div>
        </div>
        <div className="shrink-0 mt-6 h-px border border-solid bg-[#061C3D] opacity-15 border-[#061C3D] max-md:max-w-full" />
        <div className="flex gap-5 mt-6 max-md:flex-wrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2516ce631cb5181b80f63a907eccf12e43d1b433cebdf14cb499c929d7ef455c?apiKey=8d68765060a54e4683a73062068958aa&"
            className="shrink-0 self-start w-10 aspect-square "
          />
          <div className="flex flex-col max-md:max-w-full">
            <div className="text-[24px] text-gray-900 text-opacity-90 max-md:max-w-full" style={{fontFamily:'Proxima-Nova-Bold, sans-serif',lineHeight:'28px'}}>
              Voice call
            </div>
            <div style={{fontFamily:'Proxima-Nova-Regular, sans-serif',lineHeight:'28px'}} className="mt-1 text-xl leading-7 text-slate-600 max-md:max-w-full">
              Vivamus dignissim tortor in tellus dictum pellentesque. Praesent
              mauris metus, dictum quis velit non.
            </div>
          </div>
        </div>
      </div>
      </div>
          
      </div>
     
      <div className=' flex flex-col md:flex-row justify-between text-white'>
          <Image src="/main.svg" alt="main" width={400} height={310} className='w-full h-[54rem]'  />
      </div>
  </div>
  </div>
  )
}

export default Feature