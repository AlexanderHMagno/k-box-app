import React from "react";
import YouTube from "react-youtube";
import Typography from "@material-ui/core/Typography";
import Swal from "sweetalert2";

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
    this.setState({
      songs: this.props.songs.map(x => `${x.title}  ${x.artist}`)
    });
  }

  componentWillReceiveProps(props) {
    if (props.youtube_position_queue != this.state.position) {
      this.setState({
        songs: props.songs.map(x => `${x.title}  ${x.artist}`),
        position: props.youtube_position_queue
      });
      const message = this.state.songs[props.youtube_position_queue];
      if (message) {
        Swal.fire({
          position: "bottom-end",
          type: "success",
          title: `${message} add to queue`,
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
    const play_next_available = this.state.songs[this.state.position - 1];
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
