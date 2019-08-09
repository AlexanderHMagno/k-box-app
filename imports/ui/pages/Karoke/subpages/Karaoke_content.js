import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Rooms } from "../../../../api/links";
import Room_card from "./Room_Card";
import Dashboard from "../Rooms/Dashboard";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

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

  create_room_environment(information) {
    this.setState({
      open_room: !this.state.open_room,
      room_info: information
    });
  }

  render() {
    const { classes, rooms } = this.props;
    return (
      <div className={classes.root}>
        {!this.state.open_room && (
          <Grid container spacing={3}>
            {rooms.map((room, index) => {
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

export default withTracker(() => {
  Meteor.subscribe("rooms");
  const userId = Meteor.userId();
  const user = Meteor.user();
  return {
    rooms: Rooms.find({ users: { user: Meteor.userId() } }).fetch(),
    userId,
    user
  };
})(withStyles(useStyles)(CenteredGrid));
