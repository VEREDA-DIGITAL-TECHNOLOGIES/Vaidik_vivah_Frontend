const Ai = () => {
  return (
    <div className="bg-[#FECEDC] py-12 px-6 flex justify-center">
      <div className="relative max-w-4xl w-full">
        {/* Skewed white background */}
        <div className="absolute top-6 left-6 w-full h-full bg-white transform -rotate-1 rounded-xl z-0"></div>

        {/* Main Card */}
        <div className="relative z-10 bg-[#FD5C90] rounded-xl px-6 py-10 flex flex-col md:flex-row items-center text-white">

          {/* Profile Image */}
          <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
            <img
              src="Ai.jpg" // Replace with /public/ URL if needed
              alt="Utkarsh Sinha"
              className="w-48 h-48 object-cover rounded-[40%_40%_0_0] shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Utkarsh Sinha</h2>
            <p className="text-white text-lg leading-relaxed mb-6">
              Lorem ipsum dolor sit amet consectetur. Metus sollicitudin massa in commodo vel sollicitudin vulputate.
              Fusce sapien donec suspendisse eget diam. Sagittis eget
            </p>

            {/* Button */}
            <button className="flex items-center gap-4 bg-pink-100 text-pink-600 font-semibold rounded-xl px-6 py-3 shadow-md hover:bg-pink-200 transition">
              <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                20
              </div>
              Recommended matches
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Ai;