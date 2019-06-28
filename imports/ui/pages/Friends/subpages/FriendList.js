import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import Api from "../../../components/siteLayout/API";
import { Links } from "../../../../api/links";
import { makeStyles } from "@material-ui/core/styles";
import User_card from "./User_Card";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: Links.find({ _id: Meteor.userId() }).fetch(),
      background_image:
        "https://upload.wikimedia.org/wikipedia/commons/0/0c/Shure_mikrofon_55S.jpg"
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {console.log(Links.find({}).fetch(), "links")}
          {/* {console.log(Rooms.find({}).fetch(), "rooms")} */}
          <Grid item xs={12} sm={6} md={4}>
            {this.state.friends.map((friend, index) => {
              if (friend.friends && friend.friends[0]) {
                return friend.friends.map((data, i) => {
                  console.log(data, "friend data");
                  console.log(data._id, "friend dataa");

                  return (
                    <div>
                      <User_card
                        key={index}
                        className={classes.paper}
                        name={data.username}
                        image={this.state.background_image}
                        // f_creator={() =>
                        //   ShowKboxUsers(this.friendRequest.bind(this))
                        //}
                      />
                    </div>
                  );
                });
              }
            })}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(FriendList);

// const myLinks = Links.find({
//   email: user.emails && user.emails[0].address
// }).fetch()[0]
// const linkID = myLinks._id;

// Links.update(linkID, {
//   $set: {
//     friends: myLinks.friends.
//   }
// })

// friendRequest(owner, _id, username) {
//   console.log(owner, "boo");
//   Links.update(
//     { _id: owner },
//     { $push: { friends: { _id, username, createdAt: new Date() } } }
//   );
