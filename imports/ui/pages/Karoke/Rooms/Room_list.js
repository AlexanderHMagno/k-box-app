import React from "react";
import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import HomeIcon from "@material-ui/icons/PlaylistAddTwoTone";
import Tooltip from "@material-ui/core/Tooltip";
import Title from "./Title";
import Search from "../../Profile/Content";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
});

class ListOfSongs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      search_drawer_open: false
    };
  }
  componentWillMount() {
    if (this.props.favorite_room == "yes") {
      // this.setState({
      //   songs: this.props.songs[0].favorites
      // });
    } else {
      this.setState({
        songs: this.props.songs[0].tracks
      });
    }
  }

  componentWillReceiveProps(props) {
    if (props.favorite_room == "yes") {
      if (this.props.songs.length) {
        this.setState({
          songs: props.songs[0].favorites
        });
      }
    } else {
      this.setState({
        songs: props.songs[0].tracks
      });
    }
  }

  toggle_search_drawer() {
    this.setState({
      search_drawer_open: !this.state.search_drawer_open
    });
  }

  render() {
    const {
      classes,
      room_id,
      favorite_room,
      updating_room_state,
      change_state_queue,
      songs
    } = this.props;
    console.log(songs.length);
    const newSongs = songs.length ? songs[0].favorites : songs;

    return (
      <React.Fragment>
        <Title>Comming Soon</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Singer </TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newSongs.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.artist}</TableCell>
                {row.singer !== undefined && (
                  <TableCell>{row.singer}</TableCell>
                )}
                {row.singer === undefined && (
                  <TableCell>{Meteor.user().username}</TableCell>
                )}

                <TableCell align="right">
                  <Tooltip title="Play Next">
                    <HomeIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => change_state_queue(index)}
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link
            color="secondary"
            onClick={() => this.toggle_search_drawer()}
            style={{ cursor: "pointer" }}
          >
            {!this.state.search_drawer_open && "Add More Songs!"}
            {this.state.search_drawer_open && "Close the search bar"}
          </Link>
          {this.state.search_drawer_open && (
            <div>
              <br />
              <Search
                source_of_request="room"
                room_id={room_id}
                favorite_room={favorite_room}
                // updating_room_state={this.adding_removing_song.bind(this)}
                updating_room_state={updating_room_state}
              />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ListOfSongs);
