"use client";
import AllGodsCards from "@/components/AllGodsCards";
import SerachIsland from "@/components/SerachIsland";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="flex flex-col items-center flex-grow">
      <SerachIsland />
      <AllGodsCards />
    </div>
  );
};

export default Page;
