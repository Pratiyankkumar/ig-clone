import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Feed from "./components/Feed";
import Search from "./components/Search";
import { createContext, useState } from "react";
import ExplorePage from "./components/Explore";
import MessagesPage from "./components/Message";
import Profile from "./pages/Profile";

// import ImageUpload from "./components/ImageUpload";

export const PostContext = createContext();

function App() {
  const [doComment, setDoComment] = useState(false);
  const [isAuthenticated, setiIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [derivedPost, setDerivedPost] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [counter, setCounter] = useState(0);
  const [visibleUpload, setVisibleUpload] = useState(false);
  const [extend, setExtend] = useState(false);

  // console.log(derivedPost);

  return (
    <BrowserRouter>
      <PostContext.Provider
        value={{
          doComment,
          setDoComment,
          isAuthenticated,
          setiIsAuthenticated,
          derivedPost,
          setDerivedPost,
          counter,
          setCounter,
          visibleUpload,
          setVisibleUpload,
          extend,
          setExtend,
        }}
      >
        <Routes>
          {/* Root Path */}
          <Route path="/" element={<HomePage />}>
            <Route index element={<Feed />} /> {/* Renders at `/` */}
            <Route path="search" element={<Search />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="reels" element={<p>reels</p>} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="notifications" element={<p>notifications</p>} />
            <Route path="profile/:id" element={<Profile />} />
            {/* Renders at `/search` */}
          </Route>
          {/* Other Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<p>Page not found :(</p>} />
        </Routes>
      </PostContext.Provider>
    </BrowserRouter>
  );
}

// function App() {
//   return <ImageUpload />;
// }

export default App;
