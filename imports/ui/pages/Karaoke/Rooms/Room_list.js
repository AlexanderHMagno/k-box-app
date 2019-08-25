import React from "react";
import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import HomeIcon from "@material-ui/icons/PlaylistAddTwoTone";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import PlayNowIcon from "@material-ui/icons/PlayArrow";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Title from "./Title";
import Search from "../../Search/ArtistSearcher";
import Typography from "@material-ui/core/Typography";
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
      search_drawer_open: false,
      searchBy: 0,
      buttons: { Artist: "secondary", song: "default" }
    };
  }
  componentWillMount() {
    this.setState({
      songs: this.props.songs
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      songs: props.songs
    });
  }
  selectTab(searchBy, event) {
    this.setState({ searchBy });
    event === "artist"
      ? this.setState({ buttons: { Artist: "secondary", song: "default" } })
      : this.setState({ buttons: { Artist: "default", song: "secondary" } });
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
      options: { changeStateQueue, removeFromQueue, playNextSong },
      admin
    } = this.props;
    const administrator = admin._id === Meteor.userId();

    return (
      <React.Fragment>
        <Title>Coming Soon</Title>
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
            {this.state.songs.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.artist}</TableCell>
                <TableCell>{row.singer || Meteor.user().username}</TableCell>
                <TableCell align="right">
                  {administrator && (
                    <Tooltip title="Play now">
                      <PlayNowIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => console.log(index)}
                      />
                    </Tooltip>
                  )}
                  {administrator && (
                    <Tooltip title="Play Next">
                      <HomeIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => changeStateQueue(index)}
                      />
                    </Tooltip>
                  )}

                  {(Meteor.user().username === row.singer || administrator) && (
                    <Tooltip title="Remove">
                      <RemoveIcon
                        color={"secondary"}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          removeFromQueue(
                            row.title,
                            row.artist,
                            row.singerId,
                            room_id,
                            favorite_room
                          )
                        }
                      />
                    </Tooltip>
                  )}
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
            {!this.state.search_drawer_open
              ? "Add More Songs!"
              : "Close the search bar"}
          </Link>
          {this.state.search_drawer_open && (
            <div>
              <Typography>Search By</Typography>
              <Button
                variant="contained"
                color={this.state.buttons.Artist}
                onClick={() => this.selectTab(0, "artist")}
              >
                Artist
              </Button>
              <Button
                variant="contained"
                color={this.state.buttons.song}
                onClick={() => this.selectTab(1, "song")}
              >
                Song
              </Button>
              <div>
                <br />
                <Search
                  source_of_request="room"
                  room_id={room_id}
                  favorite_room={favorite_room}
                  updating_room_state={updating_room_state}
                  selectedTab={this.state.searchBy}
                />
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ListOfSongs);
