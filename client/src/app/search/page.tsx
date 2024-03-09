"use client";
import SerachIsland from "@/components/SerachIsland";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className=" flex-grow">
      <SerachIsland />
    </div>
  );
};

export default Page;
