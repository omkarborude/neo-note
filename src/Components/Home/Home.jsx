import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddBtnPressed, DeleteBtnPressed } from "../../Slice/NotesSlice";
import { getFilteredNotes } from "../../utils";
import "./home.css";
import { NoteCard } from "./NoteCard";
export const Home = () => {
  const dispatch = useDispatch();
  const filterTags = ["Note", "To-Do", "Reminder"];
  const [selectedTag, setselectedTag] = useState("Note");
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const colors = ["#fff6cc", "#ffc8fb", "#d3ffd5", "#ffffff"];

  const [showTakeNoteDiv, setshowTakeNoteDiv] = useState(false);
  const [title, settitle] = useState("");
  const [notdesc, setnotedesc] = useState("");

  const notes = useSelector((state) => state.note.notes);

  // for dropdown tags
  const [dropDownValue, setdropDownValue] = useState("Note");
  const handleDropDownChange = (e) => setdropDownValue(e.target.value);

  const CancelHandler = () => {
    setshowTakeNoteDiv(false);
    settitle("");
    setnotedesc("");
    setCurrentColor("#ffffff");
    setdropDownValue("Note");
  };

  const AddClickHandler = async () => {
    await dispatch(
      AddBtnPressed({
        title: title,
        note: notdesc,
        tag: dropDownValue,
        color: currentColor,
      })
    );
    CancelHandler();
  };

  const filterNotes = getFilteredNotes(notes, selectedTag);

  return (
    <div className="home-main-div">
      {/* take note top div */}
      <div
        className="note-taking-div"
        style={{ backgroundColor: `${currentColor}` }}
      >
        <input
          placeholder="Title"
          className="title-input"
          onFocus={() => setshowTakeNoteDiv(true)}
          value={title}
          onChange={(e) => settitle(e.target.value)}
          style={{ backgroundColor: `${currentColor}` }}
        />
        <div
          className="note-taking-focused-view-div"
          style={{ display: showTakeNoteDiv ? "block" : "none" }}
        >
          <div className="note-desc-div">
            <textarea
              maxLength="120"
              placeholder="Take a Note..."
              className="take-note-input"
              value={notdesc}
              onChange={(e) => setnotedesc(e.target.value)}
              style={{ backgroundColor: `${currentColor}` }}
            />
          </div>
          <div className="color-tag-save-option">
            <div className="color-options-div">
              {colors.map((colorItem) => (
                <button
                  className="color-option-btn"
                  onClick={() => setCurrentColor(colorItem)}
                  style={{ backgroundColor: `${colorItem}` }}
                ></button>
              ))}
            </div>
            <div className="tag-options-div">
              <select
                value={dropDownValue}
                onChange={handleDropDownChange}
                className="tag-option-tag-select"
              >
                <option value="Note">Note</option>
                <option value="To-Do">To-Do</option>
                <option value="Reminder">Reminder</option>
              </select>
            </div>

            {/* btn div */}
            <div className="take-note-btns">
              <button
                className="btn-cancel-take-note-card"
                onClick={() => CancelHandler()}
              >
                Cancel
              </button>
              <button
                onClick={() => AddClickHandler()}
                className="btn-add-take-note-card"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* note taking dv end here */}
      <div className="filter-tag-opton-div">
        {filterTags.map((tag) => {
          return (
            <button
              onClick={() => setselectedTag(tag)}
              className={tag === selectedTag ? "btn-tag-active" : "btn-tag"}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="show-notes-home-main-div">
        {filterNotes.map((note) => (
          <NoteCard NoteItem={note} key={note._id} />
        ))}
      </div>
    </div>
  );
};
