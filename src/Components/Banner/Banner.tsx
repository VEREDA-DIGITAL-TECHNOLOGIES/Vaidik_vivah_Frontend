// import { useEffect, useState } from "react";

// interface BannerResponse {
//     success: boolean;
//     photos: string[];
//     photoCount: number;
// }

// export default function BannerPage() {
//     const [banners, setBanners] = useState<string[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [current, setCurrent] = useState(0);

//     useEffect(() => {
//         const fetchBanners = async () => {
//             try {
//                 const res = await fetch(
//                     "https://api.vedvivah.com/api/admin/banner/getBanner"
//                 );
//                 if (!res.ok) throw new Error("Failed to fetch banners");

//                 const data: BannerResponse = await res.json();
//                 if (data.success) {
//                     setBanners(data.photos);
//                 } else {
//                     throw new Error("No banners found");
//                 }
//             } catch (err: any) {
//                 setError(err.message || "Something went wrong");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBanners();
//     }, []);

//     useEffect(() => {
//         if (banners.length > 1) {
//             const interval = setInterval(() => {
//                 setCurrent((prev) => (prev + 1) % banners.length);
//             }, 4000);
//             return () => clearInterval(interval);
//         }
//     }, [banners]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen text-lg font-semibold">
//                 Loading banners...
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center h-screen text-red-600 font-semibold">
//                 {error}
//             </div>
//         );
//     }

//     return (
//         <div className="w-full">
//             <div className="bg-[#f7b2c8] w-full flex justify-center">
//                 {banners.length === 0 ? (
//                     <p className="text-center text-gray-600 py-10">
//                         No banners available.
//                     </p>
//                 ) : (
//                     <div
//                         className="
//                             relative w-full 
//                             h-[120px] sm:h-[150px] md:h-[160px] lg:h-[170px]
//                             overflow-hidden rounded-lg shadow-md
//                         "
//                     >
//                         {/* IMAGES */}
//                         {banners.map((photo, idx) => (
//                             <img
//                                 key={idx}
//                                 src={photo}
//                                 alt={`Banner ${idx + 1}`}
//                                 className={`
//                                     absolute top-0 left-0 
//                                     w-full h-full
//                                     object-cover
//                                     transition-opacity duration-[800ms]
//                                     ${idx === current ? "opacity-100" : "opacity-0"}
//                                 `}
//                             />
//                         ))}

//                         {/* DOTS */}
//                         <div className="absolute bottom-3 w-full flex justify-center space-x-2">
//                             {banners.map((_, idx) => (
//                                 <button
//                                     key={idx}
//                                     onClick={() => setCurrent(idx)}
//                                     className={`
//                                         w-2.5 h-2.5 rounded-full 
//                                         transition-all
//                                         ${idx === current ? "bg-[#FD5C90] scale-110" : "bg-white/50"}
//                                     `}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }




export default function BannerPage() {
  return <></>; // empty fragment → banner invisible
}