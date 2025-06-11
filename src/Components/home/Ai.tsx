const Ai = () => {
  return (
    <div className="w-full text-[#a44949] overflow-hidden py-12 md:py-20">
      <div className="relative overflow-hidden px-5 sm:px-10 lg:px-20 container mx-auto">
        <div className="relative space-y-12 md:space-y-20 bg-white">
          

          {/* Testimonial Card */}
          <div className="relative flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl w-full max-w-6xl p-6 md:p-8 lg:p-10 relative overflow-hidden">
              {/* Recommended Badge */}
              {/* <div className="absolute -top-6 right-4 md:-top-8 md:right-8 w-28 md:w-40 lg:w-48 z-10">
                <img
                  src="/recomended.png"
                  alt="Recommended"
                  className="w-full h-auto drop-shadow-lg"
                />
              </div> */}

              {/* Content */}
              <div className="flex flex-col lg:flex-row gap-[90px] md:gap-[120px] items-center">
                {/* Image Section */}
                <div className="w-full lg:w-1/2">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/5] shadow-2xl">
                    <img
                      src="/aadityneha.jpeg"
                      alt="Aaditya & Sneha Sharma"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold italic">
                      "Aaditya & Sneha Sharma"
                    </h2>
                    <p className="text-lg md:text-xl leading-relaxed">
                      We met on Vaidik Vivah and felt an instant connection rooted in shared values and Sanatan dharma. Today, we are not just husband and wife, but soul companions on a spiritual journey.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-yellow-300 text-xl">⭐</span>
                      <span className="text-lg">Married in: March 2025</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-200 text-xl">📍</span>
                      <span className="text-lg">From: Gaya, Bihar</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-orange-200 text-xl">🛕</span>
                      <span className="text-lg">Common Bond: Both initiated in Gayatri Parivar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Header Section */}
          <div className="text-center md:text-center space-y-6 w-full mx-auto md:mx-0">
            <h1 className="font-Bembo-MT-Pro-Bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Smarter connections with{" "}
              <span className="block md:inline">AI-Powered match suggestions</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed opacity-90 font-Bembo-MT-Pro-Regular">
              Match recommendations to suit your preferences and interests. Our AI-powered algorithm ensures you connect with the right people.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;