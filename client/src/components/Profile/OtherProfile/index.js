import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

import Header from "./Header";
import Lists from "../../PrivateLists/Lists";

import { getListsForUser } from "../../../utils/api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  spinner: {
    width: "250px",
    height: "250px",
    color: "#EEE",
  },
  err: {
    textAlign: "center",
    fontSize: 25,
    color: "#e83535",
    margin: "25px auto",
    textTransform: "capitalize",
  },
}));

const OtherProfile = ({ handle, user, loading }) => {
  const classes = useStyles();

  const [lists, setLists] = useState(null);
  const [loadingLists, setLoadingLists] = useState(null);

  useEffect(() => {
    (async () => {
      setLoadingLists(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const result = await getListsForUser(handle, token);
      setLists(result);
      setLoadingLists(false);
    })();
  }, []);

  return loading ? (
    <CircularProgress className={classes.spinner} />
  ) : user ? (
    <div className={classes.root}>
      <Header user={user} />

      <Divider variant="middle" />

      {loadingLists ? (
        <CircularProgress className={classes.spinner} />
      ) : (
        <Lists otherLists={lists} currentUser={false}/>
      )}
    </div>
  ) : (
    <div className={classes.err}>invalid request !!!</div>
  );
};

export default OtherProfile;
