import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  press_card: {
    press_card_image: null,
  },
};

export const journalist_auth_slice = createSlice({
  name: "jouranilst_auth_slice",
  initialState,
  reducers: {
    setJournalistPressCard: (state, action) => {
      state.press_card.press_card_image = action.payload;
    },
  },
});

const { reducer, actions } = journalist_auth_slice;
export const { setJournalistPressCard } = actions;
export default reducer;
