const Feature = () => {
  return (
    <section className="w-full bg-[#a44949] text-white py-10 md:py-20">
      <div className="container mx-auto px-5 sm:px-10 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Column: Text */}
          <div className="w-full lg:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-[28px] font-Bembo-MT-Pro-Bold md:text-[48px] xl:text-[64px] font-bold leading-tight tracking-tight">
              Introducing
              <br className="hidden xl:block" />
              <span className="text-white">Vaidik Vivah Meet!</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-lg font-Bembo-MT-Pro-Regular">
            Where ancient Vedic wisdom meets today’s technology — find your true match with Vaidik Vivah.
            </p>
           
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
