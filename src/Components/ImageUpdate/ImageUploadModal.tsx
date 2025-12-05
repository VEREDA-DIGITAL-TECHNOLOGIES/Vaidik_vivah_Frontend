import { X, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useUpdatePhotoUploadMutation } from "../../Redux/Api/profile.api";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  oldImages: string[];
}

export default function ImageUploadModal({ open, onClose, onSuccess, oldImages }: Props) {
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [previewNew, setPreviewNew] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(oldImages);
  const [errors, setErrors] = useState<string>("");
  
  const MAX_IMAGES = 3;

  const [uploadPhoto, { isLoading }] = useUpdatePhotoUploadMutation();

  useEffect(() => {
    if (open) {
      setExistingImages(oldImages);
      setSelectedImages(null);
      setPreviewNew([]);
      setErrors("");
    }
  }, [open, oldImages]);

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // Calculate total images after adding new ones
    const totalAfterAdding = existingImages.length + files.length;
    
    if (totalAfterAdding > MAX_IMAGES) {
      setErrors(`You can only upload maximum ${MAX_IMAGES} images. You already have ${existingImages.length} images.`);
      e.target.value = ""; // Clear the input
      return;
    }
    
    setErrors("");
    setSelectedImages(files);
    
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewNew(previews);
  };

  const removeOldImage = (imgUrl: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== imgUrl));
  };

  const removeNewImage = (index: number) => {
    setPreviewNew((prev) => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]); // Clean up memory
      newPreviews.splice(index, 1);
      return newPreviews;
    });
    
    if (selectedImages) {
      const dt = new DataTransfer();
      Array.from(selectedImages).forEach((file, i) => {
        if (i !== index) {
          dt.items.add(file);
        }
      });
      setSelectedImages(dt.files);
    }
  };

  const handleUpload = async () => {
    // Validate total images count
    const totalImages = existingImages.length + previewNew.length;
    
    if (totalImages === 0) {
      toast.error("Please add at least one image");
      return;
    }
    
    if (totalImages > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }
    
    const formData = new FormData();

    // Attach Remaining Old Images
    existingImages.forEach((img) => {
      formData.append("oldImages", img);
    });

    // Attach New Images
    if (selectedImages) {
      Array.from(selectedImages).forEach((file) => {
        formData.append("profileImage", file);
      });
    }
    
    console.log("Uploading images:", {
      old: existingImages.length,
      new: selectedImages?.length || 0
    });

    try {
      const res: any = await uploadPhoto(formData);

      if (res.data?.success) {
        toast.success("Images updated successfully!");
        onClose();
        onSuccess?.();
      } else {
        toast.error(res.data?.message || "Upload failed");
      }
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white shadow-xl w-full max-w-md p-6 rounded-2xl relative">

        <button 
          className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">Update Profile Photos</h2>

        {/* Image Count Indicator */}
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-600">
            Images: {existingImages.length + previewNew.length}/{MAX_IMAGES}
          </p>
          {errors && (
            <p className="text-sm text-red-500 mt-1">{errors}</p>
          )}
        </div>

        {/* Upload */}
        <label className="border-2 border-dashed border-pink-300 p-6 rounded-xl block cursor-pointer hover:border-pink-400 transition-colors">
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden" 
          />
          <p className="text-gray-600 font-medium text-center">
            Drag & Drop or <span className="text-pink-500 font-bold">Browse</span>
          </p>
          <p className="text-xs text-gray-500 text-center mt-2">
            Maximum {MAX_IMAGES} images total
          </p>
        </label>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Existing Photos</p>
            <div className="grid grid-cols-3 gap-3">
              {existingImages.map((img, i) => (
                <div key={`old-${i}`} className="relative group">
                  <img 
                    src={img} 
                    alt={`Existing ${i + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeOldImage(img)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Images */}
        {previewNew.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">New Photos</p>
            <div className="grid grid-cols-3 gap-3">
              {previewNew.map((img, i) => (
                <div key={`new-${i}`} className="relative group">
                  <img 
                    src={img} 
                    alt={`New ${i + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeNewImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={isLoading || (existingImages.length + previewNew.length === 0)}
          className={`w-full mt-6 py-3 rounded-xl transition-colors ${
            isLoading || (existingImages.length + previewNew.length === 0)
              ? "bg-pink-300 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600"
          } text-white`}
        >
          {isLoading ? "Uploading..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}