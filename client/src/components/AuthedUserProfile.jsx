import { useRef, useState } from "react";
import { useGetUsersPost } from "../hooks/useGetUserPosts";
import { Camera, Plus, Settings } from "lucide-react";
import SavedPostContainer from "./SavedPostContainer";
import AuthedUserPostsContainer from "./AuthedUserPostContainer";

const token = localStorage.getItem("accessToken");

/* eslint-disable react/prop-types */
export default function AuthedUserProfilePage({
  authUser,
  selectButton,
  setSelectButton,
  derivedPost,
  setDerivedPost,
  setDoComment,
  setExtend,
  extend,
  setFollowPopup,
  setFollowArray,
}) {
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(null);
  const [profilePic, setProfilePic] = useState(authUser.profilePic);
  const fileInputRef = useRef(null);

  const posts = useGetUsersPost(authUser._id, token);

  const handleSubmit = async (image, e) => {
    if (!image) {
      console.error("No image selected");
      return;
    }

    // Create FormData object to handle file upload
    const formData = new FormData();

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
      const uploadReq = await fetch("http://localhost:5000/upload/avatar", {
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
      setProfilePic(res.url);
      setImage(null);

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

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        handleSubmit(file); // Upload immediately after file is selected
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
        />
        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full relative object-fill group overflow-hidden bg-gray-200 flex items-center cursor-pointer justify-center">
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            className="hidden w-full h-full justify-center items-center group-hover:flex absolute"
          >
            <Camera className="w-8 text-white h-8" />
          </div>

          {profilePic ===
          "https://superst.ac/_next/image?url=%2FIMG_8692.PNG&w=128&q=75" ? (
            <Camera
              onClick={() => fileInputRef.current?.click()} // Trigger file input click
              className="w-8 h-8 cursor-pointer text-gray-400"
            />
          ) : (
            <img
              onClick={() => fileInputRef.current?.click()}
              src={profilePic}
              alt="profile-pic"
            />
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h1 className="text-xl">{authUser.userName}</h1>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-gray-100 rounded-md text-sm font-medium">
                Edit Profile
              </button>
              <button className="px-4 py-1.5 bg-gray-100 rounded-md text-sm font-medium">
                View archive
              </button>
              <button className="p-1.5 bg-gray-100 rounded-md">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-4">
            <div>
              <span className="font-semibold">{posts?.posts?.length || 0}</span>{" "}
              posts
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setFollowArray(authUser?.followers || []);
                setFollowPopup(true);
              }}
            >
              <span className="font-semibold">{authUser.followers.length}</span>{" "}
              followers
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setFollowArray(authUser?.following || []);
                setFollowPopup(true);
              }}
            >
              <span className="font-semibold">{authUser.following.length}</span>{" "}
              following
            </div>
          </div>

          {/* Bio */}
          <div>
            <h2 className="font-semibold">{authUser.name}</h2>
            <a
              href="https://github.com/Pratiyankkumar"
              className="text-blue-600 hover:underline"
            >
              https://github.com/Pratiyankkumar
            </a>
          </div>
        </div>
      </div>

      {/* New Post Button */}
      <div className="mb-8">
        <button className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-gray-50 hover:bg-gray-100">
          <Plus className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-600">New</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-t">
        <div className="flex justify-center gap-12">
          <button
            onClick={() => setSelectButton("posts")}
            className={`px-4 py-3 text-sm text-gray-500 ${
              selectButton === "posts"
                ? "font-semibold text-black border-t border-black"
                : ""
            } -mt-px`}
          >
            POSTS
          </button>
          <button
            onClick={() => setSelectButton("saved")}
            className={`px-4 py-3 text-sm ${
              selectButton === "saved"
                ? "font-semibold text-black border-t border-black"
                : ""
            } text-gray-500 hover:text-black`}
          >
            SAVED
          </button>
        </div>
      </div>

      {/* Empty State */}
      {selectButton === "posts" && (
        <AuthedUserPostsContainer
          derivedPost={derivedPost}
          setDerivedPost={setDerivedPost}
          setDoComment={setDoComment}
          posts={posts}
          authUser={authUser}
          setExtend={setExtend}
          extend={extend}
        />
      )}
      {selectButton === "saved" && (
        <SavedPostContainer
          derivedPost={derivedPost}
          setDerivedPost={setDerivedPost}
          setDoComment={setDoComment}
          authUser={authUser}
          setExtend={setExtend}
          extend={extend}
        />
      )}
    </div>
  );
}
