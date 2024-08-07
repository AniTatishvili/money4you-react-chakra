import { createSlice } from "@reduxjs/toolkit";

const tooltipSlice = createSlice({
  name: "tooltip",
  initialState: {
    showTooltip: false,
    defaultTooltip: [],
    tooltipComponentsData: [],
    kycTooltipComponentsData: [],
    footerTooltipcomponentsData: [],
  },
  reducers: {
    setShowTooltip: (state, action) => {
      state.showTooltip = action.payload;
    },

    setDefaultTooltip: (state, action) => {
      state.defaultTooltip = [...action.payload];
    },

    setFooterTooltip: (state, action) => {
      state.footerTooltipcomponentsData = [...action.payload];
    },

    setTooltipData: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.tooltipComponentsData = [...action.payload];
      }
    },

    setKycTooltipComponentsData: (state, action) => {
      state.kycTooltipComponentsData = [...action.payload];
    },

    clearTooltipData: (state) => {
      state.tooltipComponentsData = [];
    },
  },
});

export const { setShowTooltip, setTooltipData, setDefaultTooltip, setFooterTooltip, setKycTooltipComponentsData, clearTooltipData } = tooltipSlice.actions;

export default tooltipSlice.reducer;
