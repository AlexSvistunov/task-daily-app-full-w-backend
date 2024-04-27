import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../utils/api";

export const login = createAsyncThunk(
  "user/login",
  async ({ password, email }) => {
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
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error!!!", error);
      throw error;
    }
  }
);

export const logOut = createAsyncThunk("user/logout", async (token) => {
  console.log(token);
  try {
    const response = fetch(`${URL}/api/auth/token/logout/`, {
      method: "POST",

      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.status === "204") {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.error("Error!!!", error);
    throw error;
  }
});

export const signUp = createAsyncThunk(
  "user/signup",
  async ({ email, password }) => {
    try {
      const response = await fetch(`${URL}/api/users/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          userName: email,
        }),
      });

      if (response.ok) {
        alert("Пользователь Зареган!");
      }
    } catch (error) {
      console.error(error);
    }
  }
);
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
      localStorage.removeItem("token");
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.auth_token;
      localStorage.setItem("token", action.payload.auth_token);
    });

    builder.addCase(logOut.fulfilled, (state) => {
      localStorage.removeItem("token");
      state.token = null;
    });
  },
});

export default userSlice.reducer;

export const { setUser, removeUser } = userSlice.actions;
