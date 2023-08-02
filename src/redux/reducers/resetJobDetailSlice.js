import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applyType: '',
  companyName: '',
  experienceMax: 0,
  experienceMin: 0,
  id: 0,
  industry: '',
  jobTitle: '',
  location: '',
  remoteType: '',
  salaryMax: 0,
  salaryMin: 0,
  totalEmployee: 0,
};

const resetJobDetailSlice = createSlice({
  name: 'resetJobDetail',
  initialState,
  reducers: {
    resetJobDetailInfo: (state) => {
      return initialState;
    },
  },
});

export const { resetJobDetailInfo } = resetJobDetailSlice.actions;
export default resetJobDetailSlice.reducer;