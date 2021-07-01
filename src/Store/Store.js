import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../Slice/AuthSlice";
import noteReducer from "../Slice/NotesSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
