import { isErrorAPI } from "@/utils/helperFunction";
import {
  LoginUser,
  RegisterUser,
  User,
  UserAPIResponse,
  UserState,
} from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  user: {
    id: 0,
    email: "",
    username: "",
    profilePicture: "",
    bio: "",
  },
  isLoading: false,
  error: {
    errors: [],
    message: "",
  },
};

const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (user: LoginUser, thunkAPI) => {
    try {
      const response = await fetch(
        process.env.BACKEND_URL ?? "http://127.0.0.1:8000/api" + "/login",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );

      const data: UserAPIResponse = await response.json();

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(data);
      }

      return thunkAPI.fulfillWithValue(data.user!);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const registerUserAsync = createAsyncThunk(
  "user/registerUser",
  async (user: RegisterUser, thunkApi) => {
    try {
      const response = await fetch(
        process.env.BACKEND_URL ?? "http://127.0.0.1:8000/api" + "/register",
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
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  selectors: {
    selectCurrentUser: (state) => state.user,
    selectUserError: (state) => state.error,
    selectUserIsLoading: (state) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        if (isErrorAPI(action.payload)) state.error = action.payload;
        else if (typeof action.payload === "string")
          state.error.message = action.payload;
      });
  },
});

export { loginUserAsync };
export const { selectCurrentUser, selectUserError, selectUserIsLoading } =
  userSlice.selectors;
export default userSlice.reducer;
