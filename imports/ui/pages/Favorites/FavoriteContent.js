import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import Api from "../../components/siteLayout/API";
// import { Meteor } from "meteor/mongo";
import { Links } from "../../../api/links";
// import RenderToLayer from "material-ui/internal/RenderToLayer";

const styles = theme => ({});

class FavoriteContent extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     id: ""
  //   };
  // }

  // favorite_id() {
  //   const { title, artist } = this.props;
  //   const showFavorite = Links.find({ artist: artist, title: title }).fetch();
  //   if (showFavorite.length > 0) {
  //     this.setState({
  //       id: showFavorite[0]._id
  //     });
  //   }
  // }

  // componentWillMount() {
  //   this.favorite_id();
  // }
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
  }

  componentWillMount() {
    //How to insert a room
    // Rooms.insert({
    //   name: "General",
    //   image:
    //     "https://cdn.pixabay.com/photo/2017/11/12/08/43/audio-2941753_1280.jpg",
    //   bio:
    //     "This room is dedicaded to any kind of music, Rock, Pop, And other artist.",
    //   users:[],
    //   tracks:[{owner,title,track}]
    //   password:''
    // });
    this.setState({
      // rooms: Rooms.find({}).fetch()
    });
  }

  render() {
    const { classes } = this.props;
    // let getFavorites;

    // let a = favorites;

    // if (a != null) {
    //   getFavorites = favorites.map(favorite => (
    //     <MediaControlCard key={favorite.id} />
    //   ));
    // } else {
    //   getFavorites = "";
    // }

    return (
      <div className={classes.container}>
        <div className={classes.subContainer}>
          {/* <Grid container alignContent="center" spacing={16}>
            <Grid item xs={12}> */}
          <Grid container />
          {/* {getFavorites} */}
          {/* {console.log(Links.find.fetch())} */}
          {/* </Grid>
          </Grid> */}
        </div>
      </div>
    );
  }
}

FavoriteContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FavoriteContent);
