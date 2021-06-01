import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { Link } from "react-router-dom";
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
  },
  filter: {
    marginBottom: "20px",
  },
  link: {
    color: "#CCC",
    fontWeight: 'bold',
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

  const { myLists, filterPrivateLists } = useAuth();

  console.log('myLists', myLists);

  useEffect(() => {
    (async () => {
      let data = [];
      const d = myLists.map((list) => list.tags);
      d.map((item) => {
        data.push(...item);
      });

      setTags(data);
      console.log("data", data);
      console.log("tags", tags);
      console.log("myLists", myLists);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myLists]);

  const handleOnChange = async (v) => {
    setTag(v);
    await filterPrivateLists(v);
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

        {myLists.length > 0
          ? myLists.map((list) => (
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
