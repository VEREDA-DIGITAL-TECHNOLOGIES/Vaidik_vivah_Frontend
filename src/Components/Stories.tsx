import React, { useState } from 'react';
import { IoArrowForward, IoArrowBack } from 'react-icons/io5';
import '../app/font.css';


const Stories = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const stories = [
    { src: '/story.svg', index: 0 },
    { src: '/story.svg', index: 1 },
    { src: '/story.svg', index: 2 },

  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === stories.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? stories.length - 1 : prevSlide - 1));
  };
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="md:space-y-16 md:px-20 md:py-20 space-y-5 p-8  overflow-hidden bg-[#007EAF] text-white relative">
       <img
        src="/curvewhite.svg"
        alt="arw"
        className="absolute  w-[42rem] rotate-12 -right-10 -top-40 z-10"
      />
      <div className="md:space-y-10 space-y-5">
        <div className="flex items-center justify-between pr-20">
          <h1 className="md:text-6xl text-3xl " style={{ fontFamily: 'Proxima-Nova-Bold, sans-serif', lineHeight: '89.5px' }}>Happy Stories</h1>
          <div className="flex items-center gap-4 z-10">
            <IoArrowBack className="md:w-10 md:h-10 hover:bg-[#009BDA] rounded-full cursor-pointer" onClick={prevSlide} />
            <IoArrowForward className="md:w-10 md:h-10 hover:bg-[#009BDA] rounded-full cursor-pointer" onClick={nextSlide} />
          </div>
        </div>
        <p className="md:text-2xl text-xl w-[50rem]" style={{ fontFamily: 'Proxima-Nova-Regular, sans-serif',letterSpacing: '2%', lineHeight: '42px' }}>
          Dive into stories of unexpected friendships, love that blossoms in the most extraordinary places, and dreams that come true against all odds.
        </p>
      </div>
      <div className="md:flex items-center justify-between gap-10 mt-8">
        {stories.map((story, index) => (
          <div key={index} className={`relative ${index == currentSlide ? 'block' : ''}`}>
            <img src={story.src} alt={`Story ${story.index}`} className="rounded-3xl w-[25rem] h-[30rem] object-cover z-2" />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5 gap-1">
        {stories.map((story, index) => (
          <div
            key={index}
            className={`w-4 h-2 rounded-xl cursor-pointer ${index === currentSlide ? 'bg-white w-8' : 'bg-[#00587b] '}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
