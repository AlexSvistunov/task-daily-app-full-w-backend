import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../utils/api";

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async ({ token, currentDate }) => {
    const date = currentDate;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}/${month}/${day}`;

    const response = await fetch(`${URL}/api/tasks/?date=${formattedDate}`, {
      method: "GET",

      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.json();

    return data;
  }
);

export const createToDo = createAsyncThunk(
  "todos/createToDo",
  async ({ title, descr, color, tag, token, currentDate }) => {

    const date = currentDate;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    const response = await fetch(`${URL}/api/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        title,
        description: descr,
        color_code: color,
        tag,
        data_completed: formattedDate,
      }),
    });

    const data = await response.json();

    return data;
  }
);

export const changeTodo = createAsyncThunk(
  "todos/changeTodo",
  async ({ token, id, newFields }) => {
    const response = await fetch(`${URL}/api/tasks/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },

      body: JSON.stringify({
        title: newFields.title,
        description: newFields.description,
        completed: newFields.completed,
      }),
    });

    const data = await response.json();

    return { data: data, id: id };
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async ({ token, id }) => {
    const response = await fetch(`${URL}/api/tasks/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },

    });

    const data = await response.json();

    return {data, id}
  }
);

const initialState = {
  todoList: [],
  sortedList: [],
  isLoading: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addToSortedList: (state, action) => {
      console.log('123')
      console.log(action)
      console.log(action.payload)
      state.sortedList = action.payload 
    },
  },

  extraReducers: (builder) => {
    // builder.addCase(createToDo.fulfilled, (state, action) => {
    //   console.log(action.payload)
    //   state.todoList = action.payload;
    // });

    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todoList = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getTodos.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(changeTodo.fulfilled, (state, action) => {
      const todo = state.todoList.find((el) => el.id === action.payload.id);
      const index = state.todoList.indexOf(todo);

      const array = [...state.todoList];
      array[index] = action.payload.data;

      state.todoList = [...array];
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {

      const todo = state.todoList.find((el) => el.id === action.payload.id);
      const index = state.todoList.indexOf(todo);
      const array = [...state.todoList];
      array.splice(index, 1)

      state.todoList = [...array]
   
    });



  },
});

export default todoSlice.reducer;
export const {addToSortedList} = todoSlice.actions
