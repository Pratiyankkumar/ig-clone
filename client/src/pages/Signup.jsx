/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../App";

function Signup() {
  const { setiIsAuthenticated } = useContext(PostContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    userName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempted with:", formData);

    try {
      const signupReq = await fetch(`http://localhost:5000/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.fullName,
          userName: formData.userName,
        }),
      });

      const user = await signupReq.json();

      if (signupReq.status === 201) {
        localStorage.setItem("accessToken", user.accessToken);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        setiIsAuthenticated(true);

        window.location.href = "http://localhost:5173";
      }

      if (signupReq.status !== 200) {
        console.error("An error Occured");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex flex-col items-center justify-center px-4 py-8">
        {/* Login Form Container */}
        <div className="w-full max-w-[350px] space-y-4">
          <div className="bg-white p-8 border border-gray-300 rounded-lg">
            {/* Instagram Logo */}
            <div className="flex justify-center mb-8">
              <img
                src="https://cdn.iconscout.com/icon/free/png-512/free-instagram-icon-download-in-svg-png-gif-file-formats--logo-social-media-logos-pack-icons-189799.png?f=webp&w=256"
                alt="Instagram"
                width={175}
                height={20}
              />
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-sm text-sm"
              />
              <input
                type="text"
                name="userName"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
                className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-sm text-sm"
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-sm text-sm"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-sm text-sm"
              />
              <button
                type="submit"
                className="w-full bg-[#0095F6] hover:bg-[#1877F2] text-white py-1.5 rounded-lg text-sm font-semibold"
                onSubmit={handleSubmit}
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Sign Up Box */}
          <div className="bg-white p-4 border border-gray-300 rounded-lg text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0095F6] font-semibold">
              Log In
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <footer className="mt-8 text-xs text-gray-500 text-center">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
            <a href="#">Meta</a>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Jobs</a>
            <a href="#">Help</a>
            <a href="#">API</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Locations</a>
            <a href="#">Instagram Lite</a>
            <a href="#">Threads</a>
            <a href="#">Contact Uploading & Non-Users</a>
            <a href="#">Meta Verified</a>
          </div>
          <div className="flex justify-center items-center gap-4">
            <select className="bg-transparent text-xs text-gray-500">
              <option value="en">English</option>
            </select>
            <span>© 2024 Instagram from Pratiyank</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Signup;
