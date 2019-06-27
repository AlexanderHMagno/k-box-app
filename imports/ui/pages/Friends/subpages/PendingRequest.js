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
import withReactContent from "sweetalert2-react-content";
import Friend from "../Friend";

const MySwal = withReactContent(Swal);

// Confirm PASSWORD AND SUSCRPITION

// const confirm_password = password => {
//   Swal.fire({
//     title: "Please Add Room's Password",
//     input: "text",
//     inputAttributes: {
//       autocapitalize: "off"
//     },
//     showCancelButton: true,
//     confirmButtonText: "Join the group"
//   }).then(result => {
//     if (result.dismiss !== "cancel") {
//       if (result.value === password) {
//         Swal.fire({
//           title: `${result.value}`,
//           html: `Welcome! Now You can start adding new songs`,
//           type: "success",
//           confirmButtonColor: "green"
//         });
//       } else {
//         Swal.fire({
//           html: `Nah! That's not the password! `,
//           type: "error",
//           confirmButtonColor: "red"
//         });
//       }
//     }
//   });
// };

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

  componentWillMount() {
    //How to insert a room
    // Rooms.insert({
    //   name: "General",
    //   image:
    //     "https://cdn.pixabay.com/photo/2017/11/12/08/43/audio-2941753_1280.jpg",
    //   bio:
    //     "This room is dedicaded to any kind of music, Rock, Pop, And other artist.",
    //   users:[],
    //   tracks:[{owner,title,track}]
    //   password:''
    // });
    this.setState({
      // rooms: Rooms.find({}).fetch()
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
                <User_card
                  className={classes.paper}
                  name={`Room ${index + 1} - ${room.name}`}
                  image={room.image}
                  // bio={room.bio}
                  fav={room.fav}
                  creator={"Accept"}
                  password={"alex"}
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
