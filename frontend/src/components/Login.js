import React, { useState, useEffect, useContext } from "react";
import Router, { Link, useHistory ,Redirect} from "react-router-dom";
import AuthContext, { AuthProvider } from "../utils/AuthContext";
import axiosInstance from "./axios";
const LoginPage = () => {
  document.title = `Login`;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const { loginUser,user } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    if(user){
      return history.push("/");  }
  }, []);
  return (
    <div className="wrapper">
      <form className="login" onSubmit={loginUser}>
        <p className="title">Log in</p>
        <input type="text" placeholder="Username" autoFocus name="username" />
        <i className="fa fa-user"></i>
        <input type="password" placeholder="Password" name="password" />
        <i className="fa fa-key"></i>

        <button type="submit" value="Login">
          <i className="spinner"></i>
          <span className="state">Log in</span>
        </button>
        {errors === true && <h1 className="text-red-500">Fehler</h1>}
      </form>
    </div>
  );
};
export default LoginPage;
