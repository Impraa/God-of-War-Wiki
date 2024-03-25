import { isErrorAPI } from "@/utils/helperFunction";
import {
  LoginUser,
  RegisterUser,
  User,
  UserAPIResponse,
  UserState,
} from "@/utils/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  user: null,
  isLoading: false,
  wasTokenChecked: false,
  lastChecked: null,
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
  async (user: RegisterUser | User, thunkApi) => {
    try {
      const response = await fetch(
        process.env.BACKEND_URL ?? "http://127.0.0.1:8000/api" + "/register",
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

      if (response.status !== 201) {
        return thunkApi.rejectWithValue(data.error!);
      }

      return thunkApi.fulfillWithValue(data.user!);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const refreshTokenAsync = createAsyncThunk(
  "user/refreshCookie",
  async (empty: null, thunkApi) => {
    try {
      const response = await fetch(
        process.env.BACKEND_URL ??
          "http://127.0.0.1:8000/api" + "/refresh-token",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );

      const data: UserAPIResponse = await response.json();

      if (response.status !== 200) return thunkApi.rejectWithValue(data.error);

      return thunkApi.fulfillWithValue("");
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

const favouritePostAsync = createAsyncThunk(
  "user/favouritePost",
  async (postId: number, thunkApi) => {
    try {
      const response = await fetch(
        process.env.BACKEND_URL ??
          "http://127.0.0.1:8000/api" + "/post/favourite/" + postId,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data: UserAPIResponse = await response.json();

      if (response.status !== 200) return thunkApi.rejectWithValue(data.error!);

      return thunkApi.fulfillWithValue(data.user!);
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.lastChecked = new Date();
      state.wasTokenChecked = true;
    },
  },
  selectors: {
    selectCurrentUser: (state) => state.user,
    selectUserError: (state) => state.error,
    selectUserIsLoading: (state) => state.isLoading,
    selectWasTokenChecked: (state) => state.wasTokenChecked,
    selectLastChecked: (state) => state.lastChecked,
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
      })
      .addCase(registerUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        if (isErrorAPI(action.payload)) state.error = action.payload;
        else if (typeof action.payload === "string")
          state.error.message = action.payload;
      })
      .addCase(refreshTokenAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.wasTokenChecked = true;
        state.lastChecked = new Date(Date.now());
        if (isErrorAPI(action.payload)) state.error = action.payload;
        else if (typeof action.payload === "string")
          state.error.message = action.payload;
      })
      .addCase(refreshTokenAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshTokenAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.wasTokenChecked = true;
        state.lastChecked = new Date(Date.now());
      })
      .addCase(favouritePostAsync.rejected, (state, action) => {
        state.isLoading = false;
        if (isErrorAPI(action.payload)) state.error = action.payload;
        else if (typeof action.payload === "string")
          state.error.message = action.payload;
      })
      .addCase(favouritePostAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(favouritePostAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload!;
      });
  },
});

export {
  loginUserAsync,
  registerUserAsync,
  refreshTokenAsync,
  favouritePostAsync,
};
export const { logoutUser } = userSlice.actions;
export const {
  selectCurrentUser,
  selectUserError,
  selectUserIsLoading,
  selectLastChecked,
  selectWasTokenChecked,
} = userSlice.selectors;
export default userSlice.reducer;
