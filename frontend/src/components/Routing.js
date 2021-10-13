import React, { Component} from 'react';
import Table from "./Table/Table";
import HandoutTable from "./Handout";
import DeleteTable from "./DeleteTable";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from'react-router-dom';
import Login from "./Login";
import Logout from "./Logout";
import DeviceInDetail from "./DeviceInDetail";
import Navbar from "./Navbar";
const Routing =()=> {
    

        return (
          <Router>
          
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/defect" component={DeleteTable} />
              <Route path="/devices" component={Table}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/handout" component={HandoutTable} />
              <Route path="/devices/:id" component={DeviceInDetail}/>
            </Switch>
          </Router>
        );
    
}
export default Routing