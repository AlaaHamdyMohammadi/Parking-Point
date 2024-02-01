import React, { useState } from "react";
import "./register.css";
import { useSpring, animated } from "react-spring";

function Register() {
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const loginProps = useSpring({
    left: registrationFormStatus ? -500 : 0, // Login form sliding positions
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500, // Register form sliding positions
  });

  const loginBtnProps = useSpring({
    borderBottom: registrationFormStatus ? "solid 0px transparent" : "solid 2px #1059FF", //Animate bottom border of login button
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus ? "solid 2px #1059FF" : "solid 0px transparent", //Animate bottom border of register button
  });

  function registerClicked() {
    setRegistartionFormStatus(true);
  }
  function loginClicked() {
    setRegistartionFormStatus(false);
  }

  return (
    <div className="background">
      <div className="login-register-wrapper">
        <div className="nav-buttons">
          <animated.button onClick={loginClicked} id="loginBtn" style={loginBtnProps}>
            Login
          </animated.button>
          <animated.button onClick={registerClicked} id="registerBtn" style={registerBtnProps}>
            Register
          </animated.button>
        </div>
        <div className="form-group">
          <animated.form action="" id="loginform" style={loginProps}>
            <LoginForm />
          </animated.form>
          <animated.form action="" id="registerform" style={registerProps}>
            <RegisterForm />
          </animated.form>
        </div>
        <animated.div className="forgot-panel" style={loginProps}>
          <a herf="#">Forgot your password</a>
        </animated.div>
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <React.Fragment>
      <label htmlFor="username">USERNAME</label>
      <input type="text" id="username" />
      <label htmlFor="password">PASSWORD</label>
      <input type="text" id="password" />
      <input type="submit" value="submit" className="submit" />
    </React.Fragment>
  );
}

function RegisterForm() {
  return (
    <React.Fragment>
      <label htmlFor="fullname">full name</label>
      <input type="text" id="fullname" />
      <label htmlFor="fullname">full name</label>
      <input type="text" id="fullname" />
      <label htmlFor="fullname">full name</label>
      <input type="text" id="fullname" />
      <label htmlFor="fullname">full name</label>
      <input type="text" id="fullname" />
      <label htmlFor="fullname">full name</label>
      <input type="text" id="fullname" />
      <label htmlFor="email">email</label>
      <input type="text" id="email" />
      <label htmlFor="password">password</label>
      <input type="text" id="password" />
      <label htmlFor="confirmpassword">confirm password</label>
      <input type="text" id="confirmpassword" />
      <input type="submit" value="submit" className="submit" />
    </React.Fragment>
  );
}

export default Register;
