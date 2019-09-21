import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import RegisterPage from "./pages/register/register-page";
import ApplicationsPage from "./pages/applications/applications-page";
import NewApplicationPage from "./pages/new-application/new-application-page";

const Router = (
  <Switch>
    <Route exact path="/" render={props => <Dashboard {...props} />} />
    <Route
      exact
      path="/applications"
      render={props => <ApplicationsPage {...props} />}
    />
    <Route
      exact
      path="/application/new"
      render={props => <NewApplicationPage {...props} />}
    />
    {/* <Route path="/login" render={props => <LoginPage {...props} />} /> */}
    <Route path="/register" component={RegisterPage} />
  </Switch>
);

export default Router;
