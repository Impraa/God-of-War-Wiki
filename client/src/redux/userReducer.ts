import { RegisterUser, User, UserAPIResponse, UserState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  user: {
    id: 0,
    email: "",
    username: "",
    profilePicture: "",
    bio: "",
  },
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    registerUser: create.asyncThunk(
      async (user: User, thunkApi) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL ??
              "http://127.0.0.1:8000/api" + "/register",
            {
              method: "POST",
              body: JSON.stringify(user),
              headers: {
                "Content-type": "application/json",
              },
            }
          );

          if (response.status !== 201) {
            const data: UserAPIResponse = await response.json();

            return thunkApi.rejectWithValue(data.error!);
          }

          const data: UserAPIResponse = await response.json();

          return thunkApi.fulfillWithValue(data.user!);
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
        },
        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        },
        pending: (state) => {
          state.isLoading = true;
        },
      }
    ),

    loginUser: create.asyncThunk(
      async (user: RegisterUser, thunkApi) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL ?? "http://127.0.0.1:8000/api" + "/login",
            {
              method: "POST",
              body: JSON.stringify(user),
              headers: {
                "Content-type": "application/json",
              },
            }
          );

          if (response.status !== 201) {
            const data: UserAPIResponse = await response.json();

            return thunkApi.rejectWithValue(data.error!);
          }

          const data: UserAPIResponse = await response.json();

          return thunkApi.fulfillWithValue(data.user!);
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
        },
        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        },
        pending: (state) => {
          state.isLoading = true;
        },
      }
    ),
  }),
  selectors: {
    selectCurrentUser: (state) => state.user,
    selectUserError: (state) => state.error,
    selectUserIsLoading: (state) => state.isLoading,
  },
});

export const { registerUser, loginUser } = userSlice.actions;
export const { selectCurrentUser, selectUserError, selectUserIsLoading } =
  userSlice.selectors;
export default userSlice.reducer;
