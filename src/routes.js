import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./pages/login/login-page";
import Dashboard from "./pages/dashboard/dashboard";
import RegisterPage from "./pages/register/register-page";

const Router = (
  <Switch>
    <Route exact path="/" render={props => <Dashboard />} />
    <Route path="/login" render={props => <LoginPage {...props} />} />
    <Route path="/register" component={RegisterPage} />
  </Switch>
);

export default Router;
