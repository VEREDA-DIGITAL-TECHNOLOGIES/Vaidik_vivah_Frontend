import '../../font.css';

const GetApp = () => {
    return (
        <div className="w-full h-auto bg-[#a44949] relative">
            <div className="text-white relative overflow-hidden px-5 sm:px-20 container mx-auto space-y-6 py-5 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* Text Part */}
                    <div className="flex-1 w-full">
                        <h1 className="text-[28px] md:text-[48px] xl:text-[64px] xl:leading-[83.2px] font-[font-Bembo-MT-Pro-Bold] tracking-[-0.02em]">
                            Get the app!
                        </h1>
                        <p className="text-[20px] font-font-Bembo-MT-Pro-Light sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] pt-5 leading-[30px] sm:leading-[10px] md:leading-[24px] lg:leading-[28px] xl:leading-[42px]">
                            Download our app now to discover meaningful
                            <br className="hidden md:block" /> matches with smart AI compatibility.
                        </p>
                    </div>

                    {/* Logo Button Part */}
                    <div className="flex flex-1 w-full justify-start md:justify-end items-center space-x-4 mt-4 md:mt-0">
                        <button
                            className="p-0 m-0 flex items-center"
                            onClick={() =>
                                window.open(
                                    "https://play.google.com/store/apps/details?id=com.wedlock.wedlock_application",
                                    "_blank"
                                )
                            }
                        >
                            <img
                                src="/googleplay.png"
                                alt="Play Store"
                                className="object-contain h-24 max-md:h-auto"
                            />
                        </button>

                        <button className="p-0 m-0 flex items-center pb-1">
                            {/* Uncomment when Apple link is ready */}
                            {/* onClick={() => window.open("https://apps.apple.com/app/idXXXXXXXXX", "_blank")} */}
                            <img
                                src="/appstore.png"
                                alt="Apple Store"
                                className="object-contain h-24 max-md:h-auto"
                            />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GetApp;
