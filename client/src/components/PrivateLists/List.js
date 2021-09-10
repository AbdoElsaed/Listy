import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { deleteList, editList } from "../../utils/api";
import { useAuth } from "../shared/Auth";
import { isListAuthor } from "../shared/helpers";

import ListItems from "./ListItems";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(11),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  tagsContainer: {
    marginLeft: 10,
  },
  tag: {
    margin: "0px 3px",
  },
  deleteBtn: {
    // color: "#7c0c33",
    // backgroundColor: "#7c0c33",
    // backgroundColor: '#1a1a1c',
    fontWeight: "bold",
  },
}));

const List = ({ list }) => {
  const classes = useStyles();

  const [isPublic, setIsPublic] = useState(list.public);

  const { refreshLists, isAuthenticated, user } = useAuth();
  const isAuthor = isAuthenticated ? isListAuthor(list, user._id) : false;

  const handleSwitchChange = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const data = { public: !isPublic };
    setIsPublic(!isPublic);
    await editList({ token, id: list._id, data });
  };

  const handleDeleteList = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    // eslint-disable-next-line no-restricted-globals
    if (confirm("are u sure ?")) {
      const data = await deleteList({ token, id: list._id });
      if (data) {
        await refreshLists();
      }
    }
  };

  return (
    <div>
      <Accordion className={classes.root}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{list.title}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {list.description}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <ListItems isAuthor={isAuthor} items={list.items} />
        </AccordionDetails>
        {/* <Divider /> */}
        <div className={classes.tagsContainer}>
          {list.tags
            ? list.tags.map((tag) =>
                tag ? (
                  <Chip
                    className={classes.tag}
                    color="secondary"
                    variant="outlined"
                    size="small"
                    label={tag}
                  />
                ) : (
                  ""
                )
              )
            : null}
        </div>
        {isAuthor ? (
          <AccordionActions>
            <FormControlLabel
              className={classes.switch}
              control={
                <Switch
                  size="small"
                  checked={isPublic}
                  onChange={handleSwitchChange}
                  name="public"
                  color="secondary"
                />
              }
              label="Public"
            />

            <IconButton
              color="secondary"
              size="small"
              aria-label="delete"
              className={classes.deleteBtn}
              onClick={handleDeleteList}
            >
              <DeleteIcon />
            </IconButton>

            {/* <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button> */}
          </AccordionActions>
        ) : null}
      </Accordion>
    </div>
  );
};

export default List;
