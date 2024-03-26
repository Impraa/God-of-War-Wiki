import { User } from "@/utils/types";
import { NextPage } from "next";
import { useState } from "react";

interface Props {
  user: User | null;
}

const CommentSection: NextPage<Props> = ({ user }) => {
  const [text, setText] = useState("");
  return (
    <div className="flex flex-col mx-3">
      <h2 className="text-2xl text-primary font-semibold lg:text-4xl border-b-4 border-primary pb-2 pt-5 font-josefin-sans">
        Comments
      </h2>
      <form className="flex flex-col md:flex-row">
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
    </div>
  );
};

export default CommentSection;
