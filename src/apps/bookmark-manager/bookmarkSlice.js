import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBookmarkItems } from './bookmarkApi';

const initialState = {
  itemsPerPage: 10,
  bookmarkList: null,
  status: 'iddle',
};

// actions

export const fetchBookmark = createAsyncThunk(
  'bookmark/fetchBookmark',
  async ({ page, itemsPerPage } = { page: 1, itemsPerPage: 10 }) => {
    const res = await getBookmarkItems(page, itemsPerPage);
    return res.data;
  }
);

// slices
export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmark.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookmark.fulfilled, (state, action) => {
        state.status = 'idle';
        if (state.bookmarkList && state.bookmarkList.items) {
          state.bookmarkList.items.push(...action.payload.items);
          state.bookmarkList.page = action.payload.page;
          state.bookmarkList.itemsPerPage = action.payload.itemsPerPage;
          state.bookmarkList.totalPage = action.payload.totalPage;
        } else {
          state.bookmarkList = action.payload;
        }
      });
  },
});
// selector
export const selectBookmarkList = (state) => state.bookmark.bookmarkList;
export const selectStatus = (state) => state.bookmark.status;

export default bookmarkSlice.reducer;
