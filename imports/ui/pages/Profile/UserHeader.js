import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import SettingsPowerIcon from "@material-ui/icons/SettingsPower";
import NavBar from "../../components/siteLayout/NavBar";
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

// function Header(props) {
//   const { classes, onDrawerToggle } = props;
class Header extends Component {
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
      <React.Fragment>
        <NavBar onDrawerToggle={() => myFunction()} />
        {/* <AppBar color="primary" position="sticky" elevation={0}>
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
                <IconButton
                  color="inherit"
                  className={classes.iconButtonAvatar}
                >
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
                  <SettingsPowerIcon
                    className={classes.logoutBtn}
                    alt="Logout"
                  />
                  <Typography className={classes.logoutBtn}>
                    {" "}
                    Logout{" "}
                  </Typography>
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar> */}
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs>
                <Typography color="inherit" variant="h5" component="h1">
                  Add Artists to Favourites
                </Typography>
              </Grid>
              <Grid item>
                {/* <Button
                className={classes.button}
                variant="outlined"
                color="inherit"
                size="small"
              >
                Web setup
              </Button> */}
              </Grid>
              <Grid item>
                {/* <Tooltip title="Help"> */}
                {/* <IconButton color="inherit">
                  <HelpIcon />
                </IconButton> */}
                {/* </Tooltip> */}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Tabs value={0} textColor="inherit">
            <Tab textColor="inherit" label="Search K-Box Music Artists" />
          </Tabs>
        </AppBar>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
  // onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
