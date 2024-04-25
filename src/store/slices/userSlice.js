import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../utils/api";


export const login = createAsyncThunk('user/login', async () => {
  try {
    fetch(`${URL}/auth/token/login/`)
  } catch (error) {
    
  }
})

fetch('https://api.example.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ title: 'New Post', body: 'This is a new post' })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));


const initialState = {
  token: localStorage.getItem('token')?.length ? localStorage.getItem('token') : null,
  id: null,
  email: localStorage.getItem('email')?.length ? localStorage.getItem('email') : null,
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
      state.email = action.payload.email
      state.id = action.payload.id
      state.token = action.payload.token
    },
    removeUser: (state) => {
      state.email = null
      state.id = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('email')
    },

    
  }
})

export default userSlice.reducer

export const {setUser, removeUser} = userSlice.actions;



