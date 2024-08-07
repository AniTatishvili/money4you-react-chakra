import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const investor_slice = createSlice({
  name: "investor_slice",
  initialState,
  reducers: {},
});

const { reducer, actions } = investor_slice;
export const { getProjectsList } = actions;
export default reducer;
