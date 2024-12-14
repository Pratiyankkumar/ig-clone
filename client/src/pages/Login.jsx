/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import { PostContext } from "../App";

function Login() {
  const { setiIsAuthenticated } = useContext(PostContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErroMessage] = useState("");
  const [error, setError] = useState(false);

  // Add useEffect to handle error timeout
  useEffect(() => {
    let timeoutId;

    if (error) {
      timeoutId = setTimeout(() => {
        setError(false);
      }, 5000); // 5 seconds
    }

    // Cleanup function to clear timeout if component unmounts or error changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [error]); // Only run effect when error state changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginReq = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginReq.json();
      console.log(loginData);

      if (loginReq.status !== 200) {
        setErroMessage(loginData.error);
        setError(true);
        return;
      }

      if (loginReq.status === 200) {
        localStorage.setItem("accessToken", loginData.accessToken);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        setiIsAuthenticated(true);

        window.location.href = "http://localhost:5173";
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex flex-col items-center relative justify-center px-4 py-8">
        {error && <Error text={errorMessage} />}
        {/* Rest of your component remains the same */}
        <div className="w-full max-w-[350px] space-y-4">
          <div className="bg-white p-8 border border-gray-300 rounded-lg">
            <div className="flex justify-center mb-8">
              <img
                src="https://cdn.iconscout.com/icon/free/png-512/free-instagram-icon-download-in-svg-png-gif-file-formats--logo-social-media-logos-pack-icons-189799.png?f=webp&w=256"
                alt="Instagram"
                width={175}
                height={20}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="email"
                placeholder="Phone number, username, or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-sm text-sm"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-1.5 bg-gray-50 border border-gray-300 rounded-sm text-sm"
              />
              <button
                type="submit"
                className="w-full bg-[#0095F6] hover:bg-[#1877F2] text-white py-1.5 rounded-lg text-sm font-semibold"
                disabled={!email || !password}
              >
                Log in
              </button>
            </form>

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-4 text-sm font-semibold text-gray-500">
                OR
              </span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <a
              href="/forgot-password"
              className="block text-center mt-4 text-xs text-[#385185]"
            >
              Forgot password?
            </a>
          </div>

          <div className="bg-white p-4 border border-gray-300 rounded-lg text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-[#0095F6] font-semibold">
              Sign Up
            </Link>
          </div>
        </div>

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

export default Login;
