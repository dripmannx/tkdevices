import React, { Component } from "react";
import { render } from "react-dom";
import DevicesPage from "./Devices";
import Fetch from "./fetch";
import Table from "./Table";
import DeleteTable from "./DeleteTable";
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    /*
    var pwd = prompt("Passwort:");
    while (pwd != "ENERCON_01") {
      pwd = prompt("Passwort:");
    }
    */
    return <DevicesPage/>;
  }
}
const appDiv = document.getElementById("app");
render(<App />, appDiv);
