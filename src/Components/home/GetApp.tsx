

import '../../font.css';

const GetApp = () => {
    return (
        <div className="bg-[#FD5C90] py-10 px-6 flex justify-center">
            <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row items-center max-w-6xl w-full shadow-md">

                {/* Left Content */}
                <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#FD5C90] mb-4">
                        Happiness is Just an App Away!
                    </h2>
                    <p className="text-gray-700 text-lg mb-4">
                        Find your right match with{" "}
                        <a
                            href="https://vaidik-vivah-front.vercel.app"
                            className="text-pink-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Vaidikvivah
                        </a>
                    </p>

                    {/* App Store Buttons */}
                    <div className="flex justify-center md:justify-start gap-4">
                        <img
                                                        src="/appstore.png"
                                                        alt="Apple Store"
                                                        className="object-contain h-12"
                                                    />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                            alt="Get it on Google Play"
                            className="h-12"
                        />
                    </div>
                </div>

                {/* Right Side – QR Code in Mobile Mockup */}
                <div className="flex-1 flex justify-center">
                    <img
                        src="Qrmobile.png" // Or move to public/ and use relative path
                        alt="QR Code in Phone"
                        className="max-w-xs w-full rounded-xl shadow-lg"
                    />
                </div>
            </div>
        </div>

    );
};

export default GetApp;


