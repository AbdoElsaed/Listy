import { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import { Link, useHistory } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import BookmarksIcon from '@material-ui/icons/Bookmarks';

import { makeStyles } from "@material-ui/core/styles";

import { withStyles } from "@material-ui/core/styles";

import { useAuth } from "./shared/Auth";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #444",
    // padding: 2,
    boxShadow: "2px 2px 2px #444",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.background.default,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: "#CCC",
      },
    },
    margin: 0,
    width: "100%",
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  container: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "40px",
  },
  link: {
    color: "#EEE",
    textDecoration: "none",
  },
  icon: {
    minWidth: "45px",
  },
}));

export default function UserMenu() {
  const classes = useStyles();

  const {
    isAuthenticated,
    user,
    logout,
    avatar,
  } = useAuth();

  console.log("user", user);

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <ListItem style={{ listStyle: "none", fontSize: "4px" }}>
          <ListItemAvatar>
            <Avatar alt="user avatar" src={avatar ? avatar : "/anon.png"} />
          </ListItemAvatar>
          <ListItemText
            primary={isAuthenticated ? `${user.firstName}` : "anonymous"}
          />
          <IconButton
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            // color="white"
            onClick={handleClick}
          >
            <ExpandMoreIcon fontSize="inherit" />
          </IconButton>
        </ListItem>
      </div>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isAuthenticated ? (
          <div>
            <Link className={classes.link} to="/profile">
              <StyledMenuItem onClick={handleClose}>
                <ListItemIcon className={classes.icon}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </StyledMenuItem>
            </Link>
            <Link className={classes.link} to="/bookmarks">
              <StyledMenuItem onClick={handleClose}>
                <ListItemIcon className={classes.icon}>
                  <BookmarksIcon />
                </ListItemIcon>
                <ListItemText primary="Bookmarks" />
              </StyledMenuItem>
            </Link>
            {/* <StyledMenuItem onClick={handleClose}>
              <ListItemIcon className={classes.icon}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </StyledMenuItem> */}
            <StyledMenuItem onClick={handleLogout}>
              <ListItemIcon className={classes.icon}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </StyledMenuItem>
          </div>
        ) : (
          <div>
            <Link className={classes.link} to="/login">
              <StyledMenuItem onClick={handleLogin}>
                <ListItemIcon className={classes.icon}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Log In" />
              </StyledMenuItem>
            </Link>
            <Link className={classes.link} to="/register">
              <StyledMenuItem onClick={handleLogin}>
                <ListItemIcon className={classes.icon}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </StyledMenuItem>
            </Link>
          </div>
        )}
      </StyledMenu>
    </div>
  );
}
