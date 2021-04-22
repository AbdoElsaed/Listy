import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import ListItems from './ListItems';

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
}));

const List = ({ list }) => {
  const classes = useStyles();

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
          <ListItems items={list.items} />
        </AccordionDetails>
        {/* <Divider /> */}

        <div className={classes.tagsContainer}>
          {list.tags
            ? list.tags.map((tag) => (
                <Chip className={classes.tag} color="secondary" variant="outlined" size="small" label={tag} />
              ))
            : null}
        </div>

        <AccordionActions>
          {/* <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button> */}
        </AccordionActions>
      </Accordion>
    </div>
  );
};

export default List;
