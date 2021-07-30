import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { Grid } from "@material-ui/core";

import List from "./List";
import { useAuth } from "../shared/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 800,
    backgroundColor: theme.palette.background.default,
    marginTop: 50,
    marginBottom: 50,
  },
  header: {
    color: "#CCC",
    textAlign: "center",
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

const Lists = ({ otherLists }) => {
  const classes = useStyles();

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [initLists, setInitLists] = useState([]);
  const [lists, setLists] = useState([]);

  const { myLists, filterPrivateLists } = useAuth();

  useEffect(() => {
    (async () => {
      otherLists ? setLists(otherLists) : setLists(myLists);
      otherLists ? setInitLists(otherLists) : setInitLists(myLists);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myLists, otherLists]);

  //update the tags
  useEffect(() => {
    let data = [];
    const d = lists && lists.map((list) => list.tags);
    d.map((item) => {
      return data.push(...item);
    });
    const uniqueData = [...new Set(data.filter((e) => e.toLowerCase()))];
    setTags(uniqueData);
  }, [myLists, otherLists, lists]);

  //update lists after tags filter
  const handleOnChange = async (v) => {
    setTag(v);
    if (!v) return setLists(initLists);
    const l = lists ? lists.filter((list) => list.tags.includes(v)) : [];
    setLists(l);
  };

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        {/* <h2 className={classes.header}>Your Lists</h2> */}

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
            <Link to="/" className={classes.link} onClick={() => {}}>
              Switch to public lists
            </Link>
          </Grid> */}
        </Grid>

        {lists.length > 0
          ? lists.map((list) => (
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
