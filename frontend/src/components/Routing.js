import React, { Component} from 'react';
import Table from "./Table";
import HandoutTable from "./Handout";
import DeleteTable from "./DeleteTable";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from'react-router-dom';
import Login from "./Login";
import Logout from "./Logout";
import DeviceInDetail from "./DeviceInDetail";
import Navbar from "./Navbar";
export default class Routing extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
          <Router>
              <Navbar/>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/defect" component={DeleteTable} />
              <Route path="/devices" exact component={Table}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/handout" component={HandoutTable} />
              <Route path="/devices/" component={DeviceInDetail}/>
            </Switch>
          </Router>
        );
    }
}
