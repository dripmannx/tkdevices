import React, { Component, useState, useMemo } from "react";
import Table from "./Table/Table";
import HandoutTable from "./Table/Handout";
import DeleteTable from "./Table/DeleteTable";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  
} from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import DeviceInDetail from "./DeviceInDetail";
import Navbar from "./Navbar";
import UserContext from "./User/UserContext";
import Index from "./Test";

const Routing = () => {
  const [user, setUser] = useState(null);


  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <UserContext.Provider value={value}>
        <Navbar />

        <Route path="/" exact component={Login} />
        <Route path="/defect" component={DeleteTable} />
        <Route path="/devices" exact component={Table} />
        <Route path="/logout" component={Logout} />
        <Route path="/handout" component={HandoutTable} />
        <Route path="/devices/" component={DeviceInDetail} /> 
        {/* <Route path="/upload" component={fileUpload} /> */}
        <Route path="/test" component={Index} />
      </UserContext.Provider>
    </Router>
  );
};
export default Routing;
