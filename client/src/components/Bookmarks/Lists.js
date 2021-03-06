import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import BookmarksIcon from '@material-ui/icons/Bookmarks';

import { Grid } from "@material-ui/core";

import List from "./List";
import { useAuth } from "../shared/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 800,
    backgroundColor: theme.palette.background.default,
    marginTop: 50,
    marginBottom: 50
  },
  header: {
    color: "#CCC",
    textAlign: "center",
    fontFamily: "Times New Roman, Times, serif",
  },
  filter: {
    marginBottom: "20px",
  },
  link: {
    color: "#CCC",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  linkGrid: {
    alignSelf: "flex-start",
    marginTop: "10px",
    marginBottom: "10px",
  },
  parentGrid: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Lists = () => {
  const classes = useStyles();

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const { filterSavedLists, savedLists } = useAuth();

  useEffect(() => {
    (async () => {
      let data = [];
      const d = savedLists.map((list) => list.tags);
      d.map((item) => {
        return data.push(...item);
      });

      const uniqueData = [...new Set(data.filter(e => e.toLowerCase()))];
      setTags(uniqueData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedLists]);

  const handleOnChange = async (v) => {
    setTag(v);
    await filterSavedLists(v);
  };

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <h2 className={classes.header}> <BookmarksIcon style={{ verticalAlign: 'top'}} /> Bookmarks </h2>

        <Grid container className={classes.parentGrid}>
          <Grid item>
            <Autocomplete
              value={tag}
              className={classes.filter}
              id="tagsFilter"
              options={tags}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              onChange={(_, v) => handleOnChange(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="select category"
                  color="secondary"
                  variant="outlined"
                />
              )}
            />
          </Grid>

          {/* <Grid item className={classes.linkGrid}>
            {isAuthenticated ? (
              <Link to="/lists" className={classes.link} onClick={() => {}}>
                Switch to ur lists
              </Link>
            ) : null}
          </Grid> */}
        </Grid>

        {savedLists.length > 0
          ? savedLists.map((list) => (
              <div key={list._id}>
                <List list={list} /> <Divider style={{ marginBottom: 1 }} />
              </div>
            ))
          : "no lists found"}
      </div>
    </Container>
  );
};

export default Lists;
