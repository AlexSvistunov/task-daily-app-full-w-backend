import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../utils/api";


export const login = createAsyncThunk("user/login", async ({password, email}) => {

  try {
    const response = await fetch(`${URL}/api/auth/token/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ password: password, email: email }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error!!!", error);
    throw error;
  }
});
const initialState = {
  token: localStorage.getItem("token")?.length
    ? localStorage.getItem("token")
    : null,

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      localStorage.removeItem('token')
      state.token = null
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.auth_token
      localStorage.setItem('token', action.payload.auth_token)
    })
  }

 
});

export default userSlice.reducer;

export const { setUser, removeUser } = userSlice.actions;
