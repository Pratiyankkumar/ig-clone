/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ModernLoader } from "./ModernLoader";
import UserInfo from "./UserInfo";

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

export default SeeFollows;
