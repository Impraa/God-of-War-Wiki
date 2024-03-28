import Logo from "@/assets/Logo";
import { Comment } from "@/utils/types";
import { NextPage } from "next";
import Image from "next/image";

interface Props {
  comment: Comment;
}

const CommentCard: NextPage<Props> = ({ comment }) => {
  return (
    <div className="py-5 w-full md:w-[40em] self-center">
      <div className="flex font-josefin-sans items-center space-x-5 text-primary text-lg border-b-2 border-primary pb-2">
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
      </div>
      <p className="text-white py-1">{comment.text}</p>
    </div>
  );
};

export default CommentCard;
