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
import { Links } from "../../../api/links";

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

class MediaControlCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      id: ""
    };
  }

  update_id() {
    const { title, artist, owner } = this.props;
    // console.log(title, artist, owner);
    const data = Links.find({
      $and: [
        { _id: owner },
        { favorites: { $elemMatch: { title: title, artist: artist } } }
      ]
    }).count();
    if (data > 0) {
      this.setState({
        visible: false
      });
    }
  }
  componentWillMount() {
    this.update_id();
  }
  add_title(title, artist, owner) {
    Links.update(
      { _id: owner },
      { $push: { favorites: { title, artist, createdAt: new Date() } } }
    );
    // Links.insert({ owner, title, artist, createdAt: new Date() });
    this.update_id();
    MySwal.fire({
      html: `<span>${title} of ${artist} <br>has been <b>Added</b> to your favorites</span>`,
      type: "success",
      confirmButtonColor: "green"
    });
    this.setState({
      visible: !this.state.visible
    });
  }
  remove_title(title, artist, owner) {
    Links.update({ _id: owner }, { $pull: { favorites: { title, artist } } });
    this.setState({
      visible: !this.state.visible
    });
    MySwal.fire({
      html: `<span>${title} of ${artist} <br>has been <b>Removed</b> from your favorites</span>`,
      type: "error",
      confirmButtonColor: "red"
    });
  }

  render() {
    const { classes, title, artist, owner } = this.props;
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
            <IconButton aria-label="Add this song to your favorites">
              {this.state.visible && (
                <Tooltip title="Add to favorites">
                  <ADD_title
                    className={classes.playIcon}
                    onClick={() => this.add_title(title, artist, owner)}
                  />
                </Tooltip>
              )}
              {!this.state.visible && (
                <Tooltip title="Remove from favorites">
                  <ADD_title
                    className={classes.removetitle}
                    onClick={() => this.remove_title(title, artist, owner)}
                  />
                </Tooltip>
              )}
            </IconButton>
          </div>
          {/* <div className={classes.controls}>
          <IconButton aria-label="Previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="Play/pause">
            <Balance className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="Next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </div> */}
        </div>
        {/* <CardMedia
        className={classes.cover}
        image="/static/images/cards/live-from-space.jpg"
        title="Live from space album cover"
      /> */}
      </Card>
    );
  }
}

export default withStyles(styles)(MediaControlCard);
