import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./slice.js";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
  },
});
