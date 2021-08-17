import React, { Component} from 'react';
import {render} from "react-dom";
import Table from "./Table";
import Fetch from "./fetch";
import DeleteTable from "./DeleteTable";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from'react-router-dom';

export default class DevicesPage extends Component {
    constructor(props){
        super(props);

    }
    render(){
        return (
          <Router>
            <Switch>
              <Route path="/" exact component={Table} />
              <Route path="/defect" component={DeleteTable} />
              <Route path="/handout" component={Fetch}></Route>
            </Switch>
          </Router>
        );
    }
}
