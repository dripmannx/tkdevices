import React, { useState, useEffect, Fragment,useContext } from "react";
import AuthContext from "../utils/AuthContext";
import Router, {useHistory }from "react-router-dom";
const Logout = () => {
  const {user,logoutUser} = useContext(AuthContext);
  document.title = `Logout`;

 



  return (
    <>
      <div className="wrapper">
        <form className="login" onSubmit={logoutUser}>
          <p className="title">Wirklich ausloggen, {user.username}?</p>
          <button type="submit" value="Login">
            <i className="spinner"></i>
            <span className="state">Log out</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Logout;
