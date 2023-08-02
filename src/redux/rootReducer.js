// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import JobRequisiteReducer from './reducers/JobRequisiteSlice';
import JobLocationReducer from './reducers/JobLocationSlice';
import JobDetailInfoReducer from './reducers/jobDetailInfoSlice';
import ResetJobDetailReducer from './reducers/resetJobDetailSlice';

const rootReducer = combineReducers({
  jobRequisite: JobRequisiteReducer,
  jobLocation: JobLocationReducer,
  jobDetailInfo: JobDetailInfoReducer,
  resetJobDetail: ResetJobDetailReducer,
});

export default rootReducer;