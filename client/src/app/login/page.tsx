"use client";
import LoginForm from "@/components/LoginForm";
import { NextPage } from "next";
import Image from "next/image";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-primary-text border-b-4 border-[#F68A8A] text-3xl font-josefin-sans pb-5 px-16">
          Login
        </h2>
        <LoginForm />
        <Image
          src={"/ZeusLoginFooter.png"}
          alt="Zeus image"
          height={290}
          width={442}
          quality={100}
          className="hidden absolute bottom-0 w-64 left-0 z-0 md:block"
        />
        <Image
          src={"/KratosLoginFooter.png"}
          alt="Zeus image"
          height={290}
          width={442}
          quality={100}
          className="hidden absolute bottom-0 right-0 w-64 z-0 md:block"
        />
      </div>
    </div>
  );
};

export default Page;
