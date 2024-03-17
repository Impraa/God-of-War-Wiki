"use client";
import {
  refreshTokenAsync,
  selectLastChecked,
  selectWasTokenChecked,
} from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { NextPage } from "next";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const Hydration: NextPage<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const wasTokenChecked = useAppSelector(selectWasTokenChecked);
  const lastChecked = useAppSelector(selectLastChecked);

  const checkUserSession = () => {
    dispatch(refreshTokenAsync(null));
  };

  useLayoutEffect(() => {
    if (
      !wasTokenChecked ||
      (lastChecked &&
        new Date(
          new Date().toLocaleString("en-US", {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })
        ).getSeconds() -
          new Date(
            new Date(lastChecked!).toLocaleString("en-US", {
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })
          ).getSeconds() >
          2 * 60 * 60 * 1000)
    )
      checkUserSession();
  }, [pathname]);

  return <>{children}</>;
};

export default Hydration;
