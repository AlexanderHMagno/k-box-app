import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Tooltip from "@material-ui/core/Tooltip";
import ADD_title from "@material-ui/icons/AddCircleSharp";
import { withStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Links, Rooms } from "../../../api/links";

const MySwal = withReactContent(Swal);
const styles = theme => ({
  card: {
    display: "flex",
    position: "relative",
    minHeight: "200px",
    maxHeight: "200px",
    margin: "3%",
    Width: "100px"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 10,
    backgroundColor: "red",
    position: "absolute",
    right: "10px"
  },
  controls: {
    // display: "flex",
    // alignItems: "flex-end",
    // paddingLeft: theme.spacing(1),
    // paddingBottom: theme.spacing(1)
    textAlign: "right"
  },
  playIcon: {
    height: 38,
    width: 38,
    color: "green"
  },
  removetitle: {
    height: 38,
    width: 38,
    color: "grey"
  }
});

class Song_container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      id: "",
      song: ""
    };
  }
  /*@ this will verify if the information is coming from the data base or not.
   * IMPORTANT! declared data_in_db as a global in order to not repeat my code
   * properties NONE
   */
  update_id() {
    const {
      title,
      artist,
      owner,
      source_of_request,
      room_id,
      favorite_room
    } = this.props;

    if (source_of_request === "search_favorites" || favorite_room === "yes") {
      var data_in_db = Links.find({
        $and: [
          { _id: owner },
          { favorites: { $elemMatch: { title: title, artist: artist } } }
        ]
      });
    } else {
      var data_in_db = Rooms.find({
        $and: [
          { _id: room_id },
          { tracks: { $elemMatch: { title: title, artist: artist } } }
        ]
      });
    }

    if (data_in_db.count() > 0) {
      this.setState({
        visible: false
      });
    }
  }

  /*before the component is called we created this solicitude
   *  this update will verify if the song is already added or not.
   */
  componentWillMount() {
    this.update_id();
  }

  /*Adding song to specific holder (could be favorites or it could be a specific room)
   * title {string} Title of the song
   * artist {string} Artis of the song
   * owner {string} Who is the person, who is sending the request.
   * source_of_request {string} Title of the song
   * room_id {string} contains the id of each room
   * favorite_room {string} boolean, yes or no
   */
  add_title(
    title,
    artist,
    owner,
    source_of_request,
    room_id,
    favorite_room,
    updating_room_state
  ) {
    let verify_source =
      source_of_request === "search_favorites" || favorite_room === "yes";
    let name_of_source = verify_source ? "Favorites" : "Room";

    if (verify_source) {
      Links.update(
        { _id: owner },
        { $push: { favorites: { title, artist, createdAt: new Date() } } }
      );
    } else if (source_of_request === "room") {
      Rooms.update(
        { _id: room_id },
        {
          $push: {
            tracks: { title, artist, singer: Meteor.user().username }
          }
        }
      );
    }
    MySwal.fire({
      html: `<span>${title} of ${artist} has been added to your ${name_of_source}</span>`,
      type: "success",
      confirmButtonColor: "green"
    });
    this.update_id();
    this.setState({
      visible: !this.state.visible
    });
    if (updating_room_state != undefined) {
      updating_room_state();
    }
  }

  /*Removing song from specific holder (could be favorites or it could be a specific room)
   * title {string} Title of the song
   * artist {string} Artis of the song
   * owner {string} Who is the person, who is sending the request.
   * source_of_request {string} Title of the song
   * room_id {string} contains the id of each room
   * favorite_room {string} boolean, yes or no
   */
  remove_title(
    title,
    artist,
    owner,
    source_of_request,
    room_id,
    favorite_room,
    updating_room_state
  ) {
    let verify_source =
      source_of_request === "search_favorites" || favorite_room === "yes";
    let name_of_source = verify_source ? "Favorites" : "Room";

    if (verify_source) {
      Links.update({ _id: owner }, { $pull: { favorites: { title, artist } } });
      MySwal.fire({
        html: `<span>${title} of ${artist} <br>has been <b>Removed</b> from your ${name_of_source}</span>`,
        type: "error",
        confirmButtonColor: "red"
      });
      this.setState({
        visible: !this.state.visible
      });
    } else if (source_of_request === "room") {
      const protector = Rooms.find({
        $and: [
          { _id: room_id },
          {
            tracks: {
              $elemMatch: { title, artist, singer: Meteor.user().username }
            }
          }
        ]
      });

      if (protector.count() > 0) {
        Rooms.update(
          { _id: room_id },
          {
            $pull: {
              tracks: { title, artist, singer: Meteor.user().username }
            }
          }
        );
        this.setState({
          visible: !this.state.visible
        });
        MySwal.fire({
          html: `<span>${title} of ${artist} <br>has been <b>Removed</b> from your ${name_of_source}</span>`,
          type: "error",
          confirmButtonColor: "red"
        });
      } else {
        MySwal.fire({
          html: `<span>${title} of ${artist} <br>can't be <b>Removed</b> from your ${name_of_source} due to this belongs to another singer</span>`,
          type: "error",
          confirmButtonColor: "red"
        });
      }
    }
    if (updating_room_state != undefined) {
      updating_room_state();
    }
  }

  render() {
    const {
      classes,
      title,
      artist,
      owner,
      source_of_request, //favorites or an specific room
      room_id,
      favorite_room,
      updating_room_state
    } = this.props;

    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {title.length > 20 ? title.substring(0, 20) + "..." : title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {artist}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="Add this song">
              {this.state.visible && (
                <Tooltip title="Add">
                  <ADD_title
                    className={classes.playIcon}
                    onClick={() =>
                      this.add_title(
                        title,
                        artist,
                        owner,
                        source_of_request,
                        room_id,
                        favorite_room,
                        updating_room_state
                      )
                    }
                  />
                </Tooltip>
              )}
              {!this.state.visible && (
                <Tooltip title="Remove">
                  <ADD_title
                    className={classes.removetitle}
                    onClick={() =>
                      this.remove_title(
                        title,
                        artist,
                        owner,
                        source_of_request,
                        room_id,
                        favorite_room,
                        updating_room_state
                      )
                    }
                  />
                </Tooltip>
              )}
            </IconButton>
          </div>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(Song_container);
