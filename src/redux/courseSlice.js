import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/courses"; // Base API URL

// Fetch all courses (Public)
export const fetchCourses = createAsyncThunk("courses/fetchAll", async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch courses");
    }
  });
  
  // Fetch a course by ID (Public)
  export const fetchCourseById = createAsyncThunk("courses/fetchById", async (courseId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${courseId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch course details");
    }
  });
  
  // Create a new course (Trainer Only)
  export const createCourse = createAsyncThunk("courses/create", async (courseData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user?.token;
  
      const response = await axios.post(`${API_URL}/create`, courseData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create course");
    }
  });
  
  // Update a course (Trainer Only)
  export const updateCourse = createAsyncThunk("courses/update", async ({ courseId, courseData }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user?.token;
  
      const response = await axios.put(`${API_URL}/${courseId}`, courseData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update course");
    }
  });
  
  // Delete a course (Trainer Only)
  export const deleteCourse = createAsyncThunk("courses/delete", async (courseId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user?.token;
  
      await axios.delete(`${API_URL}/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return courseId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete course");
    }
  });
  
  const courseSlice = createSlice({
    name: "courses",
    initialState: {
      courses: [],
      selectedCourse: null,
      loading: false,
      error: null,
    },
    reducers: {
      clearSelectedCourse: (state) => {
        state.selectedCourse = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // Fetch all courses
        .addCase(fetchCourses.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCourses.fulfilled, (state, action) => {
          state.loading = false;
          state.courses = action.payload;
        })
        .addCase(fetchCourses.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        
        // Fetch course by ID
        .addCase(fetchCourseById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCourseById.fulfilled, (state, action) => {
          state.loading = false;
          state.selectedCourse = action.payload;
        })
        .addCase(fetchCourseById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        
        // Create course
        .addCase(createCourse.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createCourse.fulfilled, (state, action) => {
          state.loading = false;
          state.courses.push(action.payload);
        })
        .addCase(createCourse.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        
        // Update course
        .addCase(updateCourse.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateCourse.fulfilled, (state, action) => {
          state.loading = false;
          state.courses = state.courses.map((course) =>
            course._id === action.payload._id ? action.payload : course
          );
        })
        .addCase(updateCourse.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        
        // Delete course
        .addCase(deleteCourse.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteCourse.fulfilled, (state, action) => {
          state.loading = false;
          state.courses = state.courses.filter((course) => course._id !== action.payload);
        })
        .addCase(deleteCourse.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { clearSelectedCourse } = courseSlice.actions;
  export default courseSlice.reducer;