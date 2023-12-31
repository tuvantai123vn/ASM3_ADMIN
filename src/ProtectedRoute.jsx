import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({ component: Component, roles, role, ...rest }) => {
  return(
  <Route
    {...rest}
    render={(props) =>
      roles.includes(role) ? <Component {...props} role={role} />  : <Redirect to="/login" />
    }
  />
)};

export default ProtectedRoute;
