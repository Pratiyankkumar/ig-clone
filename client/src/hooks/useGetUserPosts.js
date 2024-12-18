import { useEffect, useState } from "react";

export function useGetUsersPost(userId, token) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      const postsReq = await fetch(
        `http://localhost:5000/posts/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (postsReq.status === 404) {
        return setPosts([]);
      }

      const fetchedPosts = await postsReq.json();

      setPosts(fetchedPosts);

      setIsLoading(false);
    }

    fetchPosts();
  }, [token, userId]);

  return { posts, isLoading };
}
