import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  token: null,
  userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      login: (state, action) => {
        const {token, name} =   action.payload
        localStorage.setItem("token", token);
        localStorage.setItem('name', name);
        localStorage.setItem("isLoggedIn", true);
      },
      logout: (state) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        localStorage.removeItem("isLoggedIn");
      },
    },
  });
  

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
