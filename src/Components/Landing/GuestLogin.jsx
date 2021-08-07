import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../Slice/AuthSlice";
import "./landing.css";

export const GuestLogin = () => {
  const [username, setUsername] = useState("tester");
  const [password, setPassword] = useState("tester");
  const dispatch = useDispatch();

  const loginHandler = async () => {
    await dispatch(LoginUser({ username, password }));
  };
  return (
    <div className="guest-login-div">
      <button
        onClick={() => {
          loginHandler();
        }}
      >
        {" "}
        Login as Guest
      </button>
    </div>
  );
};
