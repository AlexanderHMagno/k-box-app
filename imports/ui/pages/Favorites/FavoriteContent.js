import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { render } from "react-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Links } from "../../../api/links";
import { Meteor } from "meteor/meteor";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
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
    this.checkFavorites = React.createRef();
    this.state = {
      favorites: Links.find({ _id: Meteor.userId() }).fetch(),
      visible: true
    };
  }

  removeFav(title, artist, owner) {
    Links.update(
      { _id: owner },
      { $pull: { favorites: { title: title, artist: artist } } }
    );
    this.setState({
      visible: !this.state.visible,
      favorites: Links.find({ _id: Meteor.userId() }).fetch()
    });
    MySwal.fire({
      html: `<span>${title} of ${artist} <br>has been <b>Removed</b> from your favorites</span>`,
      type: "error",
      confirmButtonColor: "red"
    });
  }

  render() {
    const { favorites } = this.state;
    let hasFavorites = false;
    if (
      favorites &&
      favorites.length &&
      favorites[0].favorites &&
      favorites[0].favorites.length
    ) {
      hasFavorites = true;
    }

    const { classes } = this.props;
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
                              this.removeFav(
                                data.title,
                                data.artist,
                                Meteor.userId()
                              )
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
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(FavoriteContent);
