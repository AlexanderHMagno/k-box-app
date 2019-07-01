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
import Room_card from "./Room_Card";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// Confirm PASSWORD AND SUSCRPITION to the room//

const confirm_password = (password, id) => {
  Swal.fire({
    title: "Please Add Room's Password",
    input: "text",
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: "Join the group"
  }).then(result => {
    if (result.dismiss !== "cancel") {
      if (result.value === password) {
        //Subscribe the user into the room
        Rooms.update(
          { _id: id },
          { $push: { users: { user: Meteor.userId() } } }
        );
        //update rooms availables....

        Swal.fire({
          title: `${result.value}`,
          html: `Welcome! Now You can start adding new songs`,
          type: "success",
          confirmButtonColor: "green"
        });
      } else {
        Swal.fire({
          html: `Nah! That's not the password! `,
          type: "error",
          confirmButtonColor: "red"
        });
      }
    }
    return "done";
  });
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const user = "d1d1";

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

class CenteredGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
  }
  async catch_password(password, id) {
    await confirm_password(password, id).done(console.log("alex"));
    this.setState({
      rooms: Rooms.find({ users: { $ne: { user: Meteor.userId() } } }).fetch()
    });
  }

  componentWillMount() {
    this.setState({
      rooms: Rooms.find({ users: { $ne: { user: Meteor.userId() } } }).fetch()
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        Join a Room
        <Grid container spacing={3}>
          {this.state.rooms.map((room, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={room.name + index}>
                <Room_card
                  className={classes.paper}
                  name={`Room ${index + 1} - ${room.name}`}
                  image={room.image}
                  bio={room.bio}
                  creator={"Join"}
                  password={room.password}
                  id={room._id}
                  f_creator={this.catch_password.bind(this)}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(CenteredGrid);
