import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../utils/api";

export const login = createAsyncThunk(
  "user/login",
  async ({ password, email }) => {
    const response = await fetch(`${URL}/api/auth/token/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ password: password, email: email }),
    });

    

    const data = await response.json();
    return data;
  }
);

export const logOut = createAsyncThunk("user/logOut", async (token) => {
  try {
    const response = fetch(`${URL}/api/auth/token/logout/`, {
      method: "POST",

      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.status === "204") {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error!!!", error);
    throw error;
  }
});

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ email, password }) => {
    const response = await fetch(`${URL}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: email,
      }),
    });

    const data = await response.json();

    return data;
  }
);

export const getMyData = createAsyncThunk(
  "user/getMyData",
  async ({ token }) => {
    const response = await fetch(`${URL}/api/users/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const data = await response.json();

    return data;
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

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.token = action.payload.auth_token;
      localStorage.setItem("token", action.payload.auth_token);
    });
  },
});

export default userSlice.reducer;

export const { setUser, removeUser } = userSlice.actions;
