import { useEffect, useState } from "react";

export default function useGetUser(userId, token) {
  const [postUser, setPostUser] = useState({});

  useEffect(() => {
    async function getPostUser() {
      const userReq = await fetch(`http://localhost:5000/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const user = await userReq.json();

      setPostUser(user);
    }

    getPostUser();
  }, [userId, token]);

  return postUser;
}
