//Beim component reload checken ob user eingeloggt

import "./../../static/css/Navbar.css";
import React, { useEffect, useState } from "react";
import getCurrentUser from "./APIRequests";

const Navbar = () => {
 const [isActive, setActive] = useState(false);
 const handleOnClick = () => {

   setActive(!isActive);
   console.log(isActive)
 };
  const url = "/api/current_user";
  const [username,setUsername] = useState([])
  const [loginState, setLoginState] = useState(true);
  useEffect(() => { 
    if (localStorage.getItem("token") == null) {
    setLoginState(false);
  }else { setLoginState(true); }}, []);

  return (
    <div>
      <nav className="navbar">
        <div className="brand-title">ENERCON</div>
        <a href="#" className="toggle-button" onClick={()=>handleOnClick()}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className={isActive ? "navbar-links active" : "navbar-links"}>
          <ul>
            {loginState === true && (
              <>
                <li>
                  <a href="/devices">Geräte</a>
                </li>
                <li>
                  <a href="/defect">Defekte</a>
                </li>
                <li>
                  <a href="/handout">Aufträge</a>
                </li>
                
              </>
            )}
            <li>
              <a href={loginState ? "/logout" : "/"}>
                {loginState ? "Logout" : "Login"}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;