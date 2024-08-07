import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tv_status: JSON.parse(window.localStorage.getItem("tvw-status")),
  radio_status: false,
};

export const widgets_status = createSlice({
  name: "widgets_status_slice",
  initialState,
  reducers: {
    tvWidgetStatus: (state, action) => {
      state.tv_status = action.payload;
    },
    radioWidgetStatus: (state, action) => {
      state.radio_status = action.payload;
    },
  },
});

const { reducer, actions } = widgets_status;

export const { tvWidgetStatus, radioWidgetStatus } = actions;
export default reducer;
