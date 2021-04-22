import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import AddList from "./modals/AddList";
import AddItem from "./modals/AddItem";

import { useAuth } from "./shared/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 380,
    transform: "translateZ(0px)",
    flexGrow: 1,
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    // zIndex: 10000
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  container: {
    // position: 'fixed'
  },
}));

const actions = [
  { icon: <PlaylistPlayIcon />, name: "List" },
  { icon: <LibraryAddIcon />, name: "Item" },
];

export default function AddFabBtn() {
  const classes = useStyles();

  const { isAuthenticated } = useAuth();

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openListModal, setOpenListModal] = useState(false);
  const [openItemModal, setOpenItemModal] = useState(false);

  const handleOpenListModal = () => {
    setOpenListModal(true);
  };

  const handleCloseListModal = () => {
    setOpenListModal(false);
  };

  const handleOpenItemModal = () => {
    setOpenItemModal(true);
  };

  const handleCloseItemModal = () => {
    setOpenItemModal(false);
  };

  // const handleVisibility = () => {
  //   setHidden((prevHidden) => !prevHidden);
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (name) => {
    setOpen(false);
    if (name === "List") {
      handleOpenListModal();
    } else if (name === "Item") {
      handleOpenItemModal();
    }
  };

  return isAuthenticated ? (
    <div className={classes.root}>
      {/* <Button onClick={handleVisibility}>Toggle Speed Dial</Button> */}
      <div className={classes.container}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          className={classes.speedDial}
          // hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          FabProps={{ color: "secondary", position: "fixed" }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => handleClose(action.name)}
            />
          ))}
        </SpeedDial>
      </div>

      <AddList
        open={openListModal}
        setOpen={setOpenListModal}
        handleOpen={handleOpenListModal}
        handleClose={handleCloseListModal}
      />
      <AddItem
        open={openItemModal}
        setOpen={setOpenItemModal}
        handleOpen={handleOpenItemModal}
        handleClose={handleCloseItemModal}
      />
    </div>
  ) : null;
}
