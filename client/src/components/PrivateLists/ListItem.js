import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import YouTubeIcon from "@material-ui/icons/YouTube";
import DescriptionIcon from "@material-ui/icons/Description";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import ReactPlayer from "react-player/lazy";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteItem, downloadYtVideo } from "../../utils/api";
import { useAuth } from "../shared/Auth";
import useWindowSize from "../../utils/useWindowSize";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  btn: {
    color: theme.palette.secondary,
  },
  itemIcon: {
    color: "#CCC",
  },
}));

const Item = ({ isAuthor, item }) => {
  const classes = useStyles();
  const { width } = useWindowSize();

  const [showVideo, setShowVideo] = useState(false);

  const { refreshLists } = useAuth();

  const isVideo = item.type === "video" ? true : false;
  const isArticle = item.type === "article" ? true : false;

  const isYoutubeUrl = (url) => {
    const regex =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url && url.match(regex)) {
      return true;
    }
    return false;
  };

  const toggleVideoStatus = () => {
    setShowVideo(!showVideo);
  };

  const openLink = (link) => {
    window.open(link, "_blank");
  };

  const downloadVideo = async (url) => {
    const token = JSON.parse(localStorage.getItem("token"));
    await downloadYtVideo(url, token)
  }

  const handleDeleteItem = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    // eslint-disable-next-line no-restricted-globals
    if (confirm("are u sure ?")) {
      const data = await deleteItem({ token, id: item._id });
      if (data) {
        await refreshLists();
      }
    }
  };

  return (
    <div>
      <ListItem
        style={{ display: width < 600 ? "block" : "flex" }}
        id={item._id}
      >
        <div>
          {/* <ListItemIcon>
            {isVideo ? (
              <YouTubeIcon className={classes.itemIcon} />
            ) : isArticle ? (
              <DescriptionIcon className={classes.itemIcon} />
            ) : (
              ""
            )}
          </ListItemIcon> */}
          {/* <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" /> */}
          {showVideo ? (
            <ReactPlayer
              width={250}
              height={150}
              playing={true}
              url={item.link}
            />
          ) : (
            <p>{item.title ? item.title : item.link}</p>
          )}
        </div>

        <div style={{ display: "flex" }}>
          {isVideo ? (
            <IconButton
              aria-label="delete"
              color="secondary"
              onClick={toggleVideoStatus}
            >
              {showVideo ? (
                <PauseCircleFilledIcon className={classes.btn} />
              ) : (
                <PlayCircleFilledIcon className={classes.btn} />
              )}
            </IconButton>
          ) : null}

          {isYoutubeUrl(item.link) && isVideo ? (
            <IconButton
              aria-label="download"
              color="secondary"
              onClick={() => downloadVideo(item.link)}
            >
              <GetAppIcon className={classes.btn} />
            </IconButton>
          ) : null}

          <IconButton
            aria-label="OpenInNewIcon"
            color="secondary"
            onClick={() => openLink(item.link)}
          >
            <OpenInNewIcon className={classes.btn} />
          </IconButton>

          {isAuthor ? (
            <IconButton
              aria-label="delete"
              color="secondary"
              onClick={handleDeleteItem}
            >
              <DeleteIcon className={classes.btn} />
            </IconButton>
          ) : null}
        </div>
      </ListItem>
    </div>
  );
};

export default Item;
