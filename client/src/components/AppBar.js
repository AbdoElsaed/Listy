import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { Link } from "react-router-dom";

import UserMenu from "./UserMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    width: 100,
  },
  logoContainer: {
    flexGrow: 1,
    marginLeft: 5,
  },
  bar: {
    // backgroundColor: theme.palette.action.hover,
    backgroundColor: theme.palette.background.default,
  },
  menu: {},
}));

const MainBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <div className={classes.logoContainer}>
            <Link to="/">
              <img className={classes.logo} alt="logo" src="/logo.png"></img>
            </Link>
          </div>
          <UserMenu className={classes.menu} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainBar;
