import React, { Component } from "react";
import Favorite from "./Favorite";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class FavoriteContainer extends Component {
  render() {
    return <Favorite classes={this.props.classes} />;
  }
}
export default withStyles(styles)(FavoriteContainer);
