"use client";
import Cookies from "js-cookie";
import { refreshTokenAsync } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/store";
import { NextPage } from "next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
interface Props {
  children: React.ReactNode;
}

const Hydration: NextPage<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [cookie] = useCookies(["was_token_present"]);

  const cleanup = () => {
    router.refresh();
    dispatch(refreshTokenAsync(null));
    console.log("Cleaning up before reload");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", cleanup);
  }, [pathname, cookie]);

  return <>{children}</>;
};

export default Hydration;
