import React, { Component, useState, useMemo } from "react";
import Table from "../pages/Table/Table";
import HandoutTable from "../pages/Table/Handout";
import DeleteTable from "../pages/Table/DeleteTable";
import PrivateRoute from "../utils/PrivateRoute";
import NoUserRoute from "../utils/NoUserRoute"; /*
import PublicRoute from "../utils/PublicRoute"; */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import DeviceInDetail from "../pages/DeviceInDetail";
import Navbar from "./Navbar";
import AuthContext, { AuthProvider } from "../utils/AuthContext";
import  HomePage from "../pages/Landing";
const Routing = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Route exact path="/" component={HomePage} />
        <NoUserRoute path="/login" exact component={Login} />
        <PrivateRoute path="/defect" component={DeleteTable} />
        <PrivateRoute path="/devices" exact component={Table} />
        <PrivateRoute path="/logout" component={Logout} />
        <PrivateRoute path="/handout" component={HandoutTable} />
        <PrivateRoute
          path="/devices/:serialnumber"
          component={DeviceInDetail}
        />
      </AuthProvider>
    </Router>
  );
};
export default Routing;
