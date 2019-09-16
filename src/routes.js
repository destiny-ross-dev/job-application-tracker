import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import RegisterPage from "./pages/register/register-page";

const Router = (
  <Switch>
    <Route exact path="/" render={props => <Dashboard {...props} />} />
    {/* <Route path="/login" render={props => <LoginPage {...props} />} /> */}
    <Route path="/register" component={RegisterPage} />
  </Switch>
);

export default Router;
