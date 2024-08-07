import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update_number_datas: {},
};

export const update_number = createSlice({
  name: "user_update_number",
  initialState,
  reducers: {
    editProfileUpdatePhoneNumber: (state, action) => {
      state.update_number_datas = { ...state.update_number_datas, ...action.payload };
    },
  },
});

const { actions, reducer } = update_number;
export const { editProfileUpdatePhoneNumber } = actions;
export default reducer;
