import { createSlice } from '@reduxjs/toolkit';

const jobRequisiteSlice = createSlice({
  name: 'jobRequisite',
  initialState: {
    experience: {min: 0, max: 0},
    salary: {min: 0, max: 0},
    totalEmployee: 0,
    applyType: "",
},
  reducers: {
    setJobRequisite: (state, action) => {
      state.experience = action.payload.experience;
      state.salary = action.payload.salary;
      state.totalEmployee = action.payload.totalEmployee;
      state.applyType = action.payload.applyType;
      return state;
    },
  },
});

export const { setJobRequisite } = jobRequisiteSlice.actions;
export default jobRequisiteSlice.reducer;