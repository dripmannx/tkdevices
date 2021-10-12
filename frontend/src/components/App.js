import React, { Component } from "react";
import { render } from "react-dom";
import Routing from "./Routing";
import Navbar from "./Navbar"
import Table from "./Table";
import DeleteTable from "./DeleteTable";
import ForwardLogIn from "./APIRequests";
const App = () => {
  ForwardLogIn();
  return (
    <>
      <Navbar/>
      <Routing />
    </>
  );
};
export default App;
const appDiv = document.getElementById("app");
render(<App />, appDiv);
