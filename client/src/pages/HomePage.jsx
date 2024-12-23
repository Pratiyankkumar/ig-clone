import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import CommentSection from "../components/CommentSection";
import UploadUI from "../components/Upload";
import { useMain } from "../Contexts/MainContext";
import SeeFollows from "../components/SeeFollows";
import { useAuth } from "../Contexts/AuthContext";
import { useUi } from "../Contexts/UiContext";

function HomePage() {
  const {
    doComment,
    setDoComment,
    derivedPost,
    setCounter,
    followPopup,
    setFollowPopup,
    followArray,
  } = useMain();

  const { isAuthenticated, setiIsAuthenticated } = useAuth();

  const { extend, setExtend, visibleUpload, setVisibleUpload } = useUi();

  if (!isAuthenticated) return <p>Please first authenticate</p>;

  // console.log(derivedPost);

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <SeeFollows
        followPopup={followPopup}
        followArray={followArray}
        setFollowPopup={setFollowPopup}
      />

      {/* Left Sidebar */}
      <LeftSidebar
        setVisibleUpload={setVisibleUpload}
        setiIsAuthenticated={setiIsAuthenticated}
      />
      {/* Main Content */}
      <main className="flex-1 w-full items-center justify-center md:ml-64 ml-0 border-r">
        <Outlet /> {/* Renders the content for the current route */}
        {extend && (
          <CommentSection
            derivedPost={derivedPost}
            setDoComment={setDoComment}
            setCounter={setCounter}
            setExtend={setExtend}
          />
        )}
        {doComment && (
          <CommentSection
            derivedPost={derivedPost}
            setDoComment={setDoComment}
            setExtend={setExtend}
            setCounter={setCounter}
          />
        )}
        {visibleUpload && <UploadUI setVisibleUpload={setVisibleUpload} />}
      </main>
    </div>
  );
}

export default HomePage;
