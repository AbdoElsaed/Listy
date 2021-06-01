import React, { useRef, forwardRef, useCallback, useState } from "react";
import ReactAvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";

import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Typography } from "@material-ui/core";

import { EditAvatar } from "../../utils/api";
import { useAuth } from "../shared/Auth";
import { createFormData } from "../shared/helpers";

import Button from "@material-ui/core/Button";

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
  avatarImg: {
    display: "none",
  },
  avatarLabelBtn: {
    backgroundColor: "#DDD",
    borderRadius: "15px",
    padding: "5px 10px",
    cursor: "pointer",
    margin: "10px auto",
    display: "inline-block",
    color: "#333",
    fontWeight: "400",
    fontFamily:
      "'-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontSize: "15px",
  },
  cloudIcon: {
    fontSize: "120px",
    color: "#3399ff",
  },
  cloudIconContainer: {
    maxWidth: "270px",
    height: "270px",
    margin: "10px auto",
    border: "5px dashed #EEE",
    borderRadius: "50%",
    padding: "40px",
  },
  avatarImage: {
    maxWidth: "105%",
  },
  dragLine: {
    fontSize: "16px",
  },
  submitBtn: {
    fontWeight: "bold",
    marginTop: 10,
  },
}));

const AvatarEditor = ({ open, setOpen, handleOpen, handleClose }) => {
  const classes = useStyles();
  const { user, setUser, setAvatar } = useAuth();

  const editorRef = useRef(null);

  const [image, setImage] = useState("");
  const [allowZoomOut] = useState(false);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [scale, setScale] = useState(1.2);
  const [rotate] = useState(0);
  const [borderRadius] = useState(50);
  const [width] = useState(200);
  const [height] = useState(200);
  const [resultImg, setResultImg] = useState("");
  const [resultImgFile, setResultImgFile] = useState("");

  //   const { loading, run: runUpdateAvatar } = usePut({
  //     url: "users/avatar",
  //     successMessage: (res) => t("avatarUpdated"),
  //     onSuccess: () => {},
  //   });

  const setEditorRef = (editor) => (editorRef.current = editor);

  const handleNewImage = (e) => {
    setImage(e.target.files[0]);
  };

  const resetFormImgs = () => {
    setImage("");
    setResultImg("");
    setResultImgFile("");
  };
  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
    handleSave();
  };

  const handlePositionChange = (position) => {
    setPosition(position);
    handleSave();
  };

  const handleDrop = (dropped) => {
    setImage(dropped[0]);
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      //   const dataURL = canvasScaled.toDataURL();
      canvasScaled.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const file = new File(
          [blob],
          `cropped-${image.name}`,
          {
            type: "image/png",
            lastModified: new Date(),
          },
          1.0
        );

        setResultImg(url);
        setResultImgFile(file);
      });
    }
  };

  const onSubmit = useCallback(async () => {
    let files = {};
    // resultImg ? files['croppedImgBlob'] = resultImg : null;
    resultImgFile
      ? (files["avatar"] = resultImgFile)
      : (files["avatar"] = image);

    const formData = new FormData();

    Object.keys(files).forEach((key) => {
      formData.append(key, files[key]);
    });

    let token = JSON.parse(localStorage.getItem("token"));
    const avatar = await EditAvatar({ formData, token });
    if (avatar) {
      setAvatar(avatar);
      handleClose();
    }
  }, [image, resultImg, resultImgFile]);

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
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
              Edit Your Avatar
            </Typography>

            <div style={{ textAlign: "center" }}>
              <Dropzone
                onDrop={handleDrop}
                noClick
                noKeyboard
                style={{ width: "250px", height: "250px" }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    {image ? (
                      <div>
                        <ReactAvatarEditor
                          ref={setEditorRef}
                          scale={parseFloat(scale)}
                          width={width}
                          height={height}
                          position={position}
                          onPositionChange={handlePositionChange}
                          rotate={parseFloat(rotate)}
                          borderRadius={width / (100 / borderRadius)}
                          image={image}
                          className="editor-canvas"
                          border={50}
                          color={[255, 255, 255, 0.6]}
                          //   className={classes.avatarImage}
                        />
                        <input {...getInputProps()} />
                        <br />
                        <div>
                          <input
                            name="scale"
                            type="range"
                            onChange={handleScale}
                            min={allowZoomOut ? "0.1" : "1"}
                            max="4"
                            step="0.01"
                            defaultValue="1"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className={classes.cloudIconContainer}>
                          <CloudUploadIcon className={classes.cloudIcon} />
                          <p className={classes.dragLine}>
                            Drag and drop your image here
                          </p>
                        </div>

                        <br />

                        <h5>OR</h5>
                      </div>
                    )}

                    <br />

                    <label
                      className={classes.avatarLabelBtn}
                      htmlFor="avatarImg"
                    >
                      Upload a photo
                    </label>
                    <input
                      id="avatarImg"
                      className={classes.avatarImg}
                      name="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleNewImage}
                    />
                  </div>
                )}
              </Dropzone>
              <div>
                {image || resultImg || resultImgFile ? (
                  <Button
                    onClick={onSubmit}
                    variant="contained"
                    size="small"
                    color="secondary"
                    className={classes.submitBtn}
                  >
                    Update
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AvatarEditor;
