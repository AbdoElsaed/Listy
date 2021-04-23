import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

import { Typography } from "@material-ui/core";

import { EditUser } from "../../utils/api";
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
    // width: 600,
    // maxWidth: 300,
    outline: "none",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
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
    width: "100px",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#2b5384",
    },
  },
}));

const genderList = [
  "male",
  "female",
  "non-binary",
  "transgender",
  "prefer not to disclose",
];

const AddList = ({ open, setOpen, handleOpen, handleClose }) => {
  const classes = useStyles();
  const { user, setUser } = useAuth();

  const [firstName, setFirstName] = useState(user && user.firstName);
  const [lastName, setLastName] = useState(user && user.lastName);
  const [email, setEmail] = useState(user && user.email);
  const [gender, setGender] = useState(user && user.gender);

  const handleCloseModal = () => {
    handleClose();
  };

  const onSubmit = async () => {
    const data = {
      firstName,
      lastName,
      email,
      gender,
    };

    let token = JSON.parse(localStorage.getItem("token"));
    const user = await EditUser({ data, token });

    if (user) {
      handleCloseModal();
      setUser(user);
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
              Edit Your Profile
            </Typography>

            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                type="text"
                fullWidth
                color="secondary"
                id="firstName"
                label="First Name"
                value={firstName}
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  // shrink: true,
                  className: classes.label,
                }}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <TextField
                fullWidth
                color="secondary"
                id="lastName"
                label="Last Name"
                value={lastName}
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  // shrink: true,
                  className: classes.label,
                }}
                onChange={(e) => setLastName(e.target.value)}
              />

              <TextField
                fullWidth
                color="secondary"
                id="email"
                label="Email"
                value={email}
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  //   shrink: true,
                  className: classes.label,
                }}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Autocomplete
                value={gender}
                inputValue={gender}
                id="gender"
                options={genderList}
                getOptionLabel={(option) => option}
                style={{ width: 300 }}
                onChange={(_, v) => setGender(v)}
                onInputChange={(_, v) => setGender(v)}
                // defaultValue={gender}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Gender"
                    InputLabelProps={
                      {
                        //   shrink: true,
                      }
                    }
                    color="secondary"
                  />
                )}
              />

              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={onSubmit}
              >
                Edit
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddList;
