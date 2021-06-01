import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

import Item from "./ListItem";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 650,
    backgroundColor: theme.palette.primary.main,
    border: '1px solid #222222',
    borderRadius: 2
  },
}));

const ListItems = ({ isAuthor, items }) => {
  const classes = useStyles();

  return (
    <div>
      <List
        // subheader={<ListSubheader>items</ListSubheader>}
        className={classes.root}
      >
        
        {
            items ?
            items.map(item => ( <Item key={item._id} isAuthor={isAuthor} item={item}/> ))
            : 'no items found'
        }

      </List>
    </div>
  );
};

export default ListItems;
