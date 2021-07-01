import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateBtnPressed } from "../../Slice/NotesSlice";
import "./editnote.css";

export const EditNote = () => {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  let note = useSelector((state) => state.note.notes).find(
    (item) => item._id === noteId
  );
  const navigate = useNavigate();
  const [dropDownValue, setdropDownValue] = useState("Note");
  const handleDropDownChange = (e) => setdropDownValue(e.target.value);

  const colors = ["#fff6cc", "#ffc8fb", "#d3ffd5", "#ffffff"];
  const [currentColor, setCurrentColor] = useState(note?.color);
  const [title, settitle] = useState("");
  const [notdesc, setnotedesc] = useState("");

  const CancelHandler = () => {
    setnotedesc("");
    navigate("/");
  };
  const updateclickHandler = async () => {
    dispatch(
      await UpdateBtnPressed({
        noteId: noteId,
        title: note.title,
        note: notdesc,
        tag: dropDownValue,
        color: currentColor,
      })
    );
    navigate("/");
  };
  return (
    <div>
      <div
        className="note-taking-div"
        style={{
          backgroundColor: `${currentColor ? currentColor : note?.color}`,
        }}
      >
        <input
          placeholder="Title"
          className="title-input"
          value={note?.title}
          style={{
            backgroundColor: `${currentColor ? currentColor : note?.color}`,
          }}
        />
        <div className="note-taking-focused-view-div">
          <div className="note-desc-div">
            <textarea
              maxLength="120"
              placeholder="Update the Note..."
              className="take-note-input"
              onChange={(e) => setnotedesc(e.target.value)}
              style={{
                backgroundColor: `${currentColor ? currentColor : note?.color}`,
              }}
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
                onClick={() => updateclickHandler()}
                className="btn-add-take-note-card"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
