import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { register } from '../utils/api';
import { useAuth } from "./shared/Auth";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  container: {
    margin: "50px 40px",
    display: "flex",
    justifyContent: "flex-end",
    justifyItems: "center",
    // textAlign: 'center'
  },
  input: {
    color: "#CCC",
    padding: 3,
    maxWidth: 250,
    width: "100%",
  },
  label: {
    color: "#CCC",
    padding: 3,
  },
  btn: {
    display: "block",
    marginTop: "30px",
    backgroundColor: "#1C54B2",
    width: 100,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#2b5384",
    },
  },
  instruction: {
    color: "#CCC",
    textTransform: "capitalize",
  },
  link: {
    color: "#1C54B2",
    fontWeight: "bold",
  },
}));

const Register = () => {
  const classes = useStyles();

  const { isAuthenticated, setIsAuthenticated, user, setUser } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if(isAuthenticated) {
        history.push("/");
      }
  }, [history, isAuthenticated, user])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert("name, email and password are required");
    }

    const data = { firstName, lastName, email, password };
    const res = await register(data);

    const user = res && res.newUser ? res.newUser : null;
    const token = res && res.token ? res.token : null;

    localStorage.setItem("listyUser", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));

    setUser(user);
    setIsAuthenticated(true);

    history.push("/");
  };

  return (
    <div className={classes.container}>
      <form>
        <TextField
          autoComplete="off"
          type="text"
          required
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
          autoComplete="off"
          type="text"
          required
          fullWidth
          color="secondary"
          id="lastname"
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
          autoComplete="off"
          type="email"
          required
          fullWidth
          color="secondary"
          id="email"
          label="Email"
          value={email}
          InputProps={{
            className: classes.input,
          }}
          InputLabelProps={{
            // shrink: true,
            className: classes.label,
          }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormControl>
          <InputLabel
            required={true}
            color="secondary"
            className={classes.label}
            htmlFor="password"
          >
            Password
          </InputLabel>
          <Input
            color="secondary"
            className={classes.input}
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Register
        </Button>

        <p className={classes.instruction}>
          already have an account?{" "}
          <Link className={classes.link} to="/login">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
