import "./../../static/css/Navbar.css";
/*
import { FormControlLabel } from "@material-ui/core";
import React, { Component } from "react";

function search() {
  let sn = prompt("Seriennummer eingeben");
  console.log(sn);
  if (sn.length === 12) {
    window.open("http://localhost:8000/devices/" + sn, "_blank").focus();
  }
}  
function Navabar() {
  return (
    <div>
      <div className="header"></div>
      <input type="checkbox" className="openSidebarMenu" idName="openSidebarMenu" />
      <label for="openSidebarMenu" className="sidebarIconToggle">
        <div className="spinner diagonal part-1"></div>
        <div className="spinner horizontal"></div>
        <div className="spinner diagonal part-2"></div>
      </label>

      <div id="sidebarMenu">
        <ul className="sidebarMenuInner">
          <li>
            DeviceSystem<span>Navigation</span>
          </li>
          <li>
            <i className="fa fa-fw fa-mobile"></i>
            <a href="/devices">Geräte </a>
          </li>
          <li>
            <i className="fa fa-fw fa-exclamation-triangle"></i>
            <a href="/defect">Defekte Geräte </a>
          </li>
          <li>
            <i className="fa fa-fw fa-arrow-left"></i>
            <a href="/handout">Auträge </a>
          </li>
          <li onclick="search()">
            <i className="fa fa-fw fa-info"></i>
            <a href="/devices/">Detail </a>
          </li>
          <li>
            <i className="fa fa-fw fa-user"></i>
            <a href="/admin">Admin </a>
          </li>
          <li>
            <i className="fa fa-fw fa-sign-out"></i>
            <a href="/logout">Logout </a>
          </li>
        </ul>
      </div>
     
    </div>
  );
}

export default Navabar;

*/
import React,{useEffect,useState} from "react";
import checkLogIn from "./APIRequests"

const Navbar = () => {
const [loginState,setLoginState] = useState(false);
useEffect(async ()=>{
  if (await checkLogIn()){
    setLoginState(true);
  }else{setLoginState(false)}
}, []);

  return (
    <div>
      <nav className="navbar">
        <div className="brand-title">ENERCON</div>
        <a href="#" className="toggle-button">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        {loginState === true &&
          <div className="navbar-links">
            <ul>
              <li>
                <a href="/devices">Geräte</a>
              </li>
              <li>
                <a href="/defect">Defekte</a>
              </li>
              <li>
                <a href="/handout">Aufträge</a>
              </li>
              <li>
                <a href="/logout">Logout</a>
              </li>
            </ul>
          </div>
        }
      </nav>
    </div>
  );}
export default Navbar;  