import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackBar({ text, open, setOpen, severity }) {
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("center");

  const handleSuccess = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      style={{ height: "100%", width: "100%", position: 'absolute' }}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={600000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;
