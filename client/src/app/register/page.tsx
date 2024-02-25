"use client";
import RegisterForm from "@/components/RegisterForm";
import { NextPage } from "next";
import BetterButton from "../../components/BetterButton";
import { signIn } from "next-auth/react";
import RegisterAside from "@/components/RegisterAside";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <div className="flex flex-col items-center md:flex-row xl:max-w-[1440px]">
        <RegisterAside />
        <div className="flex flex-col items-center lg:mr-16">
          <h2 className="text-primary-text border-b-2 border-[#F68A8A] text-3xl font-josefin-sans pb-5 px-16">
            Register
          </h2>
          <RegisterForm />
          <BetterButton
            onClick={() => signIn("google")}
            type={"button"}
            colorType={"google"}
          >
            Sign in with Google
          </BetterButton>
        </div>
      </div>
    </div>
  );
};

export default Page;
