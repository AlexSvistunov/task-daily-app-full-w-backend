import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../utils/api";

export const getTodos = createAsyncThunk("todos/getTodos", async (token) => {
  const response = fetch(`${URL}/api/tasks/`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);

  return data;
});

export const createToDo = createAsyncThunk(
  "todos/createTodo",
  async ({ title, descr, color, tag }) => {
    const response = fetch(`${URL}/api/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, descr, color, tag }),
    });

    const data = await response.json();
    console.log(data);

    return data;
  }
);

const initialState = {
  todoList: [],
  isLoading: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todoList = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getTodos.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export default todoSlice.reducer;
