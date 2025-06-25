import { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        image: "/aadityneha.jpeg",
        name: "Aaditya & Sneha Sharma",
        date: "March 2025",
        location: "Gaya, Bihar",
        bond: "Both initiated in Gayatri Parivar",
        description:
            "We met on Vaidik Vivah and felt an instant connection rooted in shared values and Sanatan dharma. Today, we are not just husband and wife, but soul companions on a spiritual journey.",
    },
    {
        id: 2,
        image: "/weddingimg2.jpg",
        name: "Aakash & Anjali",
        date: "April 2025",
        location: "Patna, Bihar",
        bond: "Both initiated in Gayatri Parivar",
        description:
            "We met on Vaidik Vivah and felt an instant connection rooted in shared values and Sanatan dharma. Today, we are not just husband and wife, but soul companions on a spiritual journey.",
    },
    {
        id: 3,
        image: "/weddingimg3.jpeg",
        name: "Rohit & Meera Singh",
        date: "May 2025",
        location: "Varanasi, UP",
        bond: "Both initiated in Gayatri Parivar",
        description:
            "We met on Vaidik Vivah and felt an instant connection rooted in shared values and Sanatan dharma. Today, we are not just husband and wife, but soul companions on a spiritual journey.",
    },
];

export default function WeddingSlider() {
    const [current, setCurrent] = useState(0);

    // const prevSlide = () => {
    //     setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    // };

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#FD5C90] py-12 text-center">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
                Be inspired by Real Weddings
            </h2>

            <div className="relative bg-white max-w-xl mx-auto rounded-2xl shadow-xl p-4 md:p-6">
                {/* Image on top */}
                <img
                    src={slides[current].image}
                    alt={slides[current].name}
                    className="w-full h-[300px] object-cover object-top  rounded-xl"
                />

                {/* Text content below */}
                <div className="text-left mt-4 space-y-3 px-2 md:px-4">
                    <h3 className="text-xl font-bold text-gray-800">
                        {slides[current].name}
                    </h3>
                    <p className="text-gray-600 text-sm">{slides[current].description}</p>
                    <div className="text-gray-700 text-sm space-y-1">
                        <p>⭐ Married in: {slides[current].date}</p>
                        <p>📍 From: {slides[current].location}</p>
                        <p>⛩ Common Bond: {slides[current].bond}</p>
                    </div>
                </div>

                {/* Arrows */}
                {/* <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                    <ChevronLeft className="text-pink-600" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                    <ChevronRight className="text-pink-600" />
                </button> */}

                {/* Pagination Dots */}
                <div className="mt-6 flex justify-center gap-2">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full ${index === current ? "bg-pink-500" : "bg-pink-200"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
