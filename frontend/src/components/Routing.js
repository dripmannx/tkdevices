import React, { Component, useState, useMemo } from "react";
import Table from "./Table/Table";
import HandoutTable from "./Table/Handout";
import DeleteTable from "./Table/DeleteTable";
import PrivateRoute from "../utils/PrivateRoute";
import NoUserRoute from "../utils/NoUserRoute";/*
import PublicRoute from "../utils/PublicRoute"; */
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
import AuthContext,{AuthProvider} from "../utils/AuthContext";
import Landing,{HomePage} from "./Landing";
const Routing = () => {
  

  return (
    <Router>
      <AuthProvider>
        <Navbar /> 
        <Route exact path="/" component={HomePage}/>
        <NoUserRoute path="/login" exact component={Login} />
        <PrivateRoute path="/defect" component={DeleteTable} /> 
        <PrivateRoute path="/devices" exact component={Table} />
        <PrivateRoute path="/logout" component={Logout} />
        <PrivateRoute path="/handout" component={HandoutTable} />
        <PrivateRoute path="/devices/:serialnumber" component={DeviceInDetail}/>
      </AuthProvider>
    </Router>
  );
};
export default Routing;
