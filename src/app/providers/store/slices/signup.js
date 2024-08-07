import { createSlice } from "@reduxjs/toolkit";

export const signup = createSlice({
  name: "signup",
  initialState: {
    data: {},
  },
  reducers: {
    setUpdatedUserData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    getAcceptTerms: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { getAcceptTerms, setUpdatedUserData } = signup.actions;
export default signup.reducer;
