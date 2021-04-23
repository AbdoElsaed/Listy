import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

import EditProfile from "../modals/EditProfile";

import AvatarEditorBtn from "./AvatarEditorBtn";

import { useAuth } from "../shared/Auth";

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
  },
  avatarContainer: {
    textAlign: "center",
    position: "relative",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  },
  editIconBtn: {
    position: "absolute",
    top: "60%",
    right: "45%",
  },
  fileInput: {
    display: "none",
  },
  container: {},
}));

const Header = () => {
  const classes = useStyles();

  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <AvatarEditorBtn />
        <h3 className={classes.name}>{user?.name}</h3>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<EditIcon />}
          onClick={handleOpen}
        >
          Edit Profile
        </Button>
      </div>

      <EditProfile
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Header;
