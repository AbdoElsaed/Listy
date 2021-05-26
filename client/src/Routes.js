import { CssBaseline } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import AppBar from "./components/AppBar";
import Lists from "./components/Lists";
import AddFabBtn from "./components/AddFabBtn";
import Login from "./components/Login";
import Register from "./components/Register";

import { useAuth } from "./components/shared/Auth";

const Routes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <CssBaseline />
      <AppBar />

      {isAuthenticated ? (
        <div>
          <Route>
            <Switch>
              <Route path="/" component={Lists} exact />
            </Switch>
          </Route>
        </div>
      ) : (
        <div>
          <Route>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Route>
        </div>
      )}

      <AddFabBtn />
    </div>
  );
};

export default Routes;
