import React from "react";
import { connect } from "react-redux";
import { isEmpty } from "../../utils";
import NotAuthed from "./not-authed";

const Dashboard = ({ menuExpanded, user }) => {
  return (
    <div
      className={`DashboardPage ${
        menuExpanded
          ? "PageContainer"
          : "PageContainer PageContainer--maximized"
      }`}
    >
      {isEmpty(user) ? <NotAuthed /> : <h1>{user.firstname}</h1>}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    menuExpanded: state.settings.menuExpanded
  };
};

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
