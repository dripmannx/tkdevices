import React, { Component,useContext } from "react";
import { render } from "react-dom";
import Routing from "./Routing";
import ForwardLogIn from "./APIRequests";

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
