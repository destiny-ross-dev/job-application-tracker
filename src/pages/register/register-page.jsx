import React, { useState } from "react";
import { connect } from "react-redux";
import InputField from "../../components/input-field/input-field";
import { registerUser } from "../../redux/user/user.actions";

const RegisterPage = ({ menuExpanded, registerUser, history }) => {
  const [registerObj, setRegisterObj] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });
  const handleInput = e => {
    setRegisterObj({ ...registerObj, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let { email, firstname, lastname, password } = registerObj;
    await registerUser(email, firstname, lastname, password);
    history.push("/");
  };
  return (
    <div
      className={`RegisterPage ${
        menuExpanded
          ? "PageContainer"
          : "PageContainer PageContainer--maximized"
      }`}
    >
      <div className="RegisterForm">
        <h1>Register</h1>
        <p>Keep up on your job search by creating an account.</p>
        <div className="SocialSignInContainer">
          <button>Register with Gmail</button>
          <button>Register with LinkedIn</button>
          {/* <button> Facebook</button> */}
        </div>

        <InputField
          type="text"
          name="firstname"
          value={registerObj.firstname}
          onChange={handleInput}
          label="First Name"
        />
        <InputField
          type="text"
          name="lastname"
          value={registerObj.lastname}
          onChange={handleInput}
          label="Last Name"
        />
        <InputField
          type="text"
          name="email"
          value={registerObj.email}
          onChange={handleInput}
          label="Email Address"
        />
        <InputField
          type="password"
          name="password"
          value={registerObj.password}
          onChange={handleInput}
          label="Password"
        />
        <button onClick={handleSubmit}>Register</button>
      </div>
      <div className="RegisterIllustration"></div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    menuExpanded: state.settings.menuExpanded
  };
};

const mapDispatchToProps = dispatch => ({
  registerUser: (email, firstname, lastname, password) =>
    dispatch(registerUser(email, firstname, lastname, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
