import React, { Component} from 'react';
import {render} from "react-dom";
import Table from "./Table";
import Fetch from "./fetch";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from'react-router-dom';

export default class DevicesPage extends Component {
    constructor(props){
        super(props);

    }
    render(){
        return (
          <Router>
            <Switch>
              <Route path="/" component={Table} />
              <Route path="/fetch" component={Table} />
            </Switch>
          </Router>
        );
    }
}
