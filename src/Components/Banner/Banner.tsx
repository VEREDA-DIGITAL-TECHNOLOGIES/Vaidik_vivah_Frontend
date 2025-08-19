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

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await fetch("https://api.vedvivah.com/api/admin/banner/getBanner");
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
        <div className="p-6">
            {/* <h1 className="text-2xl font-bold mb-4">Banner Images</h1> */}

            {banners.length === 0 ? (
                <p className="text-gray-600">No banners available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {banners.map((photo, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
                        >
                            <img
                                src={photo}
                                alt={`Banner ${idx + 1}`}
                                className="w-full h-56 object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
