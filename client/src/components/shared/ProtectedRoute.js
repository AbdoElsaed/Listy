import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

import { useAuth } from "./Auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem('token')) {
          return <Component {...rest} {...props} />;
        } else {
          history.push("/login");
          //   return (
          //     <Redirect
          //       to={{
          //         pathname: "/login",
          //         state: {
          //           from: props.location,
          //         },
          //       }}
          //     />
          //   );
        }
      }}
    />
  );
};

export default ProtectedRoute;
