import { useNavigate } from "react-router-dom";
import '../../font.css';

// const Matching = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="bg-white py-16 px-6 sm:px-10">
//             <div className="max-w-6xl mx-auto text-center">
//                 <h2 className="text-sm  font-[Bembo-MT-Pro-Bold] text-gray-500 uppercase tracking-widest">
//                     Personalized Matchmaking Service
//                 </h2>
//                 <h1 className="text-4xl font-Bembo-MT-Pro-Bold mt-4 text-[#a44949]">
//                     VIP Membership
//                 </h1>

//                 <div className="mt-6 flex justify-center">
//                     <button
//                         onClick={() => navigate("/exclusive")}
//                         className="bg-[#a44949] text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-[Bembo-MT-Pro-Regular] transition-transform hover:scale-105 shadow-lg"
//                     >
//                         Start Today
//                     </button>
//                 </div>
//             </div>

//             <div className="flex flex-col lg:flex-row items-center justify-between mt-16 gap-10 max-w-6xl mx-auto">
//                 <img
//                     src="/talkpeople.jpg"
//                     alt="Relationship advisor with client"
//                     className="rounded-xl shadow-2xl w-full max-w-xl object-cover"
//                 />

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
//                     {[
//                         {
//                             icon: "/user.png",
//                             title: "Meet Your Relationship Manager",
//                             description: "Connect with our experienced advisor who manages your profile personally.",
//                         },
//                         {
//                             icon: "/chathrt.svg", // Consider replacing the second /guard.png with something unique
//                             title: "Communicate Your Preferences",
//                             description: "Consult with us to convey expectations in a prospective partner.",
//                         },
//                         {
//                             icon: "/match3.svg", // Replace with a better match icon if possible
//                             title: "Choose From Handpicked Profiles",
//                             description: "Receive exclusive profile suggestions tailored to your criteria.",
//                         },
//                     ].map((item, index) => (
//                         <div key={index} className="text-center">
//                             <div className="bg-[#a44949]   rounded-full w-20 h-20 flex justify-center items-center mx-auto shadow-md">
//                                 <img src={item.icon} alt={item.title} className="w-10 h-10 font-[Bembo-MT-Pro-Regular]" />
//                             </div>
//                             <h3 className="font-semibold text-lg mt-4">{item.title}</h3>
//                             <p className="text-gray-600 mt-2 text-sm leading-relaxed font-[Bembo-MT-Pro-Light]">
//                                 {item.description}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

import React from "react";
import { ArrowRight } from "lucide-react";

const features = [
    {
        title: "Meet Your Relationship Manager",
        description:
            "Connect with our experienced advisor who manages your profile personally",
    },
    {
        title: "Communicate Your Preferences",
        description:
            "Consult with us to convey expectations in a prospective partner.",
    },
    {
        title: "Choose From Handpicked Profiles",
        description:
            "Receive exclusive profile suggestions tailored to your criteria.",
    },
];

const Matching: React.FC = () => {
    const navigate = useNavigate();
    return (
        <section className="py-16 px-4 bg-white text-black relative">
            {/* Decorative Background (optional, see .png file for styling if needed) */}

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                VIP Membership
            </h2>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="border rounded-md p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="w-6 h-6 bg-gray-300 rounded-full mx-auto mb-4" />
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mt-10">
                <button onClick={() => navigate("/exclusive")}
                    className="bg-gradient-to-r from-[#FFFFFF] to-[#FD5C90] text-black px-6 py-2 rounded-full shadow hover:scale-105 transition-transform duration-300 font-medium flex items-center gap-2">
                    Start Today
                    <span><ArrowRight /></span>
                </button>
            </div>
        </section>
    );
};

export default Matching;
