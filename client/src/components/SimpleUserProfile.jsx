/* eslint-disable react/prop-types */
import { Camera, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetUsersPost } from "../hooks/useGetUserPosts";
import { ModernLoader } from "./ModernLoader";
import useGetUser from "../hooks/GetUser";

const token = localStorage.getItem("accessToken");

function SimpleUserProfile({ derivedPost, setDerivedPost, setExtend }) {
  const { id: userId } = useParams();

  const { posts, isLoading } = useGetUsersPost(userId, token);
  const user = useGetUser(userId, token);

  console.log(user);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          <img src={user.profilePic} alt="" />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h1 className="text-xl">{user.userName}</h1>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-primary text-white rounded-md text-sm font-medium">
                Follow
              </button>
              <button className="px-4 py-1.5 bg-gray-100 rounded-md text-sm font-medium">
                Message
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-4">
            <div>
              <span className="font-semibold">{posts.length || 0}</span> posts
            </div>
            <div>
              <span className="font-semibold mr-1">
                {user?.followers?.length || 0}
              </span>
              followers
            </div>
            <div>
              <span className="font-semibold mr-1">
                {user?.following?.length || 0}
              </span>
              following
            </div>
          </div>

          {/* Bio */}
          <div>
            <h2 className="font-semibold">{user.name}</h2>
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
          <button className="px-4 py-3 text-sm font-semibold border-t border-black -mt-px">
            POSTS
          </button>
        </div>
      </div>

      {/* Empty State */}
      <SimpleUserPostContainer
        derivedPost={derivedPost}
        setDerivedPost={setDerivedPost}
        setExtend={setExtend}
        posts={posts}
        isLoading={isLoading}
      />
    </div>
  );
}

function SimpleUserPostContainer({
  posts,
  isLoading,
  setDerivedPost,
  setExtend,
}) {
  // console.log(derivedPost);

  isLoading && <ModernLoader />;
  if (posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-black mb-4">
          <Camera className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold mb-4">No Posts Yet</h2>
      </div>
    );
  }

  return (
    <div className="py-16 text-center flex flex-row gap-2 flex-wrap">
      {posts.map((post) => (
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

export default SimpleUserProfile;
