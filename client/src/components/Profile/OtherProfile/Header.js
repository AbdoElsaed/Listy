import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";

import { followUser, unFollowUser } from "../../../utils/api";
import { useAuth } from "../../shared/Auth";
import { checkFollowing } from "../../shared/helpers";
import FollowLists from "./FollowLists";

import { getFollowersList } from "../../../utils/api";
import { getFollowingList } from "../../../utils/api";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginTop: "30px",
  },
  name: {
    color: "#DDD",
    textTransform: "capitalize",
    marginTop: "5px",
    marginBottom: "5px",
  },
  button: {
    // margin: theme.spacing(1),
    marginBottom: "10px",
    marginTop: "0px",
    backgroundColor: '#334eaf',
    '&:hover': {
      backgroundColor: '#22398e'
    },
    padding: '5px 15px',
    borderRadius: '15px',
    fontWeight: 'bold',
    color: '#222'
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
  },
}));

const Header = ({ user }) => {
  const classes = useStyles();
  const { following: myFollowing, refreshFollowersList, refreshFollowingList } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [isFollowing, setIsFollowing] = useState(checkFollowing(myFollowing, user._id));
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsFollowing(checkFollowing(myFollowing, user._id))
  }, [myFollowing, followers])


  useEffect(() => {
    (async () => {
      setLoading(true);
      let token = JSON.parse(localStorage.getItem("token"));
      const followers = await getFollowersList(token, user._id);
      const following = await getFollowingList(token, user._id);
      setFollowers(followers);
      setFollowing(following);
      setLoading(false);
    })();
  }, []);

  const refreshFollowers = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    const followers = await getFollowersList(token, user._id);
    setFollowers(followers);
  }

  // const isFollowing = checkFollowing(following, user._id);

  const handleFollow = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const result = await followUser(user._id, token);
    await refreshFollowingList();
    await refreshFollowers()
    if(result) {
      enqueueSnackbar("followed successfully!", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    }
  }

  const handleUnFollow = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const result = await unFollowUser(user._id, token);
    await refreshFollowingList();
    await refreshFollowers()
    if(result) {
      enqueueSnackbar("unfollowed successfully!", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <img
          className={classes.avatar}
          alt="avatar"
          src={user && user.avatar ? user.avatar.location : "/anon.png"}
        ></img>
        <h3 className={classes.name}>{user && user.name}</h3>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          onClick={isFollowing ? handleUnFollow : handleFollow}
          id={user._id}
        >
          { isFollowing ? 'unfollow' : 'follow'}
        </Button>
      </div>

      <FollowLists user={user} followers={followers} following={following} loading={loading}/>

    </div>
  );
};

export default Header;
