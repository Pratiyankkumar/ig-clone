import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export function useLike(token, postId, likes) {
  const [liked, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);

  // Initial setup and socket listeners
  useEffect(() => {
    let mounted = true;

    async function fetchLiked() {
      try {
        const response = await fetch(
          `http://localhost:5000/post/isliked/${postId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const isLiked = await response.json();
        if (mounted) {
          setLike(isLiked.isLiked);
        }
      } catch (error) {
        console.error("Error fetching liked status:", error);
      }
    }

    fetchLiked();

    function handlePostLiked(data) {
      if (data.postId === postId && mounted) {
        setLikesCount(data.likesCount.length);
      }
    }

    function handlePostUnliked(data) {
      if (data.postId === postId && mounted) {
        setLikesCount(data.likesCount.length);
      }
    }

    socket.on("postLiked", handlePostLiked);
    socket.on("postUnliked", handlePostUnliked);

    return () => {
      mounted = false;
      socket.off("postLiked", handlePostLiked);
      socket.off("postUnliked", handlePostUnliked);
    };
  }, [postId, token]);

  // Update likesCount when likes prop changes
  useEffect(() => {
    setLikesCount(likes.length);
  }, [likes]);

  const handleLikeAction = async () => {
    const url = liked
      ? `http://localhost:5000/post/unlike/${postId}`
      : `http://localhost:5000/post/like/${postId}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      await response.json();
      setLike((prev) => !prev);
      // Remove the local likesCount update since it will be handled by the socket
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return {
    liked,
    likesCount,
    setLike,
    handleLikeAction,
  };
}
