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
import Gravatar from "react-gravatar";

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
  },
  Avater: {
    borderRadius: "50%"
  }
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: true
    };
  }

  render_name() {
    let name = "";
    try {
      name = Meteor.user().username;
    } catch (err) {
      name = "voldemort";
    }
    return name;
  }
  logout() {
    Meteor.logout(err => true);
  }

  render() {
    const { classes, onDrawerToggle } = this.props;
    const image_avatar = Meteor.userId() + "?d=robohash";

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
                <Tooltip title={this.render_name()}>
                  <Gravatar
                    className={classes.avatar}
                    email={image_avatar}
                    size={20}
                    alt="My Avatar"
                  />
                </Tooltip>
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
