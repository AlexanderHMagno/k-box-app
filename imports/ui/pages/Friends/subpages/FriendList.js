import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import User_card from "./User_Card";
import { Links } from "../../../../api/links";
import { withTracker } from "meteor/react-meteor-data";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  container: {
    width: "225px"
  }
});

const FriendList = ({ classes, myLink }) => {
  const friends = myLink ? myLink.friends : [];
  return (
    <div className={classes.root}>
      {friends && (
        <Grid container spacing={3}>
          {friends.map((friend, index) => {
            if (friend.status === "friends") {
              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <div className={classes.container}>
                    <User_card
                      className={classes.paper}
                      name={friend.username}
                      image="https://upload.wikimedia.org/wikipedia/commons/0/0c/Shure_mikrofon_55S.jpg"
                      friendStatus={friend.status}
                      id_user={friend._id}
                    />
                  </div>
                </Grid>
              );
            }
          })}
        </Grid>
      )}
    </div>
  );
};

FriendList.propTypes = {
  classes: PropTypes.object.isRequired,
  myLink: PropTypes.object
};

export default withTracker(() => {
  Meteor.subscribe("links");
  const userId = Meteor.userId();
  const user = Meteor.user();
  return {
    myLink: Links.find(
      {
        _id: userId
      },
      { _id: 0, friends: 1 }
    ).fetch()[0],
    userId,
    user
  };
})(withStyles(useStyles)(FriendList));
