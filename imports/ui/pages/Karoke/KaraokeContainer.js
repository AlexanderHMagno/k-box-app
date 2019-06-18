import React, { Component } from "react";
import Karaoke from "./Karaoke";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class KaraokeContainer extends Component {
  render() {
    return <Karaoke classes={this.props.classes} />;
  }
}
export default withStyles(styles)(KaraokeContainer);
