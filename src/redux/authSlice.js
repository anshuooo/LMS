import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Set Axios base URL
axios.defaults.baseURL = "http://localhost:3000"; // Update if needed

// Load user from localStorage when the app starts
const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

if (storedUser) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${storedUser.token}`;
}

// Register User
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
      try {
        console.log("Sending data to backend:", userData); // Debugging
  
        const response = await axios.post(
          "/api/auth/register",
          userData,
          { headers: { "Content-Type": "application/json" } } // Ensure JSON format
        );
  
        console.log("Response from backend:", response.data); // Debugging
        return response.data;
      } catch (error) {
        console.error("Signup error:", error.response?.data || error.message); // Debugging
  
        return rejectWithValue(
          error.response?.data?.message || "Signup failed"
        );
      }
    }
  );
  
  

// Login User
export const loginUser = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/auth/login", credentials);
    const { token, user } = response.data;

    if (token) {
      localStorage.setItem(
        "user",
        JSON.stringify({ token, role: user.role, ...user })
      );
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return user;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Logout User
export const logoutUser = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  localStorage.removeItem("user");
  delete axios.defaults.headers.common["Authorization"];
  dispatch(authSlice.actions.logoutSuccess());
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser,
    role: storedUser?.role || null, // Store user role
    loading: false,
    error: null,
  },
  reducers: {
    logoutSuccess: (state) => {
      state.user = null;
      state.role = null; // Clear role on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Signup failed";
      })
      
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role; // Set role in state
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
