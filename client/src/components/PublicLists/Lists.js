import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PublicIcon from '@material-ui/icons/Public';

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

  const { publicLists, filterPublicLists } = useAuth();

  useEffect(() => {
    (async () => {
      let data = [];
      const d = publicLists.map((list) => list.tags);
      d.map((item) => {
        return data.push(...item);
      });

      setTags(data);
      console.log("data", data);
      console.log("tags", tags);
      console.log("publicLists", publicLists);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicLists]);

  const handleOnChange = async (v) => {
    setTag(v);
    await filterPublicLists(v);
  };

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <h2 className={classes.header}> <PublicIcon style={{ verticalAlign: 'top'}} /> Public Lists</h2>

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

        {publicLists.length > 0
          ? publicLists.map((list) => (
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
