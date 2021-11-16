import React, { useState, useEffect, useContext } from "react";
import Router,{Link,useHistory} from "react-router-dom";
import UserContext from "./User/UserContext";
import Table from "./Table/Table";
import getCurrentUser, { login } from "./APIRequests";
const Login = () => {
  const urlUser = "/api/current_user";
  document.title = `Login`;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      history.push("/devices");
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = async (e) => {
    setErrors(false);
    e.preventDefault();

    const credentials = {
      username: username,
      password: password,
    };
    const test = await login(credentials);
    if (test.ok) {
      console.log("ok");
      const responseData = await test.json();
      setUser(responseData);
      localStorage.setItem("user", JSON.stringify(responseData));
      localStorage.setItem("token", responseData.token );
      console.log(user);
      history.push("/devices")
    } else {
     
      setPassword("");
      localStorage.clear();
      setErrors(true);
    }

    /* 
    fetch("http://localhost:8000/api/api-token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.clear();
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          setUser(getCurrentUser(user, setUser, urlUser));
          console.log(user);
          //window.location.replace("http://localhost:8000/devices");
        } else {
          setIsLoggedIn(false);
          setUsername("");
          setPassword("");
          localStorage.clear();
          setErrors(true);
        }
      }); */
  };

  return (
    <>
      <pre className="text-white">{JSON.stringify(user, null, 2)}</pre>;
      {user && <li><Link to="/logout">Home</Link></li>}
      {loading === false && (
        <div className="wrapper">
          <form className="login" onSubmit={onSubmit}>
            <p className="title">Log in</p>
            <input
              type="text"
              placeholder="Username"
              autoFocus
              name="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className="fa fa-user"></i>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fa fa-key"></i>

            <button input type="submit" value="Login">
              <i className="spinner"></i>
              <span className="state">Log in</span>
            </button>
            {errors === true && <h1 className="text-red-500">Fehler</h1>}
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
