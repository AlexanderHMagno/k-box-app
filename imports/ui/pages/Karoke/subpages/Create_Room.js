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
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Room_card from "./Room_Card";
import { Rooms } from "../../../../api/links";
import images from "./images/images";

const MySwal = withReactContent(Swal);
const user = "d1d1";

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
    const images_number = Math.round(images.length * Math.random());
    this.setState({
      background_image: images[images_number]
    });
  }

  Create_room(data_room) {
    Rooms.insert({
      name: data_room[0],
      image: this.state.background_image,
      bio: data_room[1],
      users: [],
      tracks: [],
      password: data_room[2]
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Room_card
              className={classes.paper}
              name={"Add the Room's name"}
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

export default withStyles(useStyles)(CenteredGrid);
