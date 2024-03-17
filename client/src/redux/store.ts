import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";
import { thunk } from "redux-thunk";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import postsSlice from "./features/postsSlice";
import userSlice from "./features/userSlice";
import storage from "./storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user", "posts"],
};

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "wasTokenChecked", "lastChecked"],
};

const postsPersistConfig = {
  key: "posts",
  storage,
  whitelist: ["posts"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userSlice),
  posts: persistReducer(postsPersistConfig, postsSlice),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk, logger),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
