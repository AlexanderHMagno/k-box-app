import React, { Component } from "react";
import Friend from "./Friend";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class FriendsContainer extends Component {
  render() {
    return <Friend classes={this.props.classes} />;
  }
}
export default withStyles(styles)(FriendsContainer);
