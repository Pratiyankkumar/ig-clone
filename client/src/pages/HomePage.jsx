/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import CommentSection from "../components/CommentSection";
import UploadUI from "../components/Upload";

function HomePage({
  setiIsAuthenticated,
  doComment,
  setDoComment,
  derivedPost,
  setCounter,
  visibleUpload,
  setVisibleUpload,
  isAuthenticated,
}) {
  if (!isAuthenticated) return <p>Please first authenticate</p>;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Sidebar */}
      <LeftSidebar
        setVisibleUpload={setVisibleUpload}
        setiIsAuthenticated={setiIsAuthenticated}
      />
      {/* Main Content */}
      <main className="flex-1 w-full items-center justify-center ml-64 border-r">
        <Outlet /> {/* Renders the content for the current route */}
        {doComment && (
          <CommentSection
            derivedPost={derivedPost}
            setDoComment={setDoComment}
            setCounter={setCounter}
          />
        )}
        {visibleUpload && <UploadUI setVisibleUpload={setVisibleUpload} />}
      </main>
    </div>
  );
}

export default HomePage;
