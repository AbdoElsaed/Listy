import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import CircularProgress from '@material-ui/core/CircularProgress';

import { addList } from "../../utils/api";
import { useAuth } from "../shared/Auth";

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
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10,
    // height: 400,
    [theme.breakpoints.down("sm")]: {
      width: 300,
    },
    // maxWidth: 400,
    // maxHeight:400,
    outline: "none",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
      [theme.breakpoints.down("sm")]: {
        width: "30ch",
      },
      // backgroundColor: theme.palette.primary.dark,
      padding: 3,
      borderRadius: 2,
      display: "block",
    },
  },
  input: {
    color: "#CCC",
    padding: 3,
  },
  label: {
    color: "#CCC",
    padding: 3,
  },
  btn: {
    backgroundColor: "#1C54B2",
    width: 100,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#2b5384",
    },
  },
  switch: {
    backgroundColor: "#282828",
    width: "15ch",
  },
  err: {
    backgroundColor: "#282828",
    color: "red",
  },
}));

const AddList = ({ open, setOpen, handleOpen, handleClose }) => {
  const classes = useStyles();
  const [isPublic, setIsPublic] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [showTitleErr, setShowTitleErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { refreshLists } = useAuth();

  const handleSwitchChange = () => {
    setIsPublic(!isPublic);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleTags = (e) => {
    setTags(e.target.value);
  };

  const resetState = () => {
    setIsPublic(false);
    setTitle("");
    setDescription("");
    setTags("");
    setShowTitleErr(false);
  };

  const handleCloseModal = () => {
    handleClose();
    resetState();
  };

  const onSubmit = async () => {
    if (!title) {
      setShowTitleErr(true);
      setTimeout(() => {
        setShowTitleErr(false);
      }, 4000);
      return;
    }

    setLoading(true);
    setDisabled(true)

    const data = {
      title,
      description,
      tags,
      public: isPublic,
    };

    let token = JSON.parse(localStorage.getItem("token"));
    const list = await addList({ data, token });
    if (list) {
      handleCloseModal();
      setLoading(false);
      setDisabled(false)
      enqueueSnackbar("list added successfully!", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
      await refreshLists();
    }
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
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginBottom: 15, color: "#CCC" }}
            >
              Add a List
            </Typography>

            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                type="text"
                required
                fullWidth
                color="secondary"
                id="title"
                label="Title"
                value={title}
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  // shrink: true,
                  className: classes.label,
                }}
                onChange={(e) => handleTitle(e)}
              />

              <p
                className={classes.err}
                style={{ display: `${showTitleErr ? "block" : "none"}` }}
              >
                title is required
              </p>

              <TextField
                fullWidth
                color="secondary"
                id="description"
                label="Description"
                value={description}
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  // shrink: true,
                  className: classes.label,
                }}
                onChange={(e) => handleDescription(e)}
              />

              <TextField
                fullWidth
                color="secondary"
                id="tags"
                label="Tags"
                value={tags}
                placeholder="e.g. tag1, tag2, tag3"
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  shrink: true,
                  className: classes.label,
                }}
                onChange={(e) => handleTags(e)}
              />

              <FormControlLabel
                className={classes.switch}
                control={
                  <Switch
                    checked={isPublic}
                    onChange={handleSwitchChange}
                    name="public"
                    color="secondary"
                  />
                }
                label="Public"
              />

              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={onSubmit}
                disabled={disabled}
              >
                Add
              </Button>
              {loading? <CircularProgress style={{ color: '#DDD', width: '50px', height: '50px' }} /> : null}
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddList;
