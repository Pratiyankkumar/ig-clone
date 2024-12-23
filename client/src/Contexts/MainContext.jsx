/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const MainContext = createContext();

function MainProvider({ children }) {
  const [doComment, setDoComment] = useState(false);
  const [isAuthenticated, setiIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [derivedPost, setDerivedPost] = useState({});
  const [counter, setCounter] = useState(0);
  const [visibleUpload, setVisibleUpload] = useState(false);
  const [extend, setExtend] = useState(false);
  const [followPopup, setFollowPopup] = useState(false);
  const [followArray, setFollowArray] = useState([]);
  return (
    <MainContext.Provider
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
        followPopup,
        setFollowPopup,
        followArray,
        setFollowArray,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

function useMain() {
  const context = useContext(MainContext);
  if (context === undefined)
    throw new Error("Main context is used Outside if main Provider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { MainProvider, useMain };
