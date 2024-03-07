"use client";
import { store } from "@/redux/store";
import { NextPage } from "next";
import { Provider as ReduxProvider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const Provider: NextPage<Props> = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default Provider;
