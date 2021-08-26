import React, { Component} from 'react';
import Table from "./Table";
import HandoutTable from "./Handout";
import DeleteTable from "./DeleteTable";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from'react-router-dom';
import Login from "./Login";
import Logout from "./Logout";
import DeviceInDetail from "./DeviceInDetail";
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
              <Route path="/device/detail/" component={DeviceInDetail}/>
            </Switch>
          </Router>
        );
    }
}
