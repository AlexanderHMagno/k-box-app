import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
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

function Header(props) {
  const { classes, onDrawerToggle } = props;
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    onDrawerToggle(newValue);
    setValue(newValue);
  }

  return (
    <React.Fragment>
      <NavBar onDrawerToggle={() => myFunction()} />
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
        <Tabs value={value} onChange={handleChange} textColor="inherit">
          <Tab textColor="inherit" label="Search by Artist" />
          <Tab textColor="inherit" label="Search by Song" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
