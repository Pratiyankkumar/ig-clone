/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo, useState } from "react";

const MainContext = createContext();

function MainProvider({ children }) {
  const [doComment, setDoComment] = useState(false);

  const [derivedPost, setDerivedPost] = useState({});
  const [counter, setCounter] = useState(0);

  const [followPopup, setFollowPopup] = useState(false);
  const [followArray, setFollowArray] = useState([]);

  const value = useMemo(() => {
    return {
      doComment,
      setDoComment,
      derivedPost,
      setDerivedPost,
      counter,
      setCounter,
      followPopup,
      setFollowPopup,
      followArray,
      setFollowArray,
    };
  }, [counter, derivedPost, doComment, followPopup, followArray]);

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}

function useMain() {
  const context = useContext(MainContext);
  if (context === undefined)
    throw new Error("Main context is used Outside of main Provider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { MainProvider, useMain };
