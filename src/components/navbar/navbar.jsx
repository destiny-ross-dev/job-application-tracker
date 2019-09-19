import React from "react";
import { connect } from "react-redux";
import {
  triggerMenuExpandCollapse,
  triggerUserSettings
} from "../../redux/settings/settings.actions";
import NavItem from "../nav-item/nav-item";
import {
  logoutCurrentUser,
  setCurrentUser
} from "../../redux/user/user.actions";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom";
import { isEmpty } from "../../utils";
const NavBar = ({
  menuExpanded,
  triggerMenuExpandCollapse,
  logout,
  history,
  setCurrentUser,
  user,
  triggerUserSettings
}) => {
  const onLogout = () => {
    triggerUserSettings(false);
    logout();
    history.push("/");
  };

  const onLogin = () => {
    setCurrentUser();
  };
  return (
    <nav className={menuExpanded ? "NavBar" : "NavBar NavBar--minimized"}>
      <div className="NavBar__Logo">
        <Link to="/">
          <h2>Track.it</h2>
        </Link>
      </div>
      <div className="NavBar__NavItems">
        <NavItem text="Dashboard" path="/" fontAwesomeClassName="fas fa-home" />
        <NavItem
          text="Applications"
          path="/applications"
          fontAwesomeClassName="fas fa-analytics"
        />
        <NavItem
          text="Companies"
          path="/companies"
          fontAwesomeClassName="fas fa-building"
        />
        <NavItem
          text="Contacts"
          path="/contacts"
          fontAwesomeClassName="far fa-address-book"
        />
        <NavItem
          text="Documents"
          path="/documents"
          fontAwesomeClassName="fas fa-file-alt"
        />
        <div className="Spacer"></div>
      </div>
      <NavItem
        text="Settings"
        path="/settings"
        fontAwesomeClassName="fas fa-cog"
      />
      {isEmpty(user) && (
        <div className="NavItem" onClick={onLogin}>
          <div>
            <i className="fas fa-sign-in"></i>
            {menuExpanded ? <p>Login</p> : null}
          </div>
        </div>
      )}
      {!isEmpty(user) && (
        <div className="NavItem" onClick={onLogout}>
          <div>
            <i className="fas fa-sign-out"></i>
            {menuExpanded ? <p>Logout</p> : null}
          </div>
        </div>
      )}
      <div
        onClick={triggerMenuExpandCollapse}
        className="ExpandTriggerContainer"
      >
        <i className="far fa-chevron-left expand-trigger"></i>
      </div>
    </nav>
  );
};
const mapStateToProps = state => {
  return {
    menuExpanded: state.settings.menuExpanded,
    user: state.user.currentUser
  };
};
const mapDispatchToProps = dispatch => ({
  triggerMenuExpandCollapse: () => dispatch(triggerMenuExpandCollapse()),
  logout: () => dispatch(logoutCurrentUser()),
  setCurrentUser: () => dispatch(setCurrentUser()),
  triggerUserSettings: isOpen => dispatch(triggerUserSettings(isOpen))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
);
