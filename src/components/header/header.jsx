import React from "react";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import { triggerUserSettings } from "../../redux/settings/settings.actions";
import { Link } from "react-router-dom/cjs/react-router-dom";
import InputField from "../input-field/input-field";
const Header = ({
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
      <div>{/* <InputField placeholder="Search" /> */}</div>
      {isAuthenticated ? (
        <div className="SettingsContainer">
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
      {userSettingsOpen && <div className="UserSettings">{user.sub}</div>}
    </header>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.currentUser,
    menuExpanded: state.settings.menuExpanded,
    userSettingsOpen: state.settings.userSettingsOpen
  };
};
const mapDispatchToProps = dispatch => ({
  setCurrentUser: () => dispatch(setCurrentUser()),
  triggerUserSettings: isOpen => dispatch(triggerUserSettings(isOpen))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
