import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Avatar } from '@material-ui/core';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  paper: {
    // backgroundColor: theme.palette.primary.dark,
    backgroundColor: "#282828",
    border: "1px solid #222",
    boxShadow: theme.shadows[2],
    // padding: theme.spacing(2, 4, 3),
    borderRadius: 10,
    // height: 400,
    [theme.breakpoints.down("sm")]: {
      width: 300,
    },
    // width: 600,
    outline: "none",
    minWidth: 300,
    minHeight: 200,
    maxHeight: 400,
    overflowY: "auto",
    paddingTop: 0,
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.primary,
    paddingTop: 0,
    marginTop: 0,
  },
  subheader: {
    fontSize: 20,
    backgroundColor: "#282828",
    textAlign: "center",
    color: "#DDD",
    padding: 0,
    margin: 0,
  },
  avatar: {
    width: 30,
    height: 30,
    margin: 7
  }
}));

const Followers = ({ open, setOpen, handleOpen, handleClose, followers }) => {
  const classes = useStyles();

  const handleCloseModal = () => {
    handleClose();
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <List className={classes.list}>
              <ListSubheader className={classes.subheader}>
                {followers.length} Followers <Divider />
              </ListSubheader>

              {followers && followers.length
                ? followers.map((follower, i) => (
                    <ListItem button key={i}>
                      <Avatar className={classes.avatar} alt="avatar" src={follower.avatar? follower.avatar.location : '/anon.png'} />
                      <ListItemText primary={follower.name} />
                    </ListItem>
                  ))
                : "no followers!"}
            </List>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Followers;
