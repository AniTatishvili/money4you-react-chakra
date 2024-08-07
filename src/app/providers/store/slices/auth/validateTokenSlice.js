import { createSlice } from "@reduxjs/toolkit";

export const validationToken = createSlice({
  name: "validation_token_status",
  initialState: {
    status: false,
    token: "",
  },
  reducers: {
    chekingValidationStatus: (state, action) => {
      state.status = action.payload?.success;
      state.token = action.payload?.data.token;
    },
    changeValidationStatus: (state) => {
      state.status = false;
      state.token = "";
    },
  },
});

const { actions, reducer } = validationToken;

export const { chekingValidationStatus, changeValidationStatus } = actions;
export default reducer;
