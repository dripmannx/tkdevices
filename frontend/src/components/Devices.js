import React, { Component} from 'react';
import {render} from "react-dom";
import DataTables from "./Table"
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from'react-router-dom';
export default class DevicesPage extends Component {
    constructor(props){
        super(props);

    }
    render(){
        return (
            <Router>
                    <Switch>
                        <Route path="/" component={DataTables}/>

                        <Route path="/add" component={DataTables}/>
                </Switch>
            </Router>
          
        );
    }
}
