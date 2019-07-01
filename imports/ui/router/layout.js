import React, { Fragment, Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Karoke from "../pages/Karoke";
import Favorite from "../pages/Favorites";
import Friends from "../pages/Friends";

class Router extends Component {
  render() {
    const userRoutes = (
      <Fragment>
        <Switch>
          <Route exact path="/karoke" component={Karoke} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/:userid" component={Profile} />
          <Route exact path="/favorites" component={Favorite} />
          <Route exact path="/friends" component={Friends} />
          <Redirect from="*" to="/karoke" />
        </Switch>
      </Fragment>
    );

    const nonUserRoutes = (
      <Fragment>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Redirect from="*" to="/home" />
        </Switch>
      </Fragment>
    );

    // console.log("IN THE ROUTING COMPONENT");
    if (Meteor.user()) {
      return userRoutes;
    } else {
      return nonUserRoutes;
    }
  }
}
export default Router;
