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
// import images from "./images/images";
import { Meteor } from "meteor/meteor";

const MySwal = withReactContent(Swal);
const user = "d1d1";

// Links.update(
//   { _id: owner },
//   { $push: { friends: { _id, username, createdAt: new Date() } } }
// );
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
  },
  container: {
    width: "225px"
  }
});

class KboxUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: Meteor.users.find({}).fetch(),
      visible: true,
      background_image:
        "https://upload.wikimedia.org/wikipedia/commons/0/0c/Shure_mikrofon_55S.jpg"
    };
  }

  // friendRequest(data) {
  //   Links.insert({
  //     id: _id,
  //     friendRequests: data[0],
  //     image: this.state.background_image
  //   });
  // }

  // sendRequest(owner, username, invitefriend) {
  //   // console.log(owner, "this is owner");
  //   // console.log(username, "this is username");
  //   // console.log(invitefriend, "invite");
  //   // console.log("Links is here ", Links);
  //   Links.update(
  //     { _id: owner },
  //     {
  //       $push: {
  //         friends: { _id: _id, username: username, status: invitefriend }
  //       }
  //     }
  //   );
  //   this.setState({
  //     visible: !this.state.visible,
  //     friends: Links.find().fetch()
  //   });
  //   MySwal.fire({
  //     html: `<span> Friend Invite has been sent to ${username} </span>`,
  //     type: "sucess",
  //     confirmButtonColor: "Green"
  //   });
  // }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {/* {console.log(Links.find({}).fetch(), "links")} */}
          {/* {console.log(Rooms.find({}).fetch(), "rooms")} */}
          {/* {console.log(Meteor.users.find({}).fetch(), "jfjf")} */}
          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.boot}>
              {this.state.users.map((user, index) => {
                const links = Links.find({
                  email: user.emails && user.emails[0].address
                }).fetch();
                let favoriteCount;

                if (links && links[0].favorites)
                  favoriteCount = links[0].favorites.length;

                return (
                  <div className={classes.container} key={index}>
                    <User_card
                      className={classes.paper}
                      name={user.username}
                      id_user={user._id}
                      fav={favoriteCount}
                      image={this.state.background_image}
                      type={"Request"}
                      // onClick={() =>
                      //   this.sendRequest(user.username, Meteor.userId())
                      //                      }
                    />
                  </div>
                );
              })}
              ;
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

KboxUsers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(KboxUsers);
