import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { render } from "react-dom";
// // import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Links } from "../../../api/links";
import { Meteor } from "meteor/meteor";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import { withTracker } from "meteor/react-meteor-data";
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
  el: { width: "50px" }
});

class FavoriteContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //  users: Meteor.users.find({ _id: Meteor.userId() }).fetch(),
      favorites: Links.find({ _id: Meteor.userId() }).fetch(),
      visible: true
    };
  }

  // deletefav(i) {
  //   const { favorites } = this.state;
  //   if (favorites.favorites !== null) console.log("delete");
  //   //  favorites.splice(i, 1);
  //   //  this.setState({ favorites });
  // }
  removeFav(title, artist, owner) {
    console.log(owner, "owner");
    console.log("Links", Links);
    Links.update(
      { _id: owner },
      { $pull: { favorites: { title: title, artist: artist } } }
    );
    this.setState({
      // visible: !this.state.visible
    });
    MySwal.fire({
      html: `<span>${title} of ${artist} <br>has been <b>Removed</b> from your favorites</span>`,
      type: "error",
      confirmButtonColor: "red"
    });
  }

  render() {
    // const { classes } = this.props;
    const { favorites } = this.state;
    console.log(favorites);
    console.log(this.state.users, "users");

    const { classes, title, artist, owner } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.styletable}>Artist</TableCell>
              <TableCell className={classes.styletable}>Song Title </TableCell>
              <TableCell className={classes.styletable} />
            </TableRow>
          </TableHead>
          <TableBody>
            {favorites.map((fav, i) => {
              if (fav.favorites) {
                return fav.favorites.map((data, i) => {
                  console.log(data);
                  return (
                    <TableRow key={`row-${i}`}>
                      <TableCell>{data.artist}</TableCell>
                      <TableCell>{data.title}</TableCell>
                      <TableCell className={classes.el}>
                        <IconButton
                          aria-label="Delete"
                          // onClick={this.deletefav.bind(this, i)}

                          onClick={() =>
                            this.removeFav(
                              data.artist,
                              data.title,
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
      </Paper>
    );
  }
}

export default withStyles(styles)(FavoriteContent);

// export default withTracker(() => {
//   const user = Meteor.user();
// 	return {
// 		user
// 	};
// })withStyles(styles)(FavoriteContent);
