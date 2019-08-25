import React from "react";
import Song from "./Song_container";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

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

  componentWillMount() {
    this.update_component(this.props.item_search, this.props.selectedTab);
  }

  componentWillReceiveProps(data) {
    this.update_component(data.item_search, data.selectedTab);
  }

  update_component(keyWord, searchBy) {
    const source = "http://ws.audioscrobbler.com/2.0/";
    const method =
      searchBy === 0
        ? "?method=artist.gettoptracks&artist="
        : "?method=track.search&track=";

    const key = "&api_key=a0db55d657d3405364a7450efc1f97c4";
    const format = "&format=json";
    fetch(`${source}${method}${keyWord}${key}${format}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items:
              searchBy === 0
                ? result.toptracks.track
                : result.results.trackmatches.track
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
    const {
      source_of_request,
      room_id,
      favorite_room,
      updating_room_state,
      classes,
      selectedTab
    } = this.props;

    const user_id = Meteor.userId();
    if (error) {
      console.log("we have a problem:  ", error.message);
      return <div>Heya, We couldn't find your song</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <ul style={{ display: "flex", flexWrap: "wrap" }}>
              {items.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={item.name + index}>
                  <div>
                    <Song
                      artist={
                        selectedTab === 0 ? item.artist.name : item.artist
                      }
                      title={item.name}
                      owner={user_id}
                      source_of_request={source_of_request}
                      room_id={room_id}
                      favorite_room={favorite_room}
                      updating_room_state={updating_room_state}
                      style={{ listStyleType: "none", width: "30%" }}
                    />
                  </div>
                </Grid>
              ))}
            </ul>
          </Grid>
        </div>
      );
    }
  }
}

export default withStyles(styles)(LastFM);
