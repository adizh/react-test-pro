import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  error: false,
  blogsItem: [],
  selectedBlogId: null,
  totalPaginationBtns: [],
  perPageBlogs: 6,
  currentPage: 1,
  currentBtn: 1,
  fromBtn: 0,
  toBtn: 3,
  blogsContainer: [],
  updatedBlogId: null,
};

export const fetchContent = createAsyncThunk(
  "blogs/fetchContent",
  async (arg, { getState }) => {
    let state = getState();
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const blogs = await res.data;
    const trimStart = (state.blogs.currentBtn - 1) * state.blogs.perPageBlogs;
    const trimEnd = trimStart + state.blogs.perPageBlogs;
    return blogs.slice(trimStart, trimEnd);
  }
);

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (arg) => {
  const res = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${arg}`
  );

  return await res.data.filter((elem) => elem.id !== arg);
});

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ blog, value }) => {
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${blog.id}`,
      {
        title: value.value,
        updatedAt: new Date().toLocaleString(),
      }
    );
    return await res.data;
  }
);
const slice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    showAllText: (state, { payload: blog }) => {
      if (state.selectedBlogId === null) {
        state.selectedBlogId = blog.id;
      } else {
        state.selectedBlogId = null;
      }
    },
    totalBtns: (state, action) => {
      state.totalPaginationBtns = Array(17)
        .fill(0)
        .map((_, i) => i + 1);

      state.totalPaginationBtns = [
        ...state.totalPaginationBtns.slice(state.fromBtn, state.toBtn),
      ];
    },
    setPage: (state, { payload: page }) => {
      const total = Math.ceil(state.blogsItem.length / state.perPageBlogs);
      state.currentBtn = page;
      if (
        state.currentBtn ===
          state.totalPaginationBtns[state.totalPaginationBtns.length - 1] &&
        state.totalPaginationBtns[state.totalPaginationBtns.length - 1] !==
          total
      ) {
        state.fromBtn++;
        state.toBtn++;
      }
      if (
        state.currentBtn === state.totalPaginationBtns[0] &&
        state.currentBtn !== 1
      ) {
        state.fromBtn--;
        state.toBtn--;
      }
    },
    nextBtn: (state, action) => {
      if (state.currentBtn !== 17) {
        state.currentBtn++;
        state.fromBtn++;
        state.toBtn++;
      }
    },
    prevBtn: (state, action) => {
      if (state.currentBtn === 2) {
        state.currentBtn--;
      }
      if (state.currentBtn > 1) {
        state.currentBtn--;
        state.fromBtn--;
        state.toBtn--;
      }
    },
    searchBlogs: (state, { payload: value }) => {
      state.blogsItem = state.blogsContainer.filter((blog) =>
        blog.title.includes(value)
      );
    },
    setUpdatedId: (state, { payload: id }) => {
      state.updatedBlogId = id;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.blogsItem = action.payload;
      state.blogsContainer = action.payload;
      state.error = false;
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.errMessage = action.error.message;
    });

    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.blogsItem = action.payload;
    });

    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.updatedBlogId = null;
    });
  },
});
export default slice.reducer;
export const {
  showAllText,
  setPage,
  totalBtns,
  nextBtn,
  prevBtn,
  searchBlogs,
  setUpdatedId,
} = slice.actions;
