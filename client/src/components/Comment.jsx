/* eslint-disable react/prop-types */
import useGetUser from "../hooks/GetUser";
import { formatTimeDiff } from "../utils/formatTimeDiff";
import { useAuthUser } from "../hooks/GetAuthUser";
import { Trash2 } from "lucide-react";

const token = localStorage.getItem("accessToken");

function Comment({ comment, userId, postId, onCommentDelete }) {
  const user = useGetUser(userId, token);
  const { authUser } = useAuthUser(token);

  async function handleDeleteComment() {
    const commentDelReq = await fetch(
      `http://localhost:5000/post/deletecomment/${postId}/${comment._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const delComment = await commentDelReq.json();

    if (delComment) {
      onCommentDelete(comment._id);
    }

    console.log(delComment);
  }

  return (
    <div className="flex mt-2 items-start">
      <img
        src={user.profilePic}
        alt="Commenter"
        className="w-8 h-8 rounded-full mr-2"
      />
      <div className="flex-1">
        <div>
          <span className="font-semibold text-sm mr-2">{user.userName}</span>
          <span className="text-sm">{comment.comment}</span>
        </div>
        <div className="flex items-center mt-1 text-xs text-gray-500">
          <span>{formatTimeDiff(comment.createdAt)}</span>
        </div>
      </div>
      <Trash2
        onClick={handleDeleteComment}
        className={`h-4 w-4 cursor-pointer ${
          userId === authUser._id ? "" : "hidden"
        } `}
      />
    </div>
  );
}

export default Comment;
