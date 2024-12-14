import { Camera } from "lucide-react";

/* eslint-disable react/prop-types */
export default function AuthedUserPostsContainer({
  posts,
  setDerivedPost,
  setExtend,
}) {
  // {isLoading, posts}
  // caption,
  // createdAt,
  // likes,
  // post,
  // userId,
  // postId,
  // comments,
  // likesCount,
  // console.log(derivedPost);

  if (posts.posts?.message) {
    return (
      <div className="py-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-black mb-4">
          <Camera className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Share photos</h2>
        <p className="text-gray-600 mb-6">
          When you share photos, they will appear on your profile.
        </p>
        <button className="text-blue-500 font-semibold hover:text-blue-600">
          Share your first photo By clicking Create on a left sidebar
        </button>
      </div>
    );
  }

  return (
    <div className="py-16 text-center flex flex-row gap-2 flex-wrap">
      {posts.posts.map((post) => (
        <img
          className="w-60 h-60 object-cover cursor-pointer"
          src={post.post}
          key={post._id}
          alt="prfile-photo"
          onClick={() => {
            setExtend(true);
            setDerivedPost({
              caption: post.caption,
              createdAt: post.createdAt,
              likes: post.likes || [],
              post: post.post,
              userId: post.userId,
              postId: post._id,
              comments: post.comments,
              likesCount: post.likes.length || 0,
            });
          }}
        />
      ))}
    </div>
  );
}
