import React from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Current from "./Current";
import Room_list from "./Room_list";
import Youtube from "./Youtube";
import { Links, Rooms } from "../../../../api/links";
import { withStyles } from "@material-ui/core/styles";
import { dashboard_styles } from "./styles.js";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      open_room: false,
      room_info: [],
      setOpen: "",
      list_to_play: "",
      youtube_position_queue: -1
    };
    console.log(this.props);
  }

  /* When the user adds another song to the list this should update the list also
   * in the youtube query
   * new_list {array} contains the new list.
   */
  update_list_to_play(new_list) {
    this.setstate({
      list_to_play: new_list
    });
  }

  componentWillMount() {
    const { structure } = this.props;
    if (structure.favorite_room === "yes") {
      this.setState({
        list_to_play: Links.find(
          { _id: Meteor.userId() },
          { favorites: 1, _id: 0 }
        ).fetch()
      });
    } else {
      this.setState({
        list_to_play: Rooms.find(
          { _id: structure.id },
          { tracks: 1, _id: 0 }
        ).fetch()
      });
    }
  }

  //test_updating_ui from here

  change_state_queue(position) {
    this.setState({
      youtube_position_queue: position
    });
  }

  adding_removing_song() {
    const { structure, songs } = this.props;

    if (structure.favorite_room === "yes") {
      this.setState({
        list_to_play: songs,
        youtube_position_queue: -1
      });
    } else {
      this.setState({
        list_to_play: Rooms.find(
          { _id: structure.id },
          { tracks: 1, _id: 0 }
        ).fetch(),
        youtube_position_queue: -1
      });
    }
  }

  render() {
    console.log(this.props);
    const { structure, classes, songs } = this.props;

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    console.log(this.state.list_to_play, { songs });
    const newSongs = this.state.list_to_play.length
      ? this.state.list_to_play[0].tracks
      : songs[0].favorites;
    console.log(newSongs);

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  className={fixedHeightPaper}
                  style={{
                    backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, 0.52),rgba(0, 0, 0, 0.52)),url(${
                      structure.image
                    })`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    color: "white"
                  }}
                >
                  <Chart
                    title={structure.name}
                    return={structure.room_creator}
                  />
                </Paper>
              </Grid>
              {/* Recent Current */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Current
                    bio={structure.bio}
                    admin={structure.admin}
                    password={structure.password}
                  />
                </Paper>
              </Grid>
              {/* Video Player */}
              <Grid item xs={12}>
                <Paper className={classes.paper_black}>
                  <Youtube
                    songs={newSongs}
                    style={{ display: "flex", justifyContent: "center" }}
                    favorite_room={structure.favorite_room}
                    room_id={structure.id}
                    youtube_position_queue={this.state.youtube_position_queue}
                    admin={structure.admin}
                  />
                </Paper>
              </Grid>
              {/* Recent Room_list */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Room_list
                    songs={newSongs}
                    selected={this.state.get_position}
                    room_id={structure.id}
                    favorite_room={structure.favorite_room}
                    updating_room_state={this.adding_removing_song.bind(this)}
                    change_state_queue={this.change_state_queue.bind(this)}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("rooms");
  Meteor.subscribe("links");
  const userId = Meteor.userId();
  const user = Meteor.user();
  return {
    userId,
    user,
    songs: Links.find({ _id: userId }).fetch()
  };
})(withStyles(dashboard_styles)(Dashboard));
