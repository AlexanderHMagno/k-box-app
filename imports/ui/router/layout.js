import React, { Fragment, Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Karaoke from "../pages/Karaoke";
import Favorite from "../pages/Favorites";
import Friends from "../pages/Friends";

class Router extends Component {
  render() {
    const userRoutes = (
      <Fragment>
        <Switch>
          <Route exact path="/karaoke" component={Karaoke} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/search/:userid" component={Search} />
          <Route exact path="/favorites" component={Favorite} />
          <Route exact path="/friends" component={Friends} />

          <Redirect from="*" to="/karaoke" />
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

    if (Meteor.user()) {
      return userRoutes;
    } else {
      return nonUserRoutes;
    }
  }
}
export default Router;
