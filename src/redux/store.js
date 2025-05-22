import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseSlice";
import authReducer from "./authSlice"; // Assuming you have an auth slice


const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
   
  },
});

export default store;
