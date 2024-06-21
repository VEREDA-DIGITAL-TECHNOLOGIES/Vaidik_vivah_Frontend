import Image from 'next/image'
import React from 'react'
import '../app/font.css';

const YouTube = () => {
  return (
    <div className='relative overflow-hidden' >
       <img
        src="/curvesm.svg"
        alt="arw"
        className="absolute  w-[52rem] -right-56 top-2 z-10"
      />
    <div className='bg-[#E6F2F7]  md:px-20 md:py-24 md:space-y-14 p-8 space-y-8'>
       
        <h1 className='md:text-[60px]  text-[#007EAF]' style={{fontFamily: 'Proxima-Nova-Bold, sans-serif', lineHeight: '89.6px'}}>Introducing: A new wedlock experience
        </h1>
        <p className='text-[28px] text-[#101828E5]' style={{fontFamily: 'Proxima-Nova-Regular, sans-serif', lineHeight: '42px', letterSpacing:'2px'}}>Your search for a great relationship has never been easier with <br /> groundbreaking overhaul of the eharmony you know and trust.
        </p>
        <h4 className='xl:text-[28px] text-[#007EAF]' style={{fontFamily: 'Proxima-Nova-ExtraBold, sans-serif',letterSpacing:'3px', lineHeight: '39.2px'}}>Get a sneek peek:</h4>
        <Image src="/YT.svg" width={1224} height={665} alt='yt' className='relative left-2 z-0'/>
    </div></div>
  )
}

export default YouTube