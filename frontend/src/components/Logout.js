import React, { useState, useEffect, Fragment } from "react";
import getCurrentUser from "./APIRequests";
const Logout = () => {
  const url = "/api/current_user";
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState([]);
  document.title = `Logout`;

  useEffect(() => {
    getCurrentUser(username, setUsername, url);
  }, []);
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      window.location.replace("http://localhost:8000");
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.replace("http://localhost:8000");
  };
  /*
return (
    <div>
      <title>Logout</title>
      <h1>
        Eingeloggt als <em>{username["user"]}</em>
      </h1>
      <h1>Bist du sicher, dass du dich Ausloggen willst?</h1>
      {loading === false && (
        <form className="box" onSubmit={handleLogout}>
          <input type="submit" value="Logout" />
        </form>
      )}
    </div>
  );
*/
  return (
    <>
      <div className="wrapper">
        <form className="login" onSubmit={onSubmit}>
          <p className="title">Wirklich ausloggen?</p>
          <button input type="submit" value="Login">
            <i className="spinner"></i>
            <span className="state">Log out</span>
          </button>
        </form>
      
      </div>
    </>
  );
};

export default Logout;
