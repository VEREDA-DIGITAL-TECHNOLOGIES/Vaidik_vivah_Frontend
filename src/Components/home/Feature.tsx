const Feature = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#FECEDC] to-[#FD5C90] text-white py-10 md:py-20">
      <div className="container mx-auto px-5 sm:px-10 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Column: Text */}
          <div className="w-full lg:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-[28px] font-[Bembo-MT-Pro-Bold] md:text-[48px] xl:text-[64px] font-bold leading-tight tracking-tight">
              Introducing
              <br className="hidden xl:block" />
              <span className="text-white">Vaidik Vivah Meet!</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-lg font-[Bembo-MT-Pro-Regular]">
            Where ancient Vedic wisdom meets today’s technology — find your true match with Vaidik Vivah.
            </p>
            <ChatCard/>
           
          </div>

          {/* Right Column: Image */}
          <div className="w-full lg:w-1/2  flex items-center justify-center animate-fade-in">
            <img
              src="/vaidikimage5.png"
              alt="Main visual"
              className=" h-[650px] object-contain drop-shadow-xl rounded-[40px]"
            />

          </div>

        </div>
      </div>
    </section>
  );
};

export default Feature;


const ChatCard: React.FC = () => {
  return (
    <div className="max-w-sm mx-auto rounded-xl bg-[#FFFFFF] border border-pink-200 p-4 shadow-md">
      <div className="flex items-center mb-4">
        <img
          src="chatimage.jpg"
          alt="Anjli"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <p className="text-sm font-semibold">Chat with ANJLI</p>
          <p className="text-pink-500 text-xs">Online</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-pink-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4.5l5 5v-13l-5 5z" />
          </svg>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 3a1.5 1.5 0 0 1 1.5 1.5V12a1.5 1.5 0 0 1-3 0V6.5A1.5 1.5 0 0 1 12 5zm0 10a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        <div className="bg-pink-500 text-white p-2 px-3 rounded-xl w-fit text-sm">
          Hey! How’s your day going?
        </div>
        <div className="bg-gray-200 text-gray-800 p-2 px-3 rounded-xl w-fit text-sm ml-auto">
          Pretty good Just relaxing Yours?
        </div>
      </div>
    </div>
  );
};

