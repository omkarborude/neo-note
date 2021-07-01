import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

export const getFilteredNotes = (notesList, tagFilter) => {
  if (tagFilter !== "Note") {
    notesList = notesList.filter((note) => note.tag === tagFilter);
  }
  return notesList;
};

export const PrivateRoute = ({ path, element }) => {
  const loginUser = useSelector((state) => state.auth.login);

  return loginUser.token ? (
    <Route element={element} path={path} />
  ) : (
    <Navigate replace state={{ from: path }} to={"/"} />
  );
};
