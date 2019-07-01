import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import FriendList from "./subpages/FriendList";
import PendingRequest from "./subpages/PendingRequest";
import AddFriends from "./subpages/AddFriends";
import KboxUsers from "./subpages/KboxUsers";
import NavBar from "../../components/siteLayout/NavBar";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#000000"
    // theme.palette.background.paper
  }
}));

function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} textColor="inherit">
          <Tab textColor="inherit" label="Friends List" />
          <Tab textColor="inherit" label="K-BOX USERS" />
          <Tab textColor="primary" label="Pending Requests" />
          <Tab textColor="primary" label="Pending Invitations" />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <FriendList />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <KboxUsers />
        </TabContainer>
      )}
      {value === 2 && <TabContainer>{<PendingRequest />}</TabContainer>}
      {value === 3 && (
        <TabContainer>
          <AddFriends />
        </TabContainer>
      )}
    </div>
  );
}

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
  const { classes } = props;
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
                Connect with other K-BOX USERS
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <SimpleTabs />
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
