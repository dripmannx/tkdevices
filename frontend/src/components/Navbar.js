//Beim component reload checken ob user eingeloggt

import "./../../static/css/Navbar.css";
import React, { useEffect, useState } from "react";
import checkLogIn from "./APIRequests";

const Navbar = () => {
  const [loginState, setLoginState] = useState(true);
  useEffect(async () => {checkLogIn(loginState, setLoginState), []});
   
  console.log(loginState)
  return (
    <div>
      <nav className="navbar">
        <div className="brand-title">ENERCON</div>
        <a href="#" className="toggle-button">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className="navbar-links">
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
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
