/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import FollowButton from "./FollowButton";
import { useEffect, useState } from "react";
import { ModernLoader } from "./ModernLoader";

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
  }, [followArray]);

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
          setFollows([]);
        }}
        className="fixed top-4 right-4 text-white cursor-pointer"
      />
      <div className="w-[350px] overflow-auto h-[400px] rounded-md shadow-md flex flex-col relative bg-white">
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

function UserInfo({ user }) {
  return (
    <div className="flex flex-row relative  items-start  mt-4  rounded-md px-2 py-3">
      <img
        src={user.profilePic}
        alt="profile-image"
        className="w-10 ml-4 h-10 rounded-full"
      />
      <div className="flex flex-col  ml-4">
        <p className="font-semibold text-sm">{user.userName}</p>
        <p className="text-sm  text-gray-500">
          {user.name} <span>&sdot;</span>
          <span className="ml-[2px]">{user?.followers?.length} Followers</span>
        </p>
      </div>
      <FollowButton styles="bg-primary absolute rounded-md px-3 py-1 text-white top-4 text-sm right-4">
        Follow
      </FollowButton>
    </div>
  );
}

export default SeeFollows;
