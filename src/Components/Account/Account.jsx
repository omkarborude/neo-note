import { useDispatch, useSelector } from "react-redux";
import { logOutBtnPressed } from "../../Slice/AuthSlice";
import "./account.css";

export const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login);
  console.log(user);
  return (
    <div className="account-card-div">
      <h2 className="account-username-tag">
        Hi , <span>{user.username}</span>
      </h2>
      <div className="account-card-username">
        <p>User Name :-</p>
        <span>{user.username}</span>
      </div>
      <div className="account-card-email">
        <p>Email :-</p>
        <span>{user.email}</span>
      </div>
      <div className="account-loguot-btn-div">
        <button
          className="btn-logout"
          onClick={() => dispatch(logOutBtnPressed())}
        >
          Log Out <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  );
};
