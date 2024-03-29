"use client";
import AllGodsCards from "@/components/AllGodsCards";
import SerachIsland from "@/components/SerachIsland";
import { selectAllPosts } from "@/redux/features/postsSlice";
import { useAppSelector } from "@/redux/store";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const posts = useAppSelector(selectAllPosts);

  return (
    <div className="flex flex-col items-center flex-grow">
      <SerachIsland posts={posts} />
      <AllGodsCards posts={posts} />
    </div>
  );
};

export default Page;
