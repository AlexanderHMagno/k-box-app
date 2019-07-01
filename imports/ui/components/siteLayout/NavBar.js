import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import SettingsPowerIcon from "@material-ui/icons/SettingsPower";

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = theme => ({
  secondaryBar: {
    zIndex: 0
  },
  menuButton: {
    marginLeft: -theme.spacing(1)
  },
  iconButtonAvatar: {
    padding: 4
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white
    }
  },
  button: {
    borderColor: lightColor
  }
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: true
    };
  }

  logout() {
    Meteor.logout(err => {
      if (err) {
        console.log("error");
      } else {
        this.setState({ isLoggedin: !this.state.isLoggedin });
      }
    });
  }

  render() {
    const { classes, onDrawerToggle } = this.props;

    return (
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item />
            <Grid item>
              <Tooltip title="Alerts • No alters">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" className={classes.iconButtonAvatar}>
                <Avatar
                  className={classes.avatar}
                  src="/static/images/avatar/1.jpg"
                  alt="My Avatar"
                />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color="inherit"
                className={classes.iconButtonAvatar}
                onClick={this.logout.bind(this)}
              >
                <SettingsPowerIcon className={classes.logoutBtn} alt="Logout" />
                <Typography className={classes.logoutBtn}> Logout </Typography>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}
NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(NavBar);
