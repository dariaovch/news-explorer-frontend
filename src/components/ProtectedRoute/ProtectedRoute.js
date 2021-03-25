import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {

  React.useEffect(() => {
    const token = localStorage.getItem('token');

    if(!props.loggedIn && !token) {
      props.onUnauthorized();
    }
  }, []);

  return (
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
)}

export default ProtectedRoute;
