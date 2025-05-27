import Image from 'next/image'
import React from 'react'
import '../app/font.css';


function Pre() {
  return (
    <div className='xl:p-10 p-2 space-y-10 bg-[#F2DCDC] relative overflow-hidden'>
        <img src="/Vector.png" alt='arw' className='absolute  w-[38rem] -right-4 -top-40'/>
        <div className='space-y-7'>
            <h1 className='text-[#E65555] text-2xl text-left md:text-3xl xl:text-6xl ' style={{fontFamily: 'Proxima-Nova-Bold, sans-serif'}}>The premier matrimony application </h1>
            <p className='text-[#475467] text-lg text-balance xl:text-xl text-left' style={{fontFamily: 'Proxima-Nova-Regular, sans-serif'}}>With over two decades of reliable matchmaking experience, supported by a <br /> committed Trust and Safety team at your service.
            </p>
        </div>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-10 '>
            <div className=' flex flex-col items-center gap-3 p-5 rounded-3xl bg-[#B0D7E680]'>
                <div className='bg-[#1EDC8B] rounded-full w-20 h-20 flex justify-center items-center'>
                    <Image src="/lock2.png" alt='lock2' width={40} height={40}/>

                </div>
                <h1 className='text-xl text-[#00597C]' style={{fontFamily: 'Proxima-Nova-Bold, sans-serif'}}>100% Privacy</h1>
                <p className='text-[#00739F] text-xl text-center 'style={{fontFamily: 'Proxima-Nova-Regular, sans-serif'}}>Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna.</p>
            </div>
            <div className=' flex flex-col items-center gap-3 p-5 rounded-3xl bg-[#B0D7E680]'>
                <div className='bg-[#2D95BD] rounded-full w-20 h-20 flex items-center justify-center'>
                <Image src="/guard.png" alt='guard' width={40} height={40}/>


                </div>
                <h1 className='text-xl font-extrabold text-[#00597C]' style={{fontFamily: 'Proxima-Nova-Bold, sans-serif'}}>Verified Profiles
                </h1>
                <p className='text-[#00739F] text-xl text-center' style={{fontFamily: 'Proxima-Nova-Regular, sans-serif'}}>Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna.</p>
            </div>
            <div className=' flex flex-col items-center gap-3 p-5 rounded-3xl bg-[#B0D7E680]'>
                <div className='bg-[#FFB42C] rounded-full w-20 h-20 flex justify-center items-center'>
                <Image src="/user.png" alt='user' width={40} height={40}/>


                </div>
                <h1 className='text-xl font-extrabold text-[#00597C]' style={{fontFamily: 'Proxima-Nova-Bold, sans-serif'}}>Best Matches</h1>
                <p className='text-[#00739F] text-xl text-center ' style={{fontFamily: 'Proxima-Nova-Regular, sans-serif'}}>Donec mi lorem, consequat a quam nec, pellentesque pulvinar sem. Morbi lacus magna.</p>
            </div>
        </div>

    </div>
  )
}

export default Pre