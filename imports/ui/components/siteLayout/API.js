import React from "react";
import Song from "./Song_container";

class LastFM extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: "",
      error: null,
      isLoaded: false,
      items: []
    };
  }

  // componentDidUpdate() {
  //   this.update_component();
  // }
  componentWillMount() {
    // this.setState({
    //   artist: this.props.item_search
    // });
    this.update_component(this.props.item_search);
  }
  componentWillReceiveProps(data) {
    this.update_component(data.item_search);
  }

  update_component(dataka) {
    const source = "http://ws.audioscrobbler.com/2.0/";
    // const method = "?method=artist.search&artist=";
    const method = "?method=artist.gettoptracks&artist=";
    // const method = "method=artist.getinfo&artist=";

    const key = "&api_key=a0db55d657d3405364a7450efc1f97c4";
    const format = "&format=json";
    fetch(`${source}${method}${dataka}${key}${format}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.toptracks.track
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    const user_id = Meteor.userId();
    if (error) {
      console.log("we have a problem:  ", error.message);
      return <div>Heya, We couldn't find your song</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul style={{ display: "flex", flexWrap: "wrap" }}>
          {items.map(item => (
            <li key={item.name} style={{ listStyleType: "none", width: "30%" }}>
              <div>
                <Song
                  artist={item.artist.name}
                  title={item.name}
                  owner={user_id}
                />
              </div>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default LastFM;
