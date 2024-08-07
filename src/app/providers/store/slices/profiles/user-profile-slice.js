import { createSlice } from "@reduxjs/toolkit";

const user_profile_slice = createSlice({
  name: "user_profile_slice",
  initialState: {
    user_profile_menu_visibility: null,
  },
  reducers: {
    userProfileMenuVisibilityStatus: (state, action) => {
      state.user_profile_menu_visibility = action.payload;
    },
  },
});

const { reducer, actions } = user_profile_slice;

export const { userProfileMenuVisibilityStatus } = actions;
export default reducer;
