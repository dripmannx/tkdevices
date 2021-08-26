import React, { Component} from 'react';
import {render} from "react-dom";
import Table from "./Table";
import HandoutTable from "./Handout";
import DeleteTable from "./DeleteTable";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from'react-router-dom';
import Login from "./Login";
import Logout from "./Logout";
export default class DevicesPage extends Component {
    constructor(props){
        super(props);

    }
    render(){
        return (
          <Router>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/defect" component={DeleteTable} />
              <Route path="/devices" component={Table}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/handout" component={HandoutTable} />
            </Switch>
          </Router>
        );
    }
}
