import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginTop: "30px",
  },
  name: {
    color: "#DDD",
    textTransform: "capitalize",
    marginTop: "5px",
    marginBottom: "5px",
  },
  button: {
    // margin: theme.spacing(1),
    marginBottom: "10px",
    marginTop: "0px",
    backgroundColor: '#334eaf',
    '&:hover': {
      backgroundColor: '#22398e'
    },
    padding: '5px 15px',
    borderRadius: '15px',
    fontWeight: 'bold',
    color: '#222'
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
  },
}));

const Header = ({ user }) => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <img
          className={classes.avatar}
          alt="avatar"
          src={user && user.avatar ? user.avatar.location : "/anon.png"}
        ></img>
        <h3 className={classes.name}>{user && user.name}</h3>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          onClick={() => {}}
        >
          Follow
        </Button>
      </div>

    </div>
  );
};

export default Header;
