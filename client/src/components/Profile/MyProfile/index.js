import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./Header";
import { Divider } from '@material-ui/core';

import Lists from "../../PrivateLists/Lists"

const useStyles = makeStyles((theme) => ({
  root: {

  }
}));

const MyProfile = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />

      <Divider variant="middle"/>

      <Lists currentUser={true}/>
    </div>
  );
};

export default MyProfile;
