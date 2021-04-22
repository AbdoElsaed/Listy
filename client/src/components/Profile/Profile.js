import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Header from "./Header";
import { Divider } from '@material-ui/core';

import Lists from "../PrivateLists/Lists"

const useStyles = makeStyles((theme) => ({
  root: {

  }
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />

      <Divider variant="middle"/>

      <Lists />
    </div>
  );
};

export default Profile;
