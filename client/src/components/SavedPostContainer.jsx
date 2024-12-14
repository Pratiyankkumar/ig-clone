/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ModernLoader } from "./ModernLoader";
import { Bookmark } from "lucide-react";

const token = localStorage.getItem("accessToken");

const SavedPostContainer = ({ authUser, setDerivedPost, setExtend }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(derivedPost);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        setIsLoading(true);
        // Wait for all post fetches to complete
        const postsPromises = authUser.saved.map(async (save) => {
          // Assuming useGetPost logic is moved to a regular fetch function
          const response = await fetch(
            `http://localhost:5000/post/byId/${save.postId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch post");
          return response.json();
        });

        const posts = await Promise.all(postsPromises);
        setSavedPosts(posts);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser.saved?.length > 0) {
      fetchSavedPosts();
    } else {
      setIsLoading(false);
    }
  }, [authUser.saved]);

  if (isLoading) {
    return <ModernLoader />;
  }

  if (!authUser.saved?.length) {
    return (
      <div className="py-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-black mb-4">
          <Bookmark className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Saved Posts</h2>
        <p className="text-gray-600 mb-6">Your saved Posts will appear here</p>
        <button className="text-blue-500 font-semibold hover:text-blue-600">
          Save your first post by going to the Home Section
        </button>
      </div>
    );
  }

  return (
    <div className="py-16 text-center flex flex-row gap-2 flex-wrap">
      {savedPosts.map((post) => (
        <img
          className="w-60 h-60 object-cover cursor-pointer"
          src={post.post}
          key={post._id}
          alt="saved-photo"
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
};

export default SavedPostContainer;
