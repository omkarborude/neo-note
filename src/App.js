import { Landing, Navbar, Home, EditNote, Account } from "./Components/index";
import { useDispatch, useSelector } from "react-redux";
import { GetAllNotes } from "./Slice/NotesSlice";
import { Route, Routes } from "react-router";
import React, { useEffect } from "react";
import { PrivateRoute } from "./utils";
import axios from "axios";
import "./App.css";

function App() {
  const loginData = useSelector((state) => state.auth);
  const notes = useSelector((state) => state.note);
  const currentUser = loginData.login;
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      axios.defaults.headers.common["authorization"] = currentUser.token;
    } else {
      delete axios.headers.common["authorization"];
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(GetAllNotes());
  }, [currentUser]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <PrivateRoute path="/home" element={<Home />} />
        <PrivateRoute path="/editnote/:noteId" element={<EditNote />} />
        <PrivateRoute path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
