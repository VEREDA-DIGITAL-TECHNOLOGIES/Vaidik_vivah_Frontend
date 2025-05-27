import React from 'react'
import Input from '../Input'
import Image from 'next/image'

const ChangePassword = () => {
  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-top  bg-[#E65555] ">
         <div className="flex items-center justify-center mb-2 md:mb-10 w-[268px] h-[90px]">
        <Image src="/logowhite.png" alt="" />
      </div>
      <div className="flex flex-col items-center justify-center mt-4 ">
        <div className="bg-white flex items-center justify-center rounded-full w-12 h-12">
            <div className="bg-[#D1FADF] rounded-full w-9 h-9 flex items-center justify-center " >
            <Image src="/confirm.png" alt="Star" className="w-[24px] h-[24px] "/>

            </div>
        
        </div>
        <div className="flex flex-col items-center justify-center text-white mt-2">
          <h1 className="text-3xl font-bold">Forgot password</h1>
          <p className="mt-4 md:text-lg text-center">
          This blog post has been published. Team members <br /> will be able to edit this post and republish changes.
          </p>
        </div>
        </div>
        <div  className="w-full max-w-md px-2  py-4 mt-4">
            <form action="">
            <Input label="Enter new password" placeholder='password' />
            <Input label="Re-enter password" placeholder='Re-enter password' />
            </form>

            <div className="flex items-center justify-center mt-8"></div>
              <button className="bg-white text-[#E65555] w-full h-10 rounded-md mt-10">
                Confirm
              </button>
              </div>
      
    </div>
  )
}

export default ChangePassword
