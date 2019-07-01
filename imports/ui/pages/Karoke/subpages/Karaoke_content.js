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
import Dashboard from "../Rooms/Dashboard";

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
      rooms: [],
      open_room: false,
      room_info: []
    };
  }

  componentWillMount() {
    this.setState({
      rooms: Rooms.find({ users: { user: Meteor.userId() } }).fetch()
    });
  }
  create_room_environment(information) {
    this.setState({
      open_room: !this.state.open_room,
      room_info: information
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {!this.state.open_room && (
          <Grid container spacing={3}>
            {this.state.rooms.map((room, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={room.name + index}>
                  <Room_card
                    className={classes.paper}
                    name={`Room ${index + 1} - ${room.name}`}
                    id={room._id}
                    image={room.image}
                    bio={room.bio}
                    password={room.password}
                    admin={room.administrator}
                    users={room.users}
                    tracks={room.tracks}
                    room_creator={this.create_room_environment.bind(this)}
                    favorite_room={room.favorite_room}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
        {this.state.open_room && <Dashboard structure={this.state.room_info} />}
      </div>
    );
  }
}

export default withStyles(useStyles)(CenteredGrid);
