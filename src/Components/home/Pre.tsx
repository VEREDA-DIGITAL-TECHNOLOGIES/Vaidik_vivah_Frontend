
function Pre() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center opacity-90"
      style={{
        backgroundImage: "url('/preimage.jpg')",
      }}>

      {/* Overlay for dimming effect */}
      <div className="absolute inset-0   z-0"></div>

      {/* Center Content */}
      <div className="relative z-10 text-center text-black px-4">
        <h1 className="text-2xl md:text-4xl font-semibold mb-6">
          India’s Most Trusted Matrimony <br className="hidden md:block" />
          Website And Mobile App
        </h1>
      <div className="flex justify-center items-center">

        {/* Play Button */}
        <button title="button" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white bg-white bg-opacity-80 flex items-center justify-center shadow-lg hover:scale-105 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
      </div>
    </div>

  );
}

export default Pre;
