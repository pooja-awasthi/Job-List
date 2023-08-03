import { createSlice } from "@reduxjs/toolkit";

const jobLocationSlice = createSlice({
  name: "jobLocation",
  initialState: {
    jobTitle: "",
    companyName: "",
    industry: "",
    location: "",
    remoteType: "",
  },
  reducers: {
    setJobLocation: (state, action) => {
      state.jobTitle = action.payload.jobTitle;
      state.companyName = action.payload.companyName;
      state.industry = action.payload.industry;
      state.location = action.payload.location;
      state.remoteType = action.payload.remoteType;
      return state;
    },
  },
});

// jobLocationSlice action object
export const { setJobLocation } = jobLocationSlice.actions;

// jobLocationSlice reducer
export default jobLocationSlice.reducer;
