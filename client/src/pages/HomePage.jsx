/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import CommentSection from "../components/CommentSection";
import UploadUI from "../components/Upload";
import { useMain } from "../Contexts/MainContext";
import SeeFollows from "../components/SeeFollows";

function HomePage() {
  const {
    setiIsAuthenticated,
    doComment,
    setDoComment,
    derivedPost,
    setCounter,
    visibleUpload,
    setVisibleUpload,
    isAuthenticated,
    extend,
    setExtend,
    followPopup,
    setFollowPopup,
    followArray,
  } = useMain();

  if (!isAuthenticated) return <p>Please first authenticate</p>;

  // console.log(derivedPost);

  return (
    <div className="flex min-h-screen bg-white">
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
