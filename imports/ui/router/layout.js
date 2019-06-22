import React, { Fragment, Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Karoke from "../pages/Karoke";
import UserFavorites from "../components/siteLayout/UserFavorites";

class Router extends Component {
  render() {
    if (Meteor.user()) {
      return (
        <Fragment>
          <Switch>
            <Route exact path="/karoke" component={Karoke} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/:userid" component={Profile} />
            <Route exact path="/favorites" component={UserFavorites} />
            <Redirect from="*" to="/profile" />
          </Switch>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Redirect from="*" to="/home" />
            {/* 
            <Route exact path="/karoke" component={Karoke} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/:userid" component={Profile} />
            <Route exact path="/favorites" component={UserFavorites} />
            <Redirect from="*" to="/profile" /> */}
          </Switch>
        </Fragment>
      );
    }
  }
}
export default Router;
