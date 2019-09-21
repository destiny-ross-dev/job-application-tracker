import React from "react";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import {
  triggerUserSettings,
  triggerAddObject
} from "../../redux/settings/settings.actions";
import { Link } from "react-router-dom/cjs/react-router-dom";
import InputField from "../input-field/input-field";
const Header = ({
  addObjectOpen,
  triggerAddObject,
  menuExpanded,
  isAuthenticated,
  user,
  setCurrentUser,
  userSettingsOpen,
  triggerUserSettings
}) => {
  const onLoginClick = () => {
    setCurrentUser();
  };

  return (
    <header className={menuExpanded ? "Header" : "Header Header--minimized"}>
      <div className="Spacer"></div>
      {isAuthenticated ? (
        <div className="SettingsContainer">
          <div onClick={() => triggerAddObject(!addObjectOpen)}>
            <i className="far fa-plus"></i>
          </div>
          <div>
            <i className="fas fa-bell"></i>
          </div>
          <div
            className="UserInfo"
            onClick={() => triggerUserSettings(!userSettingsOpen)}
          >
            <p>{`${user.firstname} ${user.lastname}`}</p>
            <i className="fas fa-chevron-down"></i>
          </div>
          <div className="UserInfo__Avatar">
            {user.picture ? (
              <img
                className="UserInfo__Avatar"
                src={user.picture}
                alt="User avatar"
              />
            ) : (
              "DR"
            )}
          </div>
        </div>
      ) : (
        <div className="AuthOptionsContainer">
          <Link to="/register">Register</Link>
          <button className="LoginButton" onClick={onLoginClick}>
            Login
          </button>
        </div>
      )}
      {addObjectOpen && (
        <div className="AddNav">
          <Link to="/application/new">Add Application</Link>
          <Link to="/company/new">Add Company</Link>
        </div>
      )}
      {userSettingsOpen && user && (
        <div className="UserSettings">
          <h2>
            {user.firstname} {user.lastname}
          </h2>
          <Link to="/settings">Account Settings</Link>
          <Link to="/profile">My Profile</Link>
          <button>Log out</button>
        </div>
      )}
    </header>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.currentUser,
    menuExpanded: state.settings.menuExpanded,
    userSettingsOpen: state.settings.userSettingsOpen,
    addObjectOpen: state.settings.addObjectOpen
  };
};
const mapDispatchToProps = dispatch => ({
  setCurrentUser: () => dispatch(setCurrentUser()),
  triggerUserSettings: isOpen => dispatch(triggerUserSettings(isOpen)),
  triggerAddObject: isOpen => dispatch(triggerAddObject(isOpen))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
