import { createSlice } from "@reduxjs/toolkit";

type TDetailsVisibilityStatus = {
  details_visibility_status: boolean;
};

const initialState: TDetailsVisibilityStatus = {
  details_visibility_status: false,
};

export const customer_details = createSlice({
  name: "customer_details_slice",
  initialState,
  reducers: {
    changeCustomerDetailsStatus: (state, action) => {
      state.details_visibility_status = action.payload;
    },
  },
});

const { reducer, actions } = customer_details;
export const { changeCustomerDetailsStatus } = actions;
export default reducer;
