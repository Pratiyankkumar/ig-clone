/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import FollowButton from "./FollowButton";
import { useEffect, useState } from "react";
import { ModernLoader } from "./ModernLoader";
import { useAuthUser } from "../hooks/GetAuthUser";

const token = localStorage.getItem("accessToken");

function SeeFollows({ followPopup, setFollowPopup, followArray }) {
  const [follows, setFollows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Log the incoming followArray to see its structure
        setIsLoading(true);
        const userPromises = followArray.map((follow) =>
          fetch(`http://localhost:5000/user/${follow.userId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }).then((res) => res.json())
        );

        const users = await Promise.all(userPromises);
        setFollows(users);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUsers();
  }, [followArray, followPopup]);

  console.log(follows);

  return (
    <div
      style={{ backgroundColor: "rgba(62, 62, 62, 0.5)" }}
      className={`w-full h-screen ${
        followPopup ? "flex" : "hidden"
      } items-center justify-center fixed top-0 z-40 right-0 `}
    >
      <X
        onClick={() => {
          setFollowPopup(false);
        }}
        className="fixed top-4 right-4 text-white cursor-pointer"
      />
      <div className="w-[380px] overflow-auto h-[400px] rounded-md shadow-md flex flex-col relative bg-white">
        <div className=" flex w-full items-center justify-center border-b-gray-300 border-b-[1px]">
          <p className="text-xl font-bold py-2 ">Followers</p>
        </div>
        <div className="flex flex-col  w-[350px] justify-center">
          {follows.length === 0 && !isLoading && (
            <p className="px-4 py-2">No Follower</p>
          )}
          {isLoading && <ModernLoader />}
          {follows.map((follow) => (
            <UserInfo user={follow} key={follow._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

const UserInfo = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authUser } = useAuthUser(token);

  useEffect(() => {
    let isMounted = true;

    async function checkIsFollowing() {
      try {
        setError(null);
        const checkReq = await fetch(
          `http://localhost:5000/user/isfollowing/${user._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!checkReq.ok) {
          throw new Error("Failed to check following status");
        }

        const res = await checkReq.json();
        if (isMounted) {
          setIsFollowing(res.following === true);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load following status");
          console.error("Error checking follow status:", err);
        }
      }
    }

    if (user._id) {
      checkIsFollowing();
    }

    return () => {
      isMounted = false;
    };
  }, [user._id]);

  const handleClickFollowButton = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setError(null);

      const endpoint = isFollowing
        ? `http://localhost:5000/user/unfollow/${user._id}`
        : `http://localhost:5000/user/follow/${user._id}`;

      const req = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const res = await req.json();

      if (!req.ok) {
        throw new Error(res.message || "Failed to update follow status");
      }

      setIsFollowing((prev) => !prev);
    } catch (err) {
      setError(err.message || "Failed to update follow status");
      console.error("Error updating follow status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row relative items-start mt-4 rounded-md px-2 py-3">
      <img
        src={user.profilePic}
        alt="profile"
        className="w-10 ml-4 h-10 rounded-full"
      />
      <div className="flex flex-col ml-4">
        <p className="font-semibold text-sm">{user.userName}</p>
        <p className="text-sm text-gray-500">
          {user.name} <span>&sdot;</span>
          <span className="ml-[2px]">{user?.followers?.length} Followers</span>
        </p>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
      <FollowButton
        onClick={handleClickFollowButton}
        styles={`${
          isFollowing ? "bg-secondary text-black" : "bg-primary text-white"
        } ${
          authUser._id === user._id ? "hidden" : ""
        } absolute rounded-md px-3 py-1 top-4 text-sm right-4 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Loading..." : isFollowing ? "Following" : "Follow"}
      </FollowButton>
    </div>
  );
};

export default SeeFollows;
