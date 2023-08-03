import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

// Configuring of redux store.
const store = configureStore({
  reducer: rootReducer,
});

export default store;
