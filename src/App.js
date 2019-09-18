import React from "react";
import NavBar from "./components/navbar/navbar";
import Header from "./components/header/header";
import "./scss/main.scss";
import { withRouter } from "react-router-dom";
import Router from "./routes";

function App({ history, location }) {
  return (
    <div className="App">
      <Header />
      <NavBar />
      {Router}
    </div>
  );
}

export default withRouter(App);
