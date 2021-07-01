import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import { API_URL } from "./API";

// for getting all notes of login user

export const GetAllNotes = createAsyncThunk("note/GetAllNotes", async () => {
  const res = await axios.get(`${API_URL}/note`);
  return res.data;
});

export const AddBtnPressed = createAsyncThunk(
  "note/AddBtnPressed",
  async (
    { title, note, tag, color },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${API_URL}/note`, {
        title,
        note,
        tag,
        color,
      });
      if (data.success) {
        return fulfillWithValue(data.newNote);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const DeleteBtnPressed = createAsyncThunk(
  "note/DeleteBtnPressed",
  async ({ noteId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/note`, { noteId: noteId });

      if (data.success) {
        return fulfillWithValue(data.note);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// update note
export const UpdateBtnPressed = createAsyncThunk(
  "note/UpdateBtnPressed",
  async (
    { noteId, title, note, tag, color },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${API_URL}/note/editnote/${noteId}`, {
        title,
        note,
        tag,
        color,
      });
      if (data.success) {
        return fulfillWithValue(data.note);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// main Slice
export const NoteSlice = createSlice({
  name: "Note",
  initialState: {
    notes: [],
    status: "",
  },
  reducers: {},
  extraReducers: {
    [GetAllNotes.fulfilled]: (state, action) => {
      state.notes = action.payload.notes;
      state.status = "fulfilled";
    },
    [GetAllNotes.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [AddBtnPressed.fulfilled]: (state, action) => {
      state.notes.unshift(action.payload);
    },
    [AddBtnPressed.rejected]: (state, action) => {
      state.status = "rejected";
    },
    // for delete
    [DeleteBtnPressed.fulfilled]: (state, action) => {
      state.notes = state.notes.filter((note) => {
        return note._id != action.payload._id;
      });
    },
    [DeleteBtnPressed.rejected]: (state, action) => {
      state.status = "rejected";
    },
    // for update the note
    [UpdateBtnPressed.fulfilled]: (state, action) => {
      state.notes = state.notes.map((note) =>
        note._id === action.payload._id ? action.payload : note
      );
    },
    [UpdateBtnPressed.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default NoteSlice.reducer;
