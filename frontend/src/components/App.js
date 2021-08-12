import React, { Component } from "react";
import { render } from "react-dom";
import DevicesPage from "./Devices";
import Fetch from "./fetch";
import Table from "./Table";
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <DevicesPage/>;
  }
}
const appDiv = document.getElementById("app");
render(<App />, appDiv);
