import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getTodos = createAsyncThunk("todos/getTodos", async (token) => {
  
});

const initialState = {
  todoList: [],
  isLoading: false
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todoList = action.payload;
      state.isLoading = false
    });

    builder.addCase(getTodos.pending, (state, action) => {
      state.isLoading = true
    });
  },
});

export default todoSlice.reducer;
