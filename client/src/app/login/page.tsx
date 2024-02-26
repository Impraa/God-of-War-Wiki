"use client";
import LoginForm from "@/components/LoginForm";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-primary-text border-b-4 border-[#F68A8A] text-3xl font-josefin-sans pb-5 px-16">
          Login
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
