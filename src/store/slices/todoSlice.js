import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../utils/api";

export const getTodos = createAsyncThunk("todos/getTodos", async ({token, currentDate}) => {

  const date = currentDate;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}/${month}/${day}`;

  const response = await fetch(`${URL}/api/tasks/?date=${formattedDate}`, {
    method: 'GET',
    
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  const data = await response.json();
  console.log(data);

  return data;
});

export const createToDo = createAsyncThunk(
  "todos/createTodo",
  async ({ title, descr, color, tag, token }) => {
    console.log({ title, descr, color, tag });
    const response = fetch(`${URL}/api/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ title, description: descr, color_code: color, tag, data_completed: '2024-04-29' }),
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
