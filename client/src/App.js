import React from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider } from "notistack";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Lists from "./components/PublicLists/Lists";
import PrivateLists from "./components/PrivateLists/Lists";
import Bookmarks from "./components/Bookmarks/Lists";

import AppBar from "./components/AppBar";
import AddFabBtn from "./components/AddFabBtn";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile/Profile";

import { AuthProvider } from "./components/shared/Auth";
import ProtectedRoute from "./components/shared/ProtectedRoute";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#262729",
      // main: '#222222'
    },
    secondary: {
      // main: '#222222'
      // main: '#262729'
      main: "#2979ff",
    },
    Fab: {
      main: "#2196f3",
    },
  },
});

export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <AuthProvider>
            <CssBaseline />
            <AppBar />
            <Switch>
              <Route path="/" component={Lists} exact />
              <ProtectedRoute path="/lists" component={PrivateLists} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/register" component={Register} exact />
              <ProtectedRoute path="/profile" component={Profile} exact />
              <ProtectedRoute path="/bookmarks" component={Bookmarks} exact />
            </Switch>
            <AddFabBtn />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </SnackbarProvider>
  );
}
