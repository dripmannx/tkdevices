import React, { useState, useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      localStorage.getItem("token") !== null
    ) {
      window.location.replace("http://localhost:8000/devices");
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    fetch("http://localhost:8000/api/api-token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
       
        if (data["token"]) {
          localStorage.clear();
          localStorage.setItem("token", data["token"]);
          console.log(localStorage.getItem("token")); 
          console.log(data)
          window.location.replace("http://localhost:8000/devices");
        } else {
          setUsername("");
          setPassword("");
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div>
      {loading === false && <h1>Login</h1>}
      {errors === true && <h2>Cannot log in with provided credentials</h2>}
      {loading === false && (
        <form className="box" onSubmit={onSubmit}>
          <label className="inputTitle" htmlFor="username">
            Username:
          </label>{" "}
          <br />
          <input
            placeholder="Max Mustermann"
            name="Username"
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />{" "}
          <br />
          <label className="inputTitle" htmlFor="password">
            Password:
          </label>{" "}
          <br />
          <input
            placeholder="Musterpasswort"
            name="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />
          <input type="submit" value="Login" />
        </form>
      )}
    </div>
  );
};

export default Login;
