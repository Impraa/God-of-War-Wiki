import Logo from "@/assets/Logo";
import Trash from "@/assets/Trash";
import TrashOutline from "@/assets/TrashOutline";
import { deleteCommentAsync } from "@/redux/features/commentsSlice";
import { selectCurrentUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Comment } from "@/utils/types";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

interface Props {
  comment: Comment;
}

const CommentCard: NextPage<Props> = ({ comment }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleTrashClick = () => {
    dispatch(deleteCommentAsync(comment.id));
  };

  return (
    <div className="py-5 w-full md:w-[40em] self-center">
      <div className="flex font-josefin-sans items-center space-x-5 text-primary text-lg border-b-2 border-primary pb-4">
        <div className="relative h-10 w-10 rounded-full">
          {comment.owner.profilePicture ? (
            <Image
              src={
                "http://127.0.0.1:8000/uploads/profile_pictures/" +
                comment.owner.profilePicture
              }
              alt={comment.owner.username + "'s profile picture"}
              fill
              className="rounded-3xl absolute inset-0 w-full h-full"
            />
          ) : (
            <Logo />
          )}
        </div>
        <h2>{comment.owner.username}</h2>
        {currentUser && currentUser.id === comment.owner.id && (
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? (
              <Trash className="cursor-pointer" onClick={handleTrashClick} />
            ) : (
              <TrashOutline />
            )}
          </div>
        )}
      </div>
      <p className="text-white py-1">{comment.text}</p>
    </div>
  );
};

export default CommentCard;
