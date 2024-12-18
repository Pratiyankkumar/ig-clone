/* eslint-disable react/prop-types */
import {
  Search,
  Home,
  Compass,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/GetAuthUser";
import { useEffect, useState } from "react";
import SearchUsers from "./SearchUsers";

function LeftSidebar({ setiIsAuthenticated, setVisibleUpload }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const { authUser } = useAuthUser(token);
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthenticated");
    setiIsAuthenticated(false);

    // Force navigation to login page
    window.location.href = "http://localhost:5173/login";
  };

  if (!authUser) {
    return null;
  }

  return (
    <div className="hidden w-64 fixed top-0 bottom-0 left-0 flex-col z-20 gap-2 border-r p-4 lg:flex">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-semibold">Instagram</h1>
      </div>
      <nav className="flex flex-col gap-1">
        <NavLink
          to="/"
          className="flex items-center gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Home className="h-6 w-6" />
          <span className="text-sm font-medium">Home</span>
        </NavLink>
        <li
          className="flex items-center cursor-pointer gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
          onClick={() => setSearchIsOpen(true)}
        >
          <Search className="h-6 w-6" />
          <p className="text-sm font-medium">Search</p>
        </li>
        <NavLink
          to="/explore"
          className="flex items-center gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Compass className="h-6 w-6" />
          <span className="text-sm font-medium">Explore</span>
        </NavLink>
        <NavLink
          to="/reels"
          className="flex items-center gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Film className="h-6 w-6" />
          <span className="text-sm font-medium">Reels</span>
        </NavLink>
        <NavLink
          to="/messages"
          className="flex items-center gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-sm font-medium">Messages</span>
        </NavLink>
        <NavLink
          to="/notifications"
          className="flex items-center gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Heart className="h-6 w-6" />
          <span className="text-sm font-medium">Notifications</span>
        </NavLink>
        <li
          onClick={() => setVisibleUpload(true)}
          className="flex items-center gap-4 rounded-md px-2 cursor-pointer py-2 text-gray-700 hover:bg-gray-100"
        >
          <PlusSquare className="h-6 w-6" />
          <span className="text-sm font-medium">Create</span>
        </li>
        <NavLink
          to={`/profile/${authUser._id}`}
          className="flex items-center gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
        >
          <User className="h-6 w-6" />
          <span className="text-sm font-medium">Profile</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100 mt-auto"
        >
          <LogOut className="h-6 w-6" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </nav>

      <SearchUsers
        searchIsOpen={searchIsOpen}
        setSearchIsOpen={setSearchIsOpen}
      />
    </div>
  );
}

export default LeftSidebar;
