//Beim component reload checken ob user eingeloggt
import "../../static/css/Navbar.css";
import React, { useEffect, useState, useContext } from "react";
import getCurrentUser from "./APIRequests";
import useFetch from "./Hooks/Fetching/useFetch";
import getData, { useCurrentUser } from "./APIRequests";
import UserContext from "./User/UserContext";
import Router, { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  //toggle navigation button on mobile view
  const [isActive, setIsActive]= useState(false);
  const handleOnClick = () => {
    setIsActive(!isActive);
  };

  const url = "/api/current_user";
  const [username, setUsername] = useState([]);
  const [loginState, setLoginState] = useState(true);
  const [permissions, setPermissions] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
   
  useEffect(() => {
     if (location.pathname !== "/" && user===null) {
       console.log("user set");
    setUser(JSON.parse(localStorage.getItem("user")));
 }
    }, []);
 
   
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
                <li>
                  <Link to="/devices">Geräte</Link>
                </li>
                <li>
                  <Link to="/defect">Defekte</Link>
                </li>
                <li>
                  <Link to="/handout">Aufträge</Link>
                </li>
                <li>
                  <Link to="/upload">upload</Link>
                </li>
              </>
            )}
            <li>
              <Link to={user ? "/logout" : "/"}>
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
