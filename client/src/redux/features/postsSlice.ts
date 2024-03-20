import { isErrorAPI } from "@/utils/helperFunction";
import { PostAPIResponse, PostState } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: {
    errors: [],
    message: "",
  },
};

const fetchAllPostsAsync = createAsyncThunk(
  "posts/fetchAllPosts",
  async (options, thunkAPI) => {
    try {
      const response = await fetch(
        process.env.BACKEND_URL ?? "http://127.0.0.1:8000/api" + "/post/getAll",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );

      const data: PostAPIResponse = await response.json();

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(data);
      }

      return thunkAPI.fulfillWithValue(data.posts!);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fetchPostAsync = createAsyncThunk(
  "posts/fetchSinglePost",
  async (postID: number, thunkAPI) => {
    try {
      const response = await fetch(
        process.env.BACKEND_URL ??
          "http://127.0.0.1:8000/api" + "/post/" + postID,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data: PostAPIResponse = await response.json();

      if (response.status !== 200) return thunkAPI.rejectWithValue(data.error!);

      return thunkAPI.fulfillWithValue(data.post!);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  selectors: {
    selectAllPosts: (state) => state.posts,
    selectUserError: (state) => state.error,
    selectUserIsLoading: (state) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPostsAsync.rejected, (state, action) => {
        state.isLoading = false;
        if (isErrorAPI(action.payload)) state.error = action.payload;
        else if (typeof action.payload === "string")
          state.error.message = action.payload;
      })
      .addCase(fetchPostAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      .addCase(fetchPostAsync.rejected, (state, action) => {
        state.isLoading = false;
        if (isErrorAPI(action.payload)) state.error = action.payload;
        else if (typeof action.payload === "string")
          state.error.message = action.payload;
      });
  },
});

export { fetchAllPostsAsync, fetchPostAsync };
export const { selectAllPosts, selectUserError, selectUserIsLoading } =
  postsSlice.selectors;
export default postsSlice.reducer;
