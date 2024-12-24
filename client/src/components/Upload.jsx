/* eslint-disable react/prop-types */
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { ModernLoader } from "./ModernLoader";

const token = localStorage.getItem("accessToken");

function UploadUI({ setVisibleUpload }) {
  const [uploadType, setUploadType] = useState("post");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      console.error("No image selected");
      return;
    }

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append("caption", caption);

    // If image is a File object, append directly
    if (image instanceof File) {
      formData.append("file", image);
    }
    // If image is from an input element
    else if (e.target.querySelector('input[type="file"]')?.files[0]) {
      formData.append(
        "file",
        e.target.querySelector('input[type="file"]').files[0]
      );
    }
    // If image is a base64 string, convert to file
    else if (typeof image === "string" && image.startsWith("data:image")) {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      formData.append("file", file);
    }

    try {
      setIsLoading(true);

      const uploadReq = await fetch("http://localhost:5000/upload/post", {
        method: "POST",
        headers: {
          // Don't set Content-Type - let browser set it with boundary for FormData
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!uploadReq.ok) {
        const errorText = await uploadReq.text();
        throw new Error(errorText);
      }

      const res = await uploadReq.json();
      console.log("Upload successful:", res);

      // Clear form after successful upload
      setCaption("");
      setImage(null);

      setIsLoading(false);
      setVisibleUpload(false);

      // You might want to add success feedback here
      // For example: setSuccessMessage("Post uploaded successfully!");

      return res;
    } catch (err) {
      console.error("Error uploading:", err.message);
      // You might want to add error feedback here
      // For example: setErrorMessage(err.message);
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div
        className="w-full h-screen flex items-center justify-center fixed top-0 right-0"
        style={{ backgroundColor: "rgba(62, 62, 62, 0.5)" }}
      >
        <div className="bg-white rounded-lg">
          <ModernLoader />
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-screen flex items-center justify-center z-20 fixed top-0 right-0"
      style={{ backgroundColor: "rgba(62, 62, 62, 0.5)" }}
    >
      <X
        onClick={() => {
          setVisibleUpload(false);
        }}
        className="fixed top-4 right-4 text-white cursor-pointer"
      />
      <div className="py-6 px-20 fixed bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Upload Post or Story
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-4 mb-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="uploadType"
                value="post"
                checked={uploadType === "post"}
                onChange={() => setUploadType("post")}
              />
              <span className="ml-2">Post</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="uploadType"
                value="story"
                checked={uploadType === "story"}
                onChange={() => setUploadType("story")}
              />
              <span className="ml-2">Story</span>
            </label>
          </div>

          <div className="mb-6">
            <label htmlFor="image-upload" className="block mb-2">
              Upload Image
            </label>
            <div className="relative ">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
              >
                {image ? (
                  <div className="relative w-full h-full">
                    <img
                      src={image}
                      alt="Uploaded"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      Click to upload image
                    </span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {uploadType === "post" && (
            <div className="mb-6">
              <label htmlFor="caption" className="block mb-2">
                Caption
              </label>
              <textarea
                id="caption"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Upload {uploadType === "post" ? "Post" : "Story"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadUI;
