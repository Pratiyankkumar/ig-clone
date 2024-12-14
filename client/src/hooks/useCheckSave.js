/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

export default function useCheckSave(postId, token) {
  const [save, setSave] = useState(false);

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
  }, [postId, token]);

  return { save, setSave };
}
