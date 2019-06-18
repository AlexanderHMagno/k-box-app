import React from "react";

class LastFM extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    const { item_search } = props;
    this.state = {
      artist: "juanes",
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentWillReceiveProps() {
    console.log(this.props.item_search);
    this.setState({
      artist: this.props.item_search
    });
  }

  componentWillReceiveProps() {
    const source = "http://ws.audioscrobbler.com/2.0/";
    // const method = "?method=artist.search&artist=";
    const method = "?method=artist.gettoptracks&artist=";
    // const method = "method=artist.getinfo&artist=";

    const key = "&api_key=a0db55d657d3405364a7450efc1f97c4";
    const format = "&format=json";
    fetch(`${source}${method}${this.props.item_search}${key}${format}`)
      .then(res => res.json())
      .then(
        result => {
          console.log(result);

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
              <div>
                <a href={item.url} target="_blank">
                  {item.name} +
                </a>
                <h1>{item.artist.name}</h1>
              </div>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default LastFM;
