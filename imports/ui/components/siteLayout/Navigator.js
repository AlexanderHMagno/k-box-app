import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VoiceIcon from "@material-ui/icons/DiscFull";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { Meteor } from "meteor/meteor";

const categories = [
  {
    id: "Your K-Zone",
    children: [
      {
        id: "Search",
        icon: <SearchIcon />,
        route: "/search"
      },
      {
        id: "Favorites",
        icon: <FavoriteIcon />,
        route: "/favorites"
      },
      {
        id: "Karaoke",
        icon: <VoiceIcon />,
        route: "/karaoke"
      },
      { id: "Friends", icon: <PeopleIcon />, route: "/friends" }
    ]
  }
];

const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      color: "#f50057"
    }
  },
  itemCategory: {
    backgroundColor: "#000000",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white
  },

  navLinks: {
    textDecoration: "none"
  },
  itemPrimary: {
    fontSize: "inherit"
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  logo: {
    width: "100%",
    height: "100px",
    padding: "20px",
    marginTop: "10px"
  },
  profileImg: {
    borderRadius: "50%",
    width: "50%"
  },

  logoutBtn: {
    color: "white"
  }
});

class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: true
    };
  }
  render() {
    const { classes, ...other } = this.props;
    return (
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItem
            className={clsx(
              classes.firebase,
              classes.item,
              classes.itemCategory
            )}
          >
            <img
              src={"http://www.kbktv.com/kbktv/images/kbox_logo_new.png"}
              alt="logo"
              className={clsx(classes.logo)}
            />
          </ListItem>
          <ListItem className={clsx(classes.item, classes.itemCategory)}>
            <ListItemIcon className={classes.itemIcon}>
              <HomeIcon />
            </ListItemIcon>
            <Link className={classes.navLinks} to="/karoke">
              <ListItemText
                classes={{
                  primary: classes.item
                }}
              >
                <Grid item>
                  <IconButton
                    color="inherit"
                    className={classes.iconButtonAvatar}
                  />
                  {Meteor.user().username}
                </Grid>
              </ListItemText>
            </Link>
          </ListItem>
          {categories.map(({ id, children }) => (
            <React.Fragment key={id}>
              <ListItem className={classes.categoryHeader}>
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary
                  }}
                >
                  {id}
                </ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, route }) => (
                <Link to={route} className={classes.navLinks} key={childId}>
                  <ListItem button className={clsx(classes.item)}>
                    <ListItemIcon className={classes.itemIcon}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      classes={{
                        primary: classes.itemPrimary
                      }}
                    >
                      {childId}
                    </ListItemText>
                  </ListItem>
                </Link>
              ))}
              <Divider className={classes.divider} />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    );
  }
}
Navigator.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Navigator);
