import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Navigator from "../../components/siteLayout/Navigator";
import ArtistSearcher from "./ArtistSearcher";
import SearchHeader from "./SearchHeader";
import { userStyles, drawerWidth, theme } from "./styles";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

class Search extends React.Component {
  state = {
    mobileOpen: false,
    currenttab: 0
  };

  handleDrawerToggle = data => {
    this.setState({ currenttab: data });
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator PaperProps={{ style: { width: drawerWidth } }} />
            </Hidden>
          </nav>
          <div className={classes.appContent}>
            <SearchHeader onDrawerToggle={this.handleDrawerToggle.bind(this)} />
            <main className={classes.mainContent}>
              <ArtistSearcher
                source_of_request="search_favorites"
                room_id={1}
                selectedTab={this.state.currenttab}
              />
            </main>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTracker(() => {
  Meteor.subscribe("rooms");
  Meteor.subscribe("links");
  const userId = Meteor.userId();
  const user = Meteor.user();
  return {
    userId,
    user
  };
})(withStyles(userStyles)(Search));
