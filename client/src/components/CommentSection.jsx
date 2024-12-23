/* eslint-disable react/prop-types */
import {
  X,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  MoreHorizontal,
  Smile,
} from "lucide-react";
import Comment from "./Comment";
import useGetUser from "../hooks/GetUser";
import { formatTimeDiff } from "../utils/formatTimeDiff";
import { useEffect, useState } from "react";
import { useLike } from "../hooks/useLike";
import { ModernLoader } from "./ModernLoader";
import { useGetPost } from "../hooks/GetPost";
import { useAuthUser } from "../hooks/GetAuthUser";
import useCheckSave from "../hooks/useCheckSave";

const token = localStorage.getItem("accessToken");

function CommentSection({ setDoComment, derivedPost, setCounter, setExtend }) {
  const postUser = useGetUser(derivedPost.userId, token);
  const [showOverlayHeart, setShowOverlayHeart] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [comment, setComment] = useState("");
  const [localComments, setLocalComments] = useState([]);
  const postId = derivedPost.postId;

  const { save, setSave } = useCheckSave(postId, token);

  // Fetch the latest post data including likes and comments
  const { post, isLoading, fetchPost } = useGetPost(postId, token, derivedPost);

  // eslint-disable-next-line no-unused-vars
  const { authUser, isLoading: userIsLoading } = useAuthUser(token);

  // Initialize local state with the latest post data
  useEffect(() => {
    if (post?.comments) {
      setLocalComments(post.comments);
    }
  }, [post?.comments]);

  function handleCommentDelete(commentId) {
    setLocalComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
  }

  async function handleComment() {
    if (!comment.trim()) return;

    try {
      const postCommentReq = await fetch(
        `http://localhost:5000/post/comment/${postId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: comment }),
        }
      );

      const response = await postCommentReq.json();

      if (response) {
        setComment("");
        // Fetch the updated post to sync the latest data
        await fetchPost();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }

  // Use the latest post data for likes
  // eslint-disable-next-line no-unused-vars
  const { liked, likesCount, handleLikeAction } = useLike(
    token,
    postId,
    post?.likes || derivedPost.likes || []
  );

  async function handleLike() {
    await handleLikeAction();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    // Fetch the updated post to sync the latest like status
    await fetchPost();
  }

  async function handleDoubleClick() {
    if (!liked) {
      await handleLikeAction();
      // Fetch the updated post to sync the latest like status
      await fetchPost();
    }

    setShowOverlayHeart(true);
    setTimeout(() => setShowOverlayHeart(false), 2000);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && comment.trim()) {
      handleComment();
    }
  };

  if (isLoading) {
    return (
      <div
        className="w-full h-screen flex items-center justify-center z-40 fixed top-0 right-0"
        style={{ backgroundColor: "rgba(62, 62, 62, 0.5)" }}
      >
        <div className="bg-white rounded-lg">
          <ModernLoader />
        </div>
      </div>
    );
  }

  // Use the latest post data when rendering
  // eslint-disable-next-line no-unused-vars
  const currentPost = post || derivedPost;
  const currentLikesCount = post?.likes?.length || derivedPost.likesCount || 0;

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
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // Handle any network errors silently
      console.log("Error saving/unsaving post");
    }
  }

  return (
    <div
      className="w-full h-screen flex items-center justify-center fixed z-40 top-0 right-0"
      style={{ backgroundColor: "rgba(62, 62, 62, 0.5)" }}
    >
      <X
        onClick={() => {
          setDoComment(false);
          setExtend(false);
          setCounter((count) => count + 1);
        }}
        className="fixed top-4 right-4 text-white cursor-pointer"
      />
      <div
        onDoubleClick={handleDoubleClick}
        className="w-4/5 h-4/5 flex flex-row relative bg-red-500"
      >
        <div className="w-1/2 h-full relative">
          <img
            className="w-full h-full object-cover"
            src={post?.post || derivedPost.post}
            alt=""
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
        <div className="w-1/2 h-full flex flex-col bg-red-400">
          <div className="w-full h-full mx-auto bg-white">
            {/* Post Header */}
            <div className="flex items-center p-3 border-b">
              <div className="flex items-center flex-1">
                <img
                  src={postUser.profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-2">
                  <div className="flex items-center">
                    <span className="font-semibold text-sm">
                      {postUser.userName}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 48 48"
                      className="h-4 w-4 mt-1 ml-2"
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
                  </div>
                </div>
              </div>
              <button>
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            {/* Comments Section */}
            <div className="px-3 overflow-auto py-2 h-2/3">
              {localComments.length > 0 ? (
                [...localComments]
                  .reverse()
                  .map((comment, index) => (
                    <Comment
                      userId={comment.userId}
                      comment={comment}
                      key={index}
                      postId={postId}
                      onCommentDelete={handleCommentDelete}
                    />
                  ))
              ) : (
                <p>No Comments yet</p>
              )}
            </div>

            {/* Post Actions */}
            <div className="px-3 py-2 border-t">
              <div className="flex justify-between mb-2">
                <div className="flex space-x-4">
                  <button onClick={handleLike}>
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
                  <button>
                    <MessageCircle className="h-6 w-6" />
                  </button>
                  <button>
                    <Send className="h-6 w-6" />
                  </button>
                </div>
                <button>
                  <Bookmark
                    onClick={handleSave}
                    fill={`${save ? "black" : "none"}`}
                    className="h-6 w-6 transition-colors duration-300 ease-in-out"
                  />
                </button>
              </div>
              <div className="">
                <span className="font-semibold text-sm">
                  {currentLikesCount} likes
                </span>
              </div>
              <span className="text-gray-500 text-xs">
                {post?.caption || derivedPost.caption}
              </span>
              <div className="text-gray-500 text-xs">
                {formatTimeDiff(post?.createdAt || derivedPost.createdAt)}
              </div>
            </div>

            {/* Comment Input */}
            <div className="flex items-center px-3 py-2 border-t">
              <Smile className="h-6 w-6 mr-2" />
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 border-none text-sm focus:outline-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleComment}
                className={`font-semibold text-sm text-blue-500`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
