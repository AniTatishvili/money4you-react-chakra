import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resume: {
    resume_file: null,
  },
};

const jobseeker_auth_slice = createSlice({
  name: "jobseeker_auth_slice",
  initialState,
  reducers: {
    setResumeFile: (state, action) => {
      state.resume.resume_file = action.payload;
    },
  },
});

const { reducer, actions } = jobseeker_auth_slice;
export const { setResumeFile } = actions;
export default reducer;
