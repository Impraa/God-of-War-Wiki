"use client";
import { persistor, store } from "@/redux/store";
import { NextPage } from "next";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
  children: React.ReactNode;
}

const Provider: NextPage<Props> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </ReduxProvider>
  );
};

export default Provider;
