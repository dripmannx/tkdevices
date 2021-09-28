import React, { Component } from "react";
import { render } from "react-dom";
import Routing from "./Routing";

import Table from "./Table";
import DeleteTable from "./DeleteTable";
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    
    return <Routing/>;
  }
}
const appDiv = document.getElementById("app");
render(<App />, appDiv);
