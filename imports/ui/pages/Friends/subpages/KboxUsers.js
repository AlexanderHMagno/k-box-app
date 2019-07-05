import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import User_card from "./User_Card";
import { Links } from "../../../../api/links";
import { Meteor } from "meteor/meteor";
// import { withTracker } from "meteor/react-meteor-data";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  },
  container: {
    width: "225px"
  }
});

class KboxUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: Links.find({}).fetch(),
      friends: Links.findOne({ _id: Meteor.userId() }).friends,
      visible: true,
      background_image:
        "https://upload.wikimedia.org/wikipedia/commons/0/0c/Shure_mikrofon_55S.jpg"
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {this.state.users.map((user, index) => {
            const friend = this.state.friends.find(
              friend => friend._id === user._id
            );
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <div className={classes.container}>
                  <User_card
                    className={classes.paper}
                    name={user.username}
                    id_user={user._id}
                    fav={user.favorites && user.favorites.length}
                    image={this.state.background_image}
                    friendStatus={friend && friend.status}
                    onFriendChange={() => {
                      this.setState({
                        users: Links.find({}).fetch(),
                        friends: Links.findOne({ _id: Meteor.userId() }).friends
                      });
                    }}
                  />
                </div>
              </Grid>
            );
          })}
          ;
        </Grid>
      </div>
    );
  }
}

KboxUsers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(KboxUsers);

// export default withTracker(() => {
//   Meteor.subscribe("links");
//   return {
//   //     user: Meteor.user()
//userId: Meteor.userId()
//   };
// })(withStyles(useStyles)(KboxUsers));
