import React, { Component,useContext } from "react";
import { render } from "react-dom";
import Routing from "./Routing";
import Navbar from "./Navbar"
import ForwardLogIn from "./APIRequests";
import UserContext from "./User/UserContext";

const App = () => {
  ForwardLogIn();
  
  
  return (
    <>
      
      <Routing />
    </>
  );
};
export default App;
const appDiv = document.getElementById("app");
render(<App />, appDiv);
