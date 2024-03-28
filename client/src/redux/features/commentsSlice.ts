import { isErrorAPI } from "@/utils/helperFunction";
import { CommentAPIREsponse, CommentState } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CommentState = {
  isLoading: false,
  comments: [],
  errors: [],
};

const fetchAllPostCommentsAsync = createAsyncThunk(
  "comments/fetchAllPostComments",
  async (postID: number, thunkAPI) => {
    try {
      const response = await fetch(
        process.env.BACKEND_URL ??
          "http://127.0.0.1:8000/api" + "/comment/" + postID,
        {
          method: "GET",
        }
      );

      const data: CommentAPIREsponse = await response.json();

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return thunkAPI.fulfillWithValue(data.comments!);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addNewCommentAsync = createAsyncThunk(
  "comments/addNewComment",
  async (
    {
      incomingData,
      postID,
    }: { incomingData: { text: string }; postID: number },
    thunkAPI
  ) => {
    try {
      const response = await fetch(
        process.env.BACKEND_URL ??
          "http://127.0.0.1:8000/api" + "/comment/" + postID,
        {
          method: "POST",
          body: JSON.stringify(incomingData),
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );

      const data: CommentAPIREsponse = await response.json();

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return thunkAPI.fulfillWithValue(data.comments!);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentsSilce = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  selectors: {
    selectAllComments: (state) => state.comments,
    selectCommentError: (state) => state.errors,
    selectCommentIsLoading: (state) => state.isLoading,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllPostCommentsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPostCommentsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchAllPostCommentsAsync.rejected, (state, action) => {
        state.isLoading = false;
        if (isErrorAPI(action.payload)) state.errors = action.payload.errors;
        else if (typeof action.payload === "string")
          state.errors.push(action.payload);
      })
      .addCase(addNewCommentAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCommentAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(addNewCommentAsync.rejected, (state, action) => {
        state.isLoading = false;
        if (isErrorAPI(action.payload)) state.errors = action.payload.errors;
        else if (typeof action.payload === "string")
          state.errors.push(action.payload);
      });
  },
});

export { fetchAllPostCommentsAsync, addNewCommentAsync };
export const { selectAllComments, selectCommentError, selectCommentIsLoading } =
  commentsSilce.selectors;
export default commentsSilce.reducer;
