import { Route, Redirect, useHistory } from "react-router-dom";

import { useAuth } from "./Auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...rest} {...props} />;
        } else {
          history.push("/");
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
