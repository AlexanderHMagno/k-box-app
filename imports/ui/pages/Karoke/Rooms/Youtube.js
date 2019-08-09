import React from "react";
import YouTube from "react-youtube";
import Typography from "@material-ui/core/Typography";
import Swal from "sweetalert2";
import { Links, Rooms } from "../../../../api/links";

class Youtube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      position: 0,
      error_queue: 1,
      video_loader: "epDoVwQ1ZLk"
    };
  }

  componentWillMount() {
    // console.log(this.props);

    if (this.props.favorite_room === "yes") {
      if (this.props.songs.length) {
        this.setState({
          songs: this.props.songs[0].favorites.map(
            x => `${x.title}  ${x.artist}`
          )
        });
      }
    } else {
      this.setState({
        songs: this.props.songs.map(x => `${x.title}  ${x.artist}`)
      });
    }
  }

  componentWillReceiveProps(props) {
    if (props.favorite_room === "yes") {
      if (this.props.songs.length) {
        this.setState({
          songs: props.songs[0].favorites.map(x => `${x.title}  ${x.artist}`)
        });
      }
    } else {
      this.setState({
        songs: props.songs.map(x => `${x.title}  ${x.artist}`)
      });
    }

    //if the user update the queue it will trigger the change here
    if (!(props.youtube_position_queue == -1)) {
      if (props.admin._id != Meteor.userId()) {
        Swal.fire({
          position: "bottom-end",
          type: "warning",
          title: "Contact admin to change queue",
          showConfirmButton: false,
          timer: 1000
        });
      } else {
        this.setState({
          position: props.youtube_position_queue
        });
        Swal.fire({
          position: "bottom-end",
          type: "success",
          title: `${
            this.state.songs[props.youtube_position_queue]
          } add to queue`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  }

  videoOnReady(event) {
    // access to player in all event handlers via event.target
    const player = event.target;
    player.stopVideo();
  }

  nextSong(event) {
    // access to player in all event handlers via event.target
    const player = event.target;
    player.loadPlaylist({
      list: `${this.state.songs[this.state.position]} karaoke`,
      listType: "search"
    });

    if (!(this.state.songs.length <= this.state.position)) {
      this.setState({
        position: this.state.position + 1,
        error_queue: 1
      });
    } else {
      player.loadVideoById(this.state.video_loader);
      this.setState({
        position: 0,
        error_queue: 1
      });
      player.stopVideo();
    }
  }

  handleError(event) {
    const player = event.target;

    //@
    //* This will verify that is the last song available.
    const lastSong = !(this.state.songs.length <= this.state.position);
    const play_next_available = lastSong
      ? this.state.songs[this.state.position]
      : this.state.songs[this.state.position - 1];

    player.loadPlaylist({
      list: `${play_next_available} karaoke`,
      listType: "search",
      index: this.state.error_queue
    });
    this.setState({
      error_queue: this.state.error_queue + 1
    });
  }

  render() {
    // console.log(this.props);
    const opts = {
      height: "390",
      width: "90%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <div>
        {this.props.songs != 0 && (
          <YouTube
            videoId={this.state.video_loader}
            opts={opts}
            onReady={this.videoOnReady}
            onEnd={this.nextSong.bind(this)}
            onError={this.handleError.bind(this)}
          />
        )}

        {this.props.songs == 0 && (
          <Typography variant="h6" color="secondary">
            "Please Add more songs to this room"
          </Typography>
        )}
      </div>
    );
  }
}

export default Youtube;
