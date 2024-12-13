/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatTimeDiff } from "../utils/formatTimeDiff";
import useGetUser from "../hooks/GetUser";
import { useLike } from "../hooks/useLike";

const token = localStorage.getItem("accessToken");

function Post({
  caption,
  createdAt,
  likes = [],
  post,
  userId,
  postId,
  setDoComment,
  setDerivedPost,
  comments,
}) {
  const { id } = useParams();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showOverlayHeart, setShowOverlayHeart] = useState(false);
  const [save, setSave] = useState(false);

  const postUser = useGetUser(userId, token);

  const { liked, likesCount, handleLikeAction } = useLike(token, postId, likes);

  async function handleLike() {
    console.log(likes);

    await handleLikeAction();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  }

  async function handleDoubleClick() {
    if (!liked) {
      await handleLikeAction();
    }

    setShowOverlayHeart(true);
    setTimeout(() => setShowOverlayHeart(false), 2000);
  }

  useEffect(() => {
    async function checkSavedPost() {
      try {
        const req = await fetch(`http://localhost:5000/user/saved/${postId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Silent handling of 404 cases
        if (req.status === 404) {
          setSave(false);
          return;
        }

        // Handle other potential error status codes
        if (!req.ok) {
          return;
        }

        const res = await req.json();
        setSave(res.message === true);
      } catch (error) {
        // Silently handle any network errors
        setSave(false);
      }
    }

    checkSavedPost();
  }, [postId]);

  async function handleSave() {
    try {
      const endpoint = save
        ? `http://localhost:5000/user/unsave/${postId}`
        : `http://localhost:5000/user/save/${postId}`;

      const req = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!req.ok) {
        console.log("Failed to save/unsave post");
        return;
      }

      // Toggle the save state after successful request
      setSave((prevSave) => !prevSave);
    } catch (error) {
      // Handle any network errors silently
      console.log("Error saving/unsaving post");
    }
  }

  return (
    <div className="mx-auto max-w-xl p-4">
      <div className="rounded-md border">
        {/* Post Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full overflow-hidden">
              {postUser.profilePic === "" ? (
                <img
                  src="https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg"
                  alt="User Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={postUser.profilePic}
                  alt="User Avatar"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="flex items-center gap-1">
              <Link to={`profile/${userId}`} className="text-sm font-medium">
                {postUser.userName}
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
                className="h-4 w-4 mt-1"
              >
                <polygon
                  fill="#42a5f5"
                  points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
                ></polygon>
                <polygon
                  fill="#fff"
                  points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
                ></polygon>
              </svg>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-gray-500">
                {formatTimeDiff(createdAt)}
              </span>
            </div>
          </div>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="h-5 w-5" />
            <span className="sr-only">More options</span>
          </button>
        </div>

        {/* Post Content */}
        <div className="aspect-square bg-gray-100 relative">
          <img
            src={post}
            alt="Post content"
            className="h-full w-full object-cover cursor-pointer"
            onDoubleClick={handleDoubleClick}
          />
          {showOverlayHeart && (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://www.svgrepo.com/show/315933/heart-red.svg"
                className="h-24 w-24 animate-[scale-up-fade-out_2s_ease-out]"
                alt="Heart Animation"
              />
            </div>
          )}
        </div>

        {/* Post Actions */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <button
                onClick={handleLike}
                className="p-1 rounded-full hover:bg-gray-100 transition-transform duration-300"
              >
                <div
                  className={`transform ${
                    isAnimating ? "scale-125" : "scale-100"
                  } transition-transform duration-300`}
                >
                  {liked ? (
                    <img
                      src="https://www.svgrepo.com/show/315933/heart-red.svg"
                      className="h-6 w-6"
                      alt="Liked"
                    />
                  ) : (
                    <Heart className="h-6 w-6" />
                  )}
                </div>
                <span className="sr-only">Like</span>
              </button>
              <button
                onClick={() => {
                  setDerivedPost({
                    caption,
                    createdAt,
                    likes,
                    post,
                    userId,
                    postId,
                    comments,
                    likesCount,
                  });
                  setDoComment(true);
                  console.log(likes);
                }}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <MessageCircle className="h-6 w-6" />
                <span className="sr-only">Comment</span>
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <Send className="h-6 w-6" />
                <span className="sr-only">Share</span>
              </button>
            </div>
            <button
              className="p-1 rounded-full hover:bg-gray-100 active:scale-90 transition-transform duration-150 ease-out"
              onClick={handleSave}
            >
              <Bookmark
                fill={`${save ? "black" : "none"}`}
                className="h-6 w-6 transition-colors duration-300 ease-in-out"
              />
              <span className="sr-only">Save</span>
            </button>
          </div>
          {/* Likes and Caption */}
          <div className="mt-2">
            <p className="text-sm font-medium">{likesCount} likes</p>
          </div>
          <p className="mt-2 mb-1 text-xs">{caption}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
