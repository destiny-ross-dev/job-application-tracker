import React, { useState } from "react";
import { connect } from "react-redux";
import InputField from "../../components/input-field/input-field";
import { setCurrentUser } from "../../redux/user/user.actions";

const NotAuthed = ({ setCurrentUser }) => {
  const [loginObj, setLoginObj] = useState({
    email: "",
    password: ""
  });
  const handleInput = e => {
    setLoginObj({ ...loginObj, [e.target.name]: e.target.value });
  };
  const onLoginClick = ({ menuExpanded }) => {
    let { email, password } = loginObj;
    setCurrentUser(email, password);
  };
  return (
    <div className="NotAuthed">
      <div className="LoginContainer">
        <h1>Login</h1>
        <InputField
          type="text"
          name="email"
          value={loginObj.email}
          onChange={handleInput}
          label="Email Address"
        />
        <InputField
          type="password"
          name="password"
          value={loginObj.password}
          onChange={handleInput}
          label="Password"
        />
        <button onClick={onLoginClick}>Login</button>
      </div>
      <div className="SideStuff"></div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (email, password) => dispatch(setCurrentUser(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotAuthed);
