import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_data: {},
};

export const authSlice = createSlice({
  name: "auth_slice",
  initialState,
  reducers: {
    saveUserDataInGlobalState: (state, action) => {
      state.user_data = { ...state.user_data, ...action.payload };
    },
  },
});

export const { saveUserDataInGlobalState } = authSlice.actions;
export default authSlice.reducer;
