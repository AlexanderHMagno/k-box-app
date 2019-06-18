import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Karoke from "../pages/Karoke";

export default () => (
  <Fragment>
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/karoke" component={Karoke} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/:userid" component={Profile} />
      <Redirect from="*" to="/karoke" />
    </Switch>
  </Fragment>
);
