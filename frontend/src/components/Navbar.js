//Beim component reload checken ob user eingeloggt
import "../../static/css/Navbar.css";
import React, { useEffect, useState, useContext, useRef } from "react";
import AuthContext from "../utils/AuthContext";
import Router, { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  //toggle navigation button on mobile view
  const [isActive, setIsActive] = useState(false);
  const handleOnClick = () => {
    setIsActive(!isActive);
  };

const handleOnCheck = (e) => {
  isActive? setIsActive(false): setIsActive(true);
}

  return (
    <div>
      <nav className="navbar non-printable">
        <div className="brand-title gradient">
          ENERCON<Link to="/devices"></Link>
        </div>
        <a href="#" className="toggle-button" onClick={() => handleOnClick()}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className={isActive ? "navbar-links active" : "navbar-links"}>
          <ul>
            {user && (
              <>
                {user?.is_staff && (
                  <>
                    <li>
                      <Link to="/devices" onClick={() => handleOnCheck()}>
                        Geräte
                      </Link>
                    </li>

                    <li>
                      <Link to="/defect" onClick={() => handleOnCheck()}>
                        Defekt
                      </Link>
                    </li>

                    <li>
                      <Link to="/handout" onClick={() => handleOnCheck()}>
                        Aufträge
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
            <li>
              <Link
                to={user ? "/logout" : "/login"}
                onClick={() => handleOnCheck()}
              >
                {user ? "Logout" : "Login"}
              </Link>
            </li>

            {user !== null && (
              <li className="notClickable">
                <Link to="/">{user.username}</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
