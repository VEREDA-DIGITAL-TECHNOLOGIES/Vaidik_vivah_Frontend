import { useEffect, useState } from "react";

interface BannerResponse {
    success: boolean;
    photos: string[];
    photoCount: number;
}

export default function BannerPage() {
    const [banners, setBanners] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await fetch(
                    "https://api.vedvivah.com/api/admin/banner/getBanner"
                );
                if (!res.ok) throw new Error("Failed to fetch banners");

                const data: BannerResponse = await res.json();
                if (data.success) {
                    setBanners(data.photos);
                } else {
                    throw new Error("No banners found");
                }
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    // Auto-rotate banners every 4 seconds
    useEffect(() => {
        if (banners.length > 1) {
            const interval = setInterval(() => {
                setCurrent((prev) => (prev + 1) % banners.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [banners]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-lg font-semibold">
                Loading banners...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-600 font-semibold">
                {error}
            </div>
        );
    }

    return (
        <div className="w-full">
            

            {/* Banner Section */}
            <div className="pt-0"> {/* padding to avoid navbar overlap */}
                {banners.length === 0 ? (
                    <p className="text-center text-gray-600 py-10">No banners available.</p>
                ) : (
                    <div className="relative w-full h-[100px] overflow-hidden">
                        {/* Rotating carousel */}
                        {banners.map((photo, idx) => (
                            <img
                                key={idx}
                                src={photo}
                                alt={`Banner ${idx + 1}`}
                                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === current ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        ))}

                        {/* Dots Indicator */}
                        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
                            {banners.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`w-3 h-3 rounded-full ${idx === current ? "bg-blue-600" : "bg-gray-400"
                                        }`}
                                    onClick={() => setCurrent(idx)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
