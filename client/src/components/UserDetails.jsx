import { NavLink } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function UserDetails({ user, setSearchIsOpen }) {
  return (
    <NavLink
      to={`/profile/${user._id}`}
      className="flex flex-row items-center ml-[30px] mt-4 w-[350px] ease-in-out duration-300 rounded-md px-2 py-3 hover:bg-gray-200"
      onClick={() => setSearchIsOpen(false)}
    >
      <img
        src={user.profilePic}
        alt="profile-image"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col  ml-4">
        <p className="font-semibold text-sm">{user.userName}</p>
        <p className="text-sm  text-gray-500">
          {user.name} <span>&sdot;</span>{" "}
          <span>{user?.followers?.length || 0} Followers</span>
        </p>
      </div>
    </NavLink>
  );
}
