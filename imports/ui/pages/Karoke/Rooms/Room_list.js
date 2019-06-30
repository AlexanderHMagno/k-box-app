import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ADD_title from "@material-ui/icons/AddCircleSharp";
import Title from "./Title";
import { Links, Rooms } from "../../../../api/links";
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
      songs: "",
      search_drawer_open: false
    };
  }
  componentWillMount() {
    if (this.props.favorite_room == "yes") {
      this.setState({
        songs: this.props.songs[0].favorites
      });
    } else {
      this.setState({
        songs: this.props.songs[0].tracks
      });
    }
  }

  adding_removing_song() {
    const { room_id } = this.props;

    if (this.props.favorite_room === "yes") {
      this.setState({
        songs: Links.find(
          { _id: Meteor.userId() },
          { favorites: 1, _id: 0 }
        ).fetch()
      });
    } else {
      this.setState({
        songs: Rooms.find({ _id: room_id }, { tracks: 1, _id: 0 }).fetch()[0]
          .tracks
      });
    }
  }

  toggle_search_drawer() {
    this.setState({
      search_drawer_open: !this.state.search_drawer_open
    });
  }

  render() {
    const { classes, room_id, favorite_room } = this.props;

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
              <TableCell align="right">Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.songs.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.artist}</TableCell>
                <TableCell>{"Any"}</TableCell>
                <TableCell align="right">{"todo"}</TableCell>
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
                updating_room_state={this.adding_removing_song.bind(this)}
              />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ListOfSongs);
