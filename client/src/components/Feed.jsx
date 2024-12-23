/* eslint-disable react/prop-types */
import Post from "./Post";
import Stories from "./Stories";
import RightSidebar from "./RightSidebar";
import { ModernLoader } from "./ModernLoader";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useMain } from "../Contexts/MainContext";

const token = localStorage.getItem("accessToken");
const socket = io("http://localhost:5000");

function Feed() {
  const { setDoComment, derivedPost, setDerivedPost } = useMain();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(0);

  useEffect(() => {
    // Function to fetch initial posts
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const fetchPostReq = await fetch("http://localhost:5000/posts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const postsData = await fetchPostReq.json();
        setPosts(postsData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();

    // Socket event handler
    const handleNewUpload = (newPost) => {
      console.log("New post received:", newPost);
      setPosts((prevPosts) => {
        // Check if post already exists to prevent duplicates
        const postExists = prevPosts.some((post) => post._id === newPost._id);
        if (postExists) {
          return prevPosts;
        }
        return [newPost, ...prevPosts];
      });
      setTriggerFetch((num) => num + 1);
    };

    // Set up socket listener
    socket.on("new-upload", handleNewUpload);

    // Cleanup function
    return () => {
      socket.off("new-upload", handleNewUpload);
    };
  }, [triggerFetch]); // Empty dependency array since we want this to run once on mount

  {
    posts.length === 0 && <p>There are no posts here</p>;
  }

  return (
    <div className="flex flex-row relative justify-evenly">
      {isLoading && <ModernLoader size={80} color="#10b981" />}
      <div>
        <Stories />
        {posts.map((post, index) => (
          <Post
            key={index} // Using unique post ID instead of index
            caption={post.caption}
            createdAt={post.createdAt}
            likes={post.likes}
            userId={post.userId}
            post={post.post}
            postId={post._id}
            comments={post.comments}
            setDoComment={setDoComment}
            derivedPost={derivedPost}
            setDerivedPost={setDerivedPost}
          />
        ))}
      </div>
      <RightSidebar />
    </div>
  );
}

export default Feed;
