import React from "react";
import YouTube from "react-youtube";

class Youtube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [
        "huaE85-V8u4",
        "juanes la camisa negra",
        "me vale mana",
        "I wanna Dance with somebody Whitney Houston"
      ],
      position: 1,
      error_queue: 1
    };
  }
  componentWillReceiveProps() {
    console.log(this.props);
  }
  compon;

  videoOnReady(event) {
    // access to player in all event handlers via event.target
    const player = event.target;
    player.pauseVideo();
  }
  nextSong(event) {
    // access to player in all event handlers via event.target
    const player = event.target;
    player.loadPlaylist({
      list: `${this.state.songs[this.state.position]} karaoke`,
      listType: "search"
    });
    if (this.state.songs.length - 1 !== this.state.position) {
      this.setState({
        position: this.state.position + 1,
        error_queue: 1
      });
    }
  }
  handleError(event) {
    const player = event.target;

    //@
    //* This will verify that is the last song available.
    const lastSong = this.state.songs.length - 1 !== this.state.position;
    const play_next_available = !lastSong
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
    const opts = {
      height: "390",
      width: "90%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <YouTube
        videoId={this.state.songs[0]}
        opts={opts}
        onReady={this.videoOnReady}
        onEnd={this.nextSong.bind(this)}
        onError={this.handleError.bind(this)}
      />
    );
  }
}

export default Youtube;
