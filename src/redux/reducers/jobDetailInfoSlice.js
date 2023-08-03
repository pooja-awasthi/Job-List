import { createSlice } from "@reduxjs/toolkit";

const jobDetailInfoSlice = createSlice({
  name: "jobDetailInfo",
  initialState: {
    applyType: "",
    companyName: "",
    experienceMax: 0,
    experienceMin: 0,
    id: 0,
    industry: "",
    jobTitle: "",
    location: "",
    remoteType: "",
    salaryMax: 0,
    salaryMin: 0,
    totalEmployee: 0,
  },
  reducers: {
    setJobDetailInfo: (state, action) => {
      state.applyType = action.payload.applyType;
      state.companyName = action.payload.companyName;
      state.experienceMax = action.payload.experienceMax;
      state.experienceMin = action.payload.experienceMin;
      state.id = action.payload.id;
      state.industry = action.payload.industry;
      state.jobTitle = action.payload.jobTitle;
      state.location = action.payload.location;
      state.remoteType = action.payload.remoteType;
      state.salaryMax = action.payload.salaryMax;
      state.salaryMin = action.payload.salaryMin;
      state.totalEmployee = action.payload.totalEmployee;
      return state;
    },
  },
});

// jobDetailInfoSlice action object
export const { setJobDetailInfo } = jobDetailInfoSlice.actions;

// jobDetailInfoSlice reducer
export default jobDetailInfoSlice.reducer;
