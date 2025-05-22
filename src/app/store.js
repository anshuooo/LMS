import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.jsx"; // Make sure this path is correct

const store = configureStore({
  reducer: {
    auth: authReducer, // Ensure this is added
  },
});


export default store;

