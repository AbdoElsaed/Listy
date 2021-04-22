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

import { login } from "../utils/api";
import { useAuth } from "./shared/Auth";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "50px 80px",
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
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

const Login = () => {
  const classes = useStyles();

  const { isAuthenticated, setIsAuthenticated, user, setUser } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [history, isAuthenticated, user]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async () => {
    if (!email || !password) {
      alert("email and password are required");
    }

    const data = { email, password };
    const res = await login(data);

    const user = res && res.user ? res.user : null;
    const token = res && res.token ? res.token : null;

    localStorage.setItem("listyUser", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));

    if (user) {
      setUser(user);
      setIsAuthenticated(true);
    }

    history.push("/");
  };

  return (
    <div className={classes.container}>
      <form>
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
          Log In
        </Button>

        <p className={classes.instruction}>
          your first time here?{" "}
          <Link className={classes.link} to="/register">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
