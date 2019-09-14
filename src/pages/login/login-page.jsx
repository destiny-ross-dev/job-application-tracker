import React from "react";
import { connect } from "react-redux";

const LoginPage = ({ menuExpanded }) => {
  return (
    <div
      className={`LoginPage ${
        menuExpanded
          ? "PageContainer"
          : "PageContainer PageContainer--maximized"
      }`}
    >
      <div>Log In</div>
      <div>Register</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    menuExpanded: state.settings.menuExpanded
  };
};

export default connect(
  mapStateToProps,
  {}
)(LoginPage);
