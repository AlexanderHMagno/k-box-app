import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import User_card from "./User_Card";
import { Links } from "../../../../api/links";

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

class AddFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: Links.find(
        { _id: Meteor.userId() },
        { _id: 0, status: "invitefriend" }
      ).fetch(),
      background_image:
        "https://upload.wikimedia.org/wikipedia/commons/0/0c/Shure_mikrofon_55S.jpg"
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {this.state.friends[0].friends.map((friend, index) => {
            if (friend.status === "invitefriend") {
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <div className={classes.container}>
                    <User_card
                      className={classes.paper}
                      name={friend.username}
                      image={this.state.background_image}
                      friendStatus={friend.status}
                      id_user={friend._id}
                      status={friend.status}
                      onFriendChange={() => {
                        this.setState({
                          friends: Links.find(
                            { _id: Meteor.userId() },
                            { _id: 0, status: "invitefriend" }
                          ).fetch()
                        });
                      }}
                    />
                  </div>
                </Grid>
              );
            }
          })}
        </Grid>
      </div>
    );
  }
}

AddFriends.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(useStyles)(AddFriends);
