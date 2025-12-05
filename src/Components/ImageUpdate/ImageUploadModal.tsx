
import { X } from "lucide-react";
import { useState } from "react";
import { useUpdatePhotoUploadMutation } from "../../Redux/Api/profile.api";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ImageUploadModal({ open, onClose, onSuccess }: Props) {
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [uploadPhoto, { isLoading }] = useUpdatePhotoUploadMutation();

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImages(e.target.files);
  };

  const handleUpload = async () => {
    if (!selectedImages) return alert("Please select an image.");

    const formData = new FormData();
    Array.from(selectedImages).forEach((file) => {
      formData.append("profileImage", file);
    });

    const res = await uploadPhoto(formData);

    if (res.data?.success) {
      toast.success("Image updated!");
      onClose();
      setSelectedImages(null);
      onSuccess?.();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
  <div className="bg-white shadow-xl w-full max-w-md p-6 rounded-2xl relative animate-slideUp">

    {/* Close */}
    <button 
      className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
      onClick={onClose}
    >
      <X size={18} />
    </button>

    {/* Title */}
    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
      Update Profile Photos
    </h2>

    {/* Upload Box */}
    <label className="border-2 border-dashed border-pink-300 hover:border-pink-400 bg-pink-50/50 hover:bg-pink-100/60 text-center p-8 rounded-xl cursor-pointer transition block">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-col items-center space-y-3">
        <svg
          className="w-12 h-12 text-pink-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M3 8.25h18M7.5 3h9"
          />
        </svg>

        <p className="text-gray-600 font-medium">
          Drag & Drop or <span className="text-pink-500 font-semibold">Browse</span>
        </p>
        <p className="text-xs text-gray-400">Upload up to 3 images</p>
      </div>
    </label>

    {/* Selected Image Preview */}
    {selectedImages && (
      <div className="mt-4 grid grid-cols-3 gap-3">
        {Array.from(selectedImages).map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            className="w-full h-24 object-cover rounded-lg shadow-sm"
          />
        ))}
      </div>
    )}

    {/* Upload Button */}
    <button
      onClick={handleUpload}
      disabled={isLoading}
      className="w-full mt-6 py-3 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 active:bg-pink-700 transition disabled:bg-pink-300"
    >
      {isLoading ? "Uploading..." : "Upload Photos"}
    </button>
  </div>
</div>

  );
}
