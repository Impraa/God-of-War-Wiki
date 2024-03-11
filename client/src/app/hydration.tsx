"use client";
import { NextPage } from "next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
interface Props {
  children: React.ReactNode;
}

const Hydration: NextPage<Props> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    const cleanup = () => {
      console.log("Cleaning up before reload");
    };

    window.addEventListener("beforeunload", cleanup);
  }, [pathname]);

  return <>{children}</>;
};

export default Hydration;
