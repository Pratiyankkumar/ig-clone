import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Feed from "./components/Feed";
import Search from "./components/Search";
import { useState } from "react";
import ExplorePage from "./components/Explore";
import MessagesPage from "./components/Message";
import Profile from "./pages/Profile";

// import ImageUpload from "./components/ImageUpload";

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
      <Routes>
        {/* Root Path */}
        <Route
          path="/"
          element={
            <HomePage
              doComment={doComment}
              setDoComment={setDoComment}
              setiIsAuthenticated={setiIsAuthenticated}
              isAuthenticated={isAuthenticated}
              derivedPost={derivedPost}
              setCounter={setCounter}
              visibleUpload={visibleUpload}
              setVisibleUpload={setVisibleUpload}
              extend={extend}
              setExtend={setExtend}
            />
          }
        >
          <Route
            index
            element={
              <Feed
                derivedPost={derivedPost}
                setDerivedPost={setDerivedPost}
                setDoComment={setDoComment}
              />
            }
          />{" "}
          {/* Renders at `/` */}
          <Route path="search" element={<Search />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="reels" element={<p>reels</p>} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="notifications" element={<p>notifications</p>} />
          <Route
            path="profile/:id"
            element={
              <Profile
                derivedPost={derivedPost}
                setDerivedPost={setDerivedPost}
                setDoComment={setDoComment}
                setExtend={setExtend}
                extend={extend}
              />
            }
          />
          {/* Renders at `/search` */}
        </Route>
        {/* Other Routes */}
        <Route
          path="/login"
          element={<Login setiIsAuthenticated={setiIsAuthenticated} />}
        />
        <Route
          path="/signup"
          element={<Signup setiIsAuthenticated={setiIsAuthenticated} />}
        />
        <Route path="*" element={<p>Page not found :(</p>} />
      </Routes>
    </BrowserRouter>
  );
}

// function App() {
//   return <ImageUpload />;
// }

export default App;
