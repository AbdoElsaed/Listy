import React, { useState } from "react";

import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

import { useAuth } from "../shared/Auth";
import AvatarEditor from "../modals/AvatarEditor";

import { deleteAvatar } from "../../utils/api";

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
  menu: {
    marginTop: 38,
    marginLeft: 10,
  },
}));

const AvatarEditorBtn = () => {
  const classes = useStyles();
  const { avatar, setAvatar } = useAuth();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpen(true);
    handleCloseMenu();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeAvatar = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    const user = await deleteAvatar(token);
    console.log('userrrr after remove', user);
    if(user && !user.avatar) {
      handleCloseMenu();
      setAvatar(null);
      enqueueSnackbar("avatar deleted successfully!", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    }
  };

  return (
    <div>
      <div className={classes.avatarContainer}>
        <CameraAltIcon
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={avatar ? handleClick : handleOpen}
          color="primary"
          className={classes.avatarEditIcon}
        ></CameraAltIcon>
        <Menu
          className={classes.menu}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleOpen}>edit avatar</MenuItem>
          <MenuItem onClick={removeAvatar}>remove avatar</MenuItem>
        </Menu>
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
