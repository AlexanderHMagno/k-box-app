import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Links } from "../../../api/links";
import { Meteor } from "meteor/meteor";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { withTracker } from "meteor/react-meteor-data";

const MySwal = withReactContent(Swal);
const styles = theme => ({
  root: {
    width: "60%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    margin: "auto"
  },
  table: { flex: 1 },
  styletable: {
    backgroundColor: "#f50057",
    fontSize: "24px"
  },
  el: { width: "50px" },
  color: {
    color: "white"
  }
});

class FavoriteContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  removeFav(title, artist, owner) {
    Meteor.call("links.removeFavorites", owner, title, artist);
    this.setState({
      visible: !this.state.visible
    });
    MySwal.fire({
      html: `<span>${title} of ${artist} <br>has been <b>Removed</b> from your favorites</span>`,
      type: "error",
      confirmButtonColor: "red"
    });
  }

  render() {
    console.log(this.props);
    const { classes, userId, favorites, user } = this.props;
    console.log(user, "fetch user");
    let hasFavorites = false;
    if (
      favorites &&
      favorites.length &&
      favorites[0].favorites &&
      favorites[0].favorites.length
    ) {
      hasFavorites = true;
    }

    return (
      <Paper className={classes.root}>
        <Typography color="textSecondary" align="center">
          {!hasFavorites && "Start adding your favorites! "}
        </Typography>
        {hasFavorites && (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.styletable}>Artist</TableCell>
                <TableCell className={classes.styletable}>Song Title</TableCell>
                <TableCell className={classes.styletable} />
              </TableRow>
            </TableHead>

            <TableBody>
              {favorites.map((fav, i) => {
                if (fav.favorites) {
                  return fav.favorites.map((data, i) => {
                    return (
                      <TableRow key={`row-${i}`}>
                        <TableCell>{data.artist}</TableCell>
                        <TableCell>{data.title}</TableCell>
                        <TableCell className={classes.el}>
                          <IconButton
                            aria-label="Delete"
                            onClick={() =>
                              this.removeFav(data.title, data.artist, userId)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  });
                }
              })}
            </TableBody>
          </Table>
        )}
      </Paper>
    );
  }
}

FavoriteContent.propTypes = {
  classes: PropTypes.object.isRequired,
  favorites: PropTypes.array,
  userId: PropTypes.string
};

// do fetch in with tracker because withtracker is HOC - checks database and passes as prop - display it

export default withTracker(() => {
  Meteor.subscribe("links");
  const userId = Meteor.userId();
  const user = Meteor.user();
  return {
    favorites: Links.find({ _id: userId }).fetch(),
    userId,
    user
  };
})(withStyles(styles)(FavoriteContent));
