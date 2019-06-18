import React, { Component } from "react";
import Profile from "./Profile";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class ProfileContainer extends Component {
  render() {
    return <Profile classes={this.props.classes} />;
  }
}
export default withStyles(styles)(ProfileContainer);
