import {
  addNewCommentAsync,
  fetchAllPostCommentsAsync,
  selectAllComments,
} from "@/redux/features/commentsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Post, User } from "@/utils/types";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

interface Props {
  user: User | null;
  post: Post;
}

const CommentSection: NextPage<Props> = ({ user, post }) => {
  const comments = useAppSelector(selectAllComments);
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");

  const handleCommentSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addNewCommentAsync({ incomingData: { text: text }, postID: post.id })
    );
  };

  useEffect(() => {
    dispatch(fetchAllPostCommentsAsync(post.id));
  }, []);

  return (
    <div className="flex flex-col mx-3">
      <h2 className="text-2xl text-primary font-semibold lg:text-4xl border-b-4 border-primary pb-2 pt-5 font-josefin-sans">
        Comments
      </h2>
      {user && (
        <form
          onSubmit={handleCommentSubmission}
          className="flex flex-col md:flex-row"
        >
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setText(e.currentTarget.value);
            }}
            placeholder="Write a commment..."
            className="w-full my-3 px-2 py-5 rounded-full font-fira-mono"
          />
          <button className="bg-primary text-white self-start md:self-center font-fira-mono px-5 py-2 text-xl font-[500] rounded-full md:basis-72 md:py-5 md:ml-2">
            Add a comment
          </button>
        </form>
      )}
      {comments ? (
        comments.map((item) => {
          return <CommentCard key={item.id} comment={item} />;
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default CommentSection;
