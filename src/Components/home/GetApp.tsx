// import { FaApple, FaGooglePlay } from "react-icons/fa";
// import './getapp.css';
import '../../font.css';

const GetApp = () => {
    return (


        <div
            className="w-100 h-auto  bg-[#007EAF] relative ">

            <div className=" text-white  relative overflow-hidden px-5 sm:px-20  container m-auto space-y-6   py-5 md:py-12">
                <div className="flex flex-col  md:flex-row justify-between lg:justify-between flex-wrap">
                    <div
                        className="bg-container flex items-center lg:items-start  flex-col lg:flex-row xl:justify-between w-full    space-y-5 ">
                        <div className="">
                            <div className="get_app ">

                                <h1 className="text-[28px] md:text-[48px] xl:text-[64px]  xl:leading-[83.2px] font-[Proxima-Nova-Bold] tracking-[-0.02em] ">
                                    Get the app!
                                </h1>

                                <p className=" text-[20px]  font-Proxima-Nova-Light sm:text-[16px] md:text-[20px] lg:text-[24px]     xl:text-[28px] pt-[21px] leading-[30px] sm:leading-[10px] md:leading-[24px] lg:leading-[28px] xl:leading-[42px] md:text-start mr-1">
                                    Download our app now to discover meaningful  <br className='hidden md:block' /> matches  with smart AI   compatibility.
                                </p>
                            </div>
                            <div className="flex flex-row  lg:space-x-5 space-y-1 sm:space-y-0 gap-2 mt-4 lg:mt-16">
                                <button
                                    className="p-0 m-0 flex items-center"
                                    onClick={() => window.open("https://play.google.com/store/apps/details?id=com.wedlock.wedlock_application", "_blank")}
                                >
                                    <img
                                        src="/googleplay.png"
                                        alt="Play Store"
                                        className="object-contain h-24 max-md:h-auto"
                                    />
                                </button>

                                <button
                                    className="p-0 m-0 flex items-center pb-1"
                                    // onClick={() => window.open("https://apps.apple.com/app/idXXXXXXXXX", "_blank")} 
                                >
                                    <img
                                        src="/appstore.png"
                                        alt="Apple Store"
                                        className="object-contain h-24 max-md:h-auto"
                                    />
                                </button>
                            </div>

                        </div>
                        <div className="relative flex justify-center lg:justify-end w-full md:w-1/2">
                            <div className="mt-8 md:mt-0 relative flex justify-center lg:justify-end w-full lg:w-1/2">
                                <div className="  w-[100%] h-[100%  ] p-0 m-0">
                                    <img src="/qr.svg" alt="QR code"
                                        className="absolute w-[80%]  sm:w-[90%] p-0 h-[100%] m-0 sm:right-10 xl:right-32 z-20" />
                                    <img src="/ph.svg" alt="Phone"
                                        className="w-[80%] sm:w-[20rem]  p-0 h-[100%] m-0 relative  left-14 sm:left-4" />
                                </div>
                            </div>


                        </div>
                    </div>
                    <div
                        className="absolute hidden lg:block top-0 right-0 bg-[url('/topcircle.png')] bg-cover bg-center h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] w-20 sm:w-40 md:w-60 lg:w-96 ">
                        {/* <Image src="/topcircle.png" alt=""  width={500} height={500}/> */}
                    </div>

                </div>

            </div>

        </div>


    );
};

export default GetApp;
