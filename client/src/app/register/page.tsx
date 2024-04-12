"use client";
import RegisterForm from "@/components/RegisterForm";
import { NextPage } from "next";
import BetterButton from "../../components/BetterButton";
import { signIn, useSession } from "next-auth/react";
import RegisterAside from "@/components/RegisterAside";
import {
  registerUserAsync,
  selectUserIsLoading,
} from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { GoogleUser } from "@/utils/types";
import { useEffect } from "react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const isLoading = useAppSelector(selectUserIsLoading);

  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && session.user) {
      console.log(session.user as GoogleUser);
      dispatch(registerUserAsync(session.user as GoogleUser));
    }
  }, [session, status]);

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
            disable={isLoading}
          >
            Sign in with Google
          </BetterButton>
        </div>
      </div>
    </div>
  );
};

export default Page;
