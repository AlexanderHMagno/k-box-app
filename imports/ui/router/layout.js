import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Karoke from "../pages/Karoke";
import { ViewerContext } from "../context/ViewerProvider";

export default () => (
  <ViewerContext.Consumer>
    {({ viewer, loading }) => {
      if (loading) return null;
      if (!viewer) {
        return (
          <Switch>
            {/* <Route exact path="/welcome" component={Home} />
            <Redirect from="*" to="/welcome" /> */}
          </Switch>
        );
      } else {
        return (
          <Fragment>
            <Switch>
              <Route exact path="/karoke" component={Karoke} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/profile/:userid" component={Profile} />
              <Redirect from="*" to="/karoke" />
              <Route exact path="/welcome" component={Home} />
              <Redirect from="*" to="/welcome" />
            </Switch>
          </Fragment>
        );
      }
    }}
  </ViewerContext.Consumer>
);
