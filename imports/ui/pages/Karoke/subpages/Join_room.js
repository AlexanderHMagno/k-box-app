import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Rooms } from "../../../../api/links";
import Room_card from "./Room_Card";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
          Meteor.call("rooms.subscription", id);

          Swal.fire({
            html: `Welcome! Now You can start adding new songs`,
            type: "success",
            confirmButtonColor: "green"
          });
          // update present screen
          this.setState({
            rooms: Rooms.find({
              $and: [
                { users: { $ne: { user: Meteor.userId() } } },
                { public: "yes" }
              ]
            }).fetch()
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
  }

  componentWillMount() {
    this.setState({
      rooms: Rooms.find({
        $and: [{ users: { $ne: { user: Meteor.userId() } } }, { public: "yes" }]
      }).fetch()
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
