import React from "react";

class LastFM extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    const { item_search } = props;
    this.state = {
      artist: item_search == "" ? "data" : item_search,
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentWillReceiveProps() {
    const source = "http://ws.audioscrobbler.com/2.0/";
    const method = "?method=artist.search&artist=";
    // const method = "method=artist.getinfo&artist=";
    const key = "&api_key=a0db55d657d3405364a7450efc1f97c4";
    const format = "&format=json";
    fetch(`${source}${method}${this.state.artist}${key}${format}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.results.artistmatches.artist
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
    // console.log(this.state);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
              <img src={item.image[1]["#text"]} />
              {item.name}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default LastFM;
