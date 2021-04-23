import React, { useCallback, useRef, useState } from "react";

import CameraAltIcon from "@material-ui/icons/CameraAlt";

import { makeStyles } from "@material-ui/core/styles";

import { useAuth } from "../shared/Auth";
import AvatarEditor from "../modals/AvatarEditor";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: "25px",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  avatarEditIcon: {
    position: "absolute",
    bottom: 0,
    padding: "5px",
    backgroundColor: "#33bbff",
    borderRadius: "50%",
    cursor: "Pointer",
    fontSize: 28,
    opacity: 0.8,
  },
}));

const AvatarEditorBtn = () => {
  const classes = useStyles();
  const { isAuthenticated, avatar } = useAuth();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.avatarContainer}>
        <CameraAltIcon
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleOpen}
          color="primary"
          className={classes.avatarEditIcon}
        ></CameraAltIcon>
        <img
          className={classes.avatar}
          alt="avatar"
          src={avatar ? avatar : "/anon.png"}
        ></img>
      </div>

      <AvatarEditor
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default AvatarEditorBtn;
