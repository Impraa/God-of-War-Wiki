import { CommentState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CommentState = {
  isLoading: false,
  comments: [],
  errors: [],
};

const commentsSilce = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  selectors: {
    selectAllComments: (state) => state.comments,
    selectCommentError: (state) => state.errors,
    selectCommentIsLoading: (state) => state.isLoading,
  },
});

export const { selectAllComments, selectCommentError, selectCommentIsLoading } =
  commentsSilce.selectors;
export default commentsSilce.reducer;
