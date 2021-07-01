import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteBtnPressed } from "../../Slice/NotesSlice";
import "./notecard.css";

export const NoteCard = ({ NoteItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteHandler = async () => {
    await dispatch(DeleteBtnPressed({ noteId: NoteItem._id }));
  };
  return (
    <div
      className="show-not-card"
      style={{ backgroundColor: `${NoteItem.color}` }}
    >
      <div className="note-card-title-div">
        <p>{NoteItem.title}</p>
      </div>
      <div className="note-card-desc-div">
        <p>{NoteItem.note}</p>
      </div>
      <div className="tag-edit-remove-div">
        <div className="note-card-tag-main-div">
          <div className="note-card-tag-div"> {NoteItem.tag}</div>
        </div>
        <div className="note-card-edit-trash-div">
          <div className="note-card-edit-btn-div">
            <i
              class="fas fa-pencil-alt"
              onClick={() => navigate(`/editnote/${NoteItem._id}`)}
            ></i>
          </div>
          <div className="note-card-trash-btn-div">
            <i class="fas fa-trash-alt" onClick={() => deleteHandler()}></i>
          </div>
        </div>
      </div>
    </div>
  );
};
