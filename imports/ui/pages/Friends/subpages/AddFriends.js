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
import { Rooms } from "../../../../api/links";
import { makeStyles } from "@material-ui/core/styles";
import User_card from "./User_Card";
import Swal from "sweetalert2";
import { Links } from "../../../../api/links";
import withReactContent from "sweetalert2-react-content";
import Friend from "../Friend";

const MySwal = withReactContent(Swal);

const user = "d1d1";

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
          <Grid item xs={12} sm={6} md={4}>
            {this.state.friends[0].friends.map((friend, index) => {
              // console.log(friend, "show me ");
              if (friend.status === "invitefriend") {
                return (
                  <div className={classes.container} key={index}>
                    <User_card
                      className={classes.paper}
                      name={friend.username}
                      image={this.state.background_image}
                      type={"Delete"}
                      full_information={friend}
                      id_user={friend.id}
                      status={friend.status}
                    />
                  </div>
                );
              }
            })}
          </Grid>
        </Grid>
      </div>
    );
  }
}

AddFriends.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(useStyles)(AddFriends);
