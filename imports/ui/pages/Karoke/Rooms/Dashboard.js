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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      open_room: false,
      room_info: [],
      setOpen: "",
      list_to_play: ""
    };
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

  adding_removing_song() {
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

  render() {
    const { structure, classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
                    songs={this.state.list_to_play}
                    style={{ display: "flex", justifyContent: "center" }}
                    favorite_room={structure.favorite_room}
                    room_id={structure.id}
                  />
                </Paper>
              </Grid>
              {/* Recent Room_list */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Room_list
                    songs={this.state.list_to_play}
                    selected={this.state.get_position}
                    room_id={structure.id}
                    favorite_room={structure.favorite_room}
                    updating_room_state={this.adding_removing_song.bind(this)}
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

export default withStyles(dashboard_styles)(Dashboard);
