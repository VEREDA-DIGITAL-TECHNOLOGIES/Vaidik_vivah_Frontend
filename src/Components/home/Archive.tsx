import React from "react";

const features = [
  {
    title: "100% Screened Profile",
    description:
      "Search by location, community, Profession & more from lakhs of active profile",
  },
  {
    title: "100% Screened Profile",
    description:
      "Search by location, community, Profession & more from lakhs of active profile",
  },
  {
    title: "100% Screened Profile",
    description:
      "Search by location, community, Profession & more from lakhs of active profile",
  },
];

const Archive: React.FC = () => {
  return (
    <div className="relative w-full text-white bg-gradient-to-t  py-16 px-4">
      <div className="relative z-10 flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex-1 text-center px-4 border-r border-white last:border-none"
          >
            <div className="mx-auto w-6 h-6 rounded-full bg-white mb-4" />
            <h3 className="font-bold text-lg md:text-xl">{feature.title}</h3>
            <p className="text-sm mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;






// import '../../font.css';
// import { ShieldCheck, Lock, Users } from 'lucide-react';
// const Archive = () => {
//   return (
//     <div>
      
//       <section className="px-6 py-12  text-center">
       
//         {/* <h2 className="text-3xl font-[Bembo-MT-Pro-Bold] mb-10 text-[white]">
//           Bringing People <span className="">Together</span>
//         </h2> */}

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
//           {/* Feature 1 */}
//           <div className="flex flex-col items-center p-4 space-y-8 space-x-3 bg-white rounded-lg ">
//             <Users className="w-10 h-10 text-[#a44949]" />
//             <h3 className="text-lg font-[Bembo-MT-Pro-Bold]">100% Screened Profiles</h3>
//             <div className="w-10 h-1 bg-[#782626] rounded-full"></div>
//             <p className="text-gray-600 text-sm max-w-xs font-[Bembo-MT-Pro-Light]">
//               Search by location, community, profession & more from lakhs of active profiles
//             </p>
//           </div>

//           {/* Feature 2 */}
//           <div className="flex flex-col items-center p-4 space-y-8 space-x-3 bg-white rounded-lg">
//             <ShieldCheck className="w-10 h-10 text-[#a44949]" />
//             <h3 className="text-lg font-[Bembo-MT-Pro-Regular]">Verifications by Personal Visit</h3>
//             <div className="w-10 h-1 bg-[#a44949] rounded-full"></div>
//             <p className="text-gray-600 text-sm max-w-xs font-[Bembo-MT-Pro-Light]">
//               Special listing for profiles verified by our agents through personal visits
//             </p>
//           </div>

//           {/* Feature 3 */}
//           <div className="flex flex-col items-center p-4 space-y-8 space-x-3 bg-white rounded-lg">
//             <Lock className="w-10 h-10 text-[#a44949]" />
//             <h3 className="text-lg font-[Bembo-MT-Pro-Bold]">Control over Privacy</h3>
//             <div className="w-10 h-1 bg-[#a44949] rounded-full"></div>
//             <p className="text-gray-600 text-sm max-w-xs font-[Bembo-MT-Pro-Light]">
//               Restrict unwanted access to contact details & photos/videos
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Archive;
