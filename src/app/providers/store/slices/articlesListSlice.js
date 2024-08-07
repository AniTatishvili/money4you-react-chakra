import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loaded: true,
};

export const articlesListSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    datalist: (state, action) => {
      state.list = action.payload;
      state.loaded = false;
    },
  },
});

export const { datalist } = articlesListSlice.actions;
export default articlesListSlice.reducer;
