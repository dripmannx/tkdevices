import React,{useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./AuthContext"
const PrivateRoute = ({ component: Component, ...rest }) => {
  const {user} = useContext(AuthContext);
  
  //const user = true
  return (
    //Check if user is logged in, otherwise redirect to login page
    <Route
      {...rest}
      render={(props) =>
          user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
