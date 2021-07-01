import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "./API";
import jwt_decode from "jwt-decode";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import { PrivateRoute } from "../utils";

export const LoginUser = createAsyncThunk(
  "Auth/LoginUser",
  async ({ username, password }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/user/login`, {
        username,
        password,
      });
      if (data.success) {
        return fulfillWithValue(data);
      }
    } catch (error) {
      alert(error);
      return rejectWithValue(error);
    }
  }
);

export const SignUpUser = createAsyncThunk(
  "Auth/SignUpUser",
  async (
    { username, email, password },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${API_URL}/user/signup`, {
        username,
        email,
        password,
      });
      if (data.success) {
        return fulfillWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create Slice For Auth

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    login: JSON.parse(localStorage.getItem("neoNotelogin")) || {
      token: "",
      _id: "",
      username: "",
      email: "",
    },
    status: "",
    signup: false,
  },
  reducers: {
    logOutBtnPressed: (state) => {
      state.login = { token: "", _id: "", username: "", email: "" };
      localStorage.clear();
    },
  },
  extraReducers: {
    [LoginUser.fulfilled]: (state, action) => {
      const token = action.payload?.token;
      const decodedToken = jwt_decode(token);
      const loginUserData = {
        token: `Barear ${token}`,
        username: decodedToken.username,
        _id: decodedToken._id,
        email: decodedToken.email,
      };
      localStorage.setItem("neoNotelogin", JSON.stringify(loginUserData));
      state.login = loginUserData;
      state.status = "fulfilled";
    },
    [LoginUser.rejected]: (state, action) => {
      console.log(action.payload);
      state.status = "rejected";
    },
    [SignUpUser.fulfilled]: (state, action) => {
      state.signup = true;
    },
    [SignUpUser.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const { logOutBtnPressed } = AuthSlice.actions;

export default AuthSlice.reducer;
