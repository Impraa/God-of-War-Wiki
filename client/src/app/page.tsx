"use client";
import CardCarousel from "@/components/CardCarousel";
import Header from "@/components/Header";
import Sections from "@/components/Sections";

import { NextPage } from "next";
import { useEffect } from "react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  useEffect(() => {
    console.log("mac");
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <CardCarousel />
      <Sections />
    </div>
  );
};

export default Page;
