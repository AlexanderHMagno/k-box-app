import React, { Fragment, Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Karoke from "../pages/Karoke";
import UserFavorites from "../components/siteLayout/UserFavorites";
import { withTracker } from "meteor/react-meteor-data";

class Router extends Component {
  render() {
    const A = (
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

    const B = (
      <Fragment>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Redirect from="*" to="/home" />

          {/* 

    <Route exact path="/profile" component={Profile} />
    <Route exact path="/profile/:userid" component={Profile} />
    <Route exact path="/favorites" component={UserFavorites} />
    <Redirect from="*" to="/profile" /> */}
        </Switch>
      </Fragment>
    );

    console.log("IN THE ROUTING COMPONENT");
    if (Meteor.user()) {
      return A;
    } else {
      return B;
    }
  }
}
export default Router;
