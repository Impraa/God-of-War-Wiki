import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import logger from "redux-logger";

const reducer = {
  user: userReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});
