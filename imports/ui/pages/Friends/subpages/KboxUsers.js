import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
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
import User_card from "./User_Card";
import { Rooms } from "../../../../api/links";
import { Links } from "../../../../api/links";
import images from "./images/images";
import { Meteor } from "meteor/meteor";

const MySwal = withReactContent(Swal);
const user = "d1d1";

///++++++++++++++++ ROOM CREATOR +++++++++++++++++

const ShowKboxUsers = create =>
  Swal.mixin({
    input: "text",
    confirmButtonText: "Next &rarr;",
    showCancelButton: true
  })
    .queue([])
    .then(result => {
      if (result) {
        // if (result.value) {
        Swal.fire({
          // title: "All done!",
          // html: `Friend  Request Sent`,
          // confirmButtonText: "Sucess!"
          html: `<span> Friend  Request Sent </span>`,
          type: "success",
          confirmButtonColor: "green"
        });
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
      users: Meteor.users.find({}).fetch(),
      background_image:
        "https://upload.wikimedia.org/wikipedia/commons/0/0c/Shure_mikrofon_55S.jpg"
    };
  }

  friendRequest(data_room) {
    Rooms.insert({
      name: data_room[0],
      image: this.state.background_image,
      fav: data_room[1]
      // password: data_room[2]
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {console.log(Links.find({}).fetch(), "links")}
          {/* {console.log(Rooms.find({}).fetch(), "rooms")} */}
          <Grid item xs={12} sm={6} md={4}>
            {this.state.users.map((user, index) => {
              const links = Links.find({
                email: user.emails && user.emails[0].address
              }).fetch();
              let favoriteCount;

              if (links && links[0].favorites)
                favoriteCount = links[0].favorites.length;

              return (
                <User_card
                  key={index}
                  className={classes.paper}
                  name={user.username}
                  // bio={user.emails && user.emails[0].address}
                  fav={favoriteCount}
                  // email={"Number of Fav Songs"}
                  image={this.state.background_image}
                  creator={"Request"}
                  f_creator={() => ShowKboxUsers(this.friendRequest.bind(this))}
                />
              );
            })}
            ;
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(CenteredGrid);
