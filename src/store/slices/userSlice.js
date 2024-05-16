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

      const data = await response.json();
      return data;

    } catch (error) {
      alert(error.message)
    }
  }
);

export const logOut = createAsyncThunk("user/logOut", async ({token}) => {
  try {
    const response = await fetch(`${URL}/api/auth/token/logout/`, {
      method: "POST",

      headers: {
        Authorization: `Token ${token}`,
      },
    });

    console.log(response);

    const data = await response.json();
    console.log(data);


  } catch (error) {
    throw new Error(error.message);
  }
});

    // if (response.status === "204") {
    //   const data = await response.json();
    //   return data;
    // }

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

    if (data.auth_token) {
      return data;
    } else {
      return;
    }
  }
);

export const getMyData = createAsyncThunk(
  "user/getMyData",
  async ({ token }) => {
    console.log(token);
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
      console.log(action.payload);
      if (action.payload.auth_token) {
        state.token = action.payload.auth_token;
        localStorage.setItem("token", action.payload.auth_token);
      }

      if (action.payload["non_field_errors"]) {
        alert(action.payload["non_field_errors"][0]);
      }

     
    });

    builder.addCase(logOut.fulfilled, (state) => {
      console.log('fulfilled');
      localStorage.removeItem("token");
      state.token = null;
    });

    builder.addCase(logOut.rejected, (state) => {
      console.log('rejected');
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.token = action.payload.auth_token;
      localStorage.setItem("token", action.payload.auth_token);
    });
  },
});

export default userSlice.reducer;

export const { setUser, removeUser } = userSlice.actions;
