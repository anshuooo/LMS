import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

// Fetch all users (Admin Only)
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
  }
});

// Fetch user by ID
export const fetchUserById = createAsyncThunk("users/fetchUserById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
  }
});

// Get current logged-in user
export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch current user");
  }
});

// Update user profile
export const updateUserProfile = createAsyncThunk("users/updateUserProfile", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/me`, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to update user");
  }
});

// Delete user (Admin Only)
export const deleteUser = createAsyncThunk("users/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete user");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentUser: null,
    userDetails: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.userDetails = action.payload;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
