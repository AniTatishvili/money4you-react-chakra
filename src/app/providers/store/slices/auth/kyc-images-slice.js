import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  datas: {
    front: null,
    back: null,
    selfie: null,
  },
};

export const kyc_images = createSlice({
  name: "kyc_image_slice",
  initialState,
  reducers: {
    updateKYCImagaObject: (state, action) => {
      state.datas = { ...state.datas, ...action.payload };
    },
  },
});

const { actions, reducer } = kyc_images;
export const { updateKYCImagaObject } = actions;
export default reducer;
