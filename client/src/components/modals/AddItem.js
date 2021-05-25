import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { FormControl } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";

import { Typography } from "@material-ui/core";

import { getMyLists } from "../../utils/api"

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import { addItem } from "../../utils/api"
import { useAuth } from "../shared/Auth";


const filter = createFilterOptions();

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
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
    // width: 600,
    // maxWidth: 300,
    outline: "none",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      marginTop: theme.spacing(3),
      width: "45ch",
      [theme.breakpoints.down('sm')]: {
        width: "30ch"
      },
      //   backgroundColor: theme.palette.primary.dark,
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

const AddItem = ({ open, setOpen, handleOpen, handleClose }) => {
  const classes = useStyles();
  const [link, setLink] = useState("");
  const [list, setList] = useState(null);
  const [tags, setTags] = useState("");
  const [showTitleErr, setShowTitleErr] = useState(false);
  const [type, setType] = useState("video");
  const [listsTitles, setListsTitles] = useState([]);

  const { myLists, refreshLists } = useAuth();

  useEffect(() => {
    (async () => {

      const titles = myLists.map(list => ({ title: list.title }));
      setListsTitles(titles);

    })()
  }, [myLists])


  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleLink = (e) => {
    setLink(e.target.value);
  };

  const handleTags = (e) => {
    setTags(e.target.value);
  };

  const resetState = () => {
    setLink("");
    setList(null);
    setTags("");
    setType("video");
    setShowTitleErr(false);
  };

  const handleCloseModal = () => {
    handleClose();
    resetState();
  };

  const onSubmit = async () => {
    if (!link) {
      setShowTitleErr(true);
      setTimeout(() => {
        setShowTitleErr(false);
      }, 4000);
      return;
    }

    const data = {
      link,
      list: list.title,
      tags,
      type,
    };
    
    let token = JSON.parse(localStorage.getItem("token"));
    const item = await addItem({ data, token })
    if(item) {
      handleCloseModal();
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
              Add item to a list
            </Typography>

            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                required
                fullWidth
                color="secondary"
                id="standard-basic"
                label="Link"
                value={link}
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  // shrink: true,
                  className: classes.label,
                }}
                onChange={(e) => handleLink(e)}
              />

              <p
                className={classes.err}
                style={{ display: `${showTitleErr ? "block" : "none"}` }}
              >
                link is required
              </p>

              <Autocomplete
                value={list}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setList({
                      title: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setList({
                      title: newValue.inputValue,
                    });
                  } else {
                    setList(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  // Suggest the creation of a new value
                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue,
                      title: `Add "${params.inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={listsTitles}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.title;
                }}
                renderOption={(option) => option.title}
                // style={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="List"
                    // variant="outlined"
                    color="secondary"
                  />
                )}
              />

              <TextField
                fullWidth
                color="secondary"
                id="standard-basic"
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

              <FormControl component="fieldset">
                <FormLabel style={{ color: "#CCC" }} component="legend">
                  Type
                </FormLabel>
                <RadioGroup
                  style={{ display: "inline" }}
                  aria-label="type"
                  name="type"
                  value={type}
                  onChange={handleType}
                >
                  <FormControlLabel
                    value="video"
                    control={<Radio />}
                    label="Video"
                  />
                  <FormControlLabel
                    value="article"
                    control={<Radio />}
                    label="Article"
                  />
                </RadioGroup>
              </FormControl>

              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={onSubmit}
              >
                Add
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddItem;
