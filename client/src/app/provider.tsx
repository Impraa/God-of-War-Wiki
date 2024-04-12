"use client";
import { persistor, store } from "@/redux/store";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
  children: React.ReactNode;
}

const Provider: NextPage<Props> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <SessionProvider>{children}</SessionProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default Provider;
