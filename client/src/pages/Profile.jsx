/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useAuthUser } from "../hooks/GetAuthUser";
import { ModernLoader } from "../components/ModernLoader";
import { useState } from "react";
import AuthedUserProfilePage from "../components/AuthedUserProfile";
import SimpleUserProfile from "../components/SimpleUserProfile";

const token = localStorage.getItem("accessToken");

function Profile({
  derivedPost,
  setDerivedPost,
  setDoComment,
  setExtend,
  extend,
}) {
  const [selectButton, setSelectButton] = useState("posts");

  const { id } = useParams();
  console.log(id);

  const { authUser, isLoading } = useAuthUser(token);

  if (isLoading) {
    return <ModernLoader />;
  }

  if (authUser._id === id) {
    return (
      <AuthedUserProfilePage
        selectButton={selectButton}
        setSelectButton={setSelectButton}
        authUser={authUser}
        derivedPost={derivedPost}
        setDerivedPost={setDerivedPost}
        setExtend={setExtend}
      />
    );
  }

  return <SimpleUserProfile />;
}

export default Profile;
