import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import Room_card from "./Room_Card";
import images from "./images/images";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

///++++++++++++++++ ROOM CREATOR +++++++++++++++++

const Room_creator = create =>
  Swal.mixin({
    input: "text",
    confirmButtonText: "Next &rarr;",
    showCancelButton: true,
    progressSteps: ["1", "2", "3"]
  })
    .queue([
      {
        title: "Room's Name",
        text: "Identify Your Room"
      },
      "Bio (create a description)",
      "Password"
    ])
    .then(result => {
      if (result.value) {
        Swal.fire({
          title: "All done!",
          html: `Heya <h1>${result.value[0]}</h1> has been created`,
          confirmButtonText: "Lovely!"
        });
        create(result.value);
      }
    });

///+++++++++++++++++++++ End Room Creator

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
  }
});

class CenteredGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      background_image: ""
    };
  }

  componentWillMount() {
    const images_number = Math.round((images.length - 1) * Math.random());
    this.setState({
      background_image: images[images_number]
    });
  }

  Create_room(data_room) {
    Meteor.call("rooms.createNewRoom", data_room, this.state.background_image);
  }

  change_image(new_image) {
    this.setState({
      background_image: new_image
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" style={{ color: "white" }}>
              Select a Cover
            </Typography>
            <br />
            <Grid container spacing={3}>
              {images.map((image, index) => {
                return (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Paper
                      style={{
                        backgroundImage: `url("${image}")`,
                        border: "1px solid white",
                        color: "transparent",
                        cursor: "pointer"
                      }}
                      onClick={() => this.change_image(image)}
                    >
                      .
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Room_card
              className={classes.paper}
              name={"Room's name"}
              // roomInfo={{
              //   image: this.state.background_image,
              //   bio: "Please add a Complete Description"
              // }}
              image={this.state.background_image}
              bio={"Please add a Complete Description"}
              creator={"Create"}
              f_creator={() => Room_creator(this.Create_room.bind(this))}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("rooms");
  const userId = Meteor.userId();
  const user = Meteor.user();
  return {
    userId,
    user
  };
})(withStyles(useStyles)(CenteredGrid));
