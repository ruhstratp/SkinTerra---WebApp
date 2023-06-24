import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../assets/css/auth.css";
import "../assets/css/auth-responsive.css";
import loginimg from "../assets/img/loginimg.png";
import registerimg from "../assets/img/registerimg.png";
import axios from "../api/AxiosInstance";

function Auth({ onLoggedIn, onClose }) {
  const [account, setAccount] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [resetEmail, setResetEmail] = useState("");

  let [authMode, setAuthMode] = useState("signin");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, first_name, last_name } = account;

    const url =
      authMode === "signin" ? "/api/users/login" : "/api/users/register";

    try {
      const data =
        authMode === "signin"
          ? { email, password }
          : { email, password, firstName: first_name, lastName: last_name };

      const response = await axios.post(url, data);

      console.log("Success:", response.data);
      // Save the token, isAdmin status and userId to localStorage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("isAdmin", response.data.isAdmin);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem(
        "user",
        JSON.stringify({ email: account.email, password: account.password })
      );
      navigate("/");
      onLoggedIn();
      onClose();
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/forgotPassword", {
        email: resetEmail,
      });
      if (response.data.success) {
        alert("Please check your email for password reset link.");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <CSSTransition
        in={authMode === "signin"}
        timeout={300}
        classNames="auth-form"
        unmountOnExit
      >
        <form onSubmit={handleSubmit}>
          <div className="login-form auth-form-transition">
            <div className="flex-col-11">
              <div className="login-title abrilfatface-normal-woodsmoke-38px">
                Log into your account
              </div>
              <div className="overlap-group3-6">
                <div className="sign-in-title abrilfatface-normal-woodsmoke-32px">
                  Sign In
                </div>
                <div className="overlap-group4-6">
                  <div className="username-fill">
                    <div className="overlap-group2-12">
                      <div
                        htmlFor="username"
                        className="e-mail-address-1 inter-medium-woodsmoke-15px"
                      >
                        <input
                          // ref={userEmail}
                          id="userEmail"
                          type="email"
                          className="auth-form-control"
                          placeholder="E-mail Address"
                          onChange={(e) =>
                            setAccount({ ...account, email: e.target.value })
                          }
                          value={account.email}
                        />
                      </div>
                    </div>
                    <div className="overlap-group1-11">
                      <div className="password-1 inter-medium-woodsmoke-15px">
                        <input
                          // ref={userPassword}
                          type="password"
                          className="auth-form-control"
                          placeholder="Password"
                          onChange={(e) =>
                            setAccount({ ...account, password: e.target.value })
                          }
                          value={account.password}
                        />
                      </div>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                      <button
                        type="submit"
                        className="login-2 abrilfatface-normal-woodsmoke-15px"
                      >
                        LOGIN
                      </button>
                    </div>
                    <div className="dont-have-an-account inter-medium-woodsmoke-14px">
                      Don't have an account?
                    </div>
                    <div
                      className="link-primary place-5 abrilfatface-normal-sundown-14px"
                      onClick={changeAuthMode}
                    >
                      REGISTER
                    </div>
                    <div
                      className="link-primary forgot abrilfatface-normal-sundown-14px"
                      onClick={() => setAuthMode("forgot")}
                    >
                      Forgot Password?
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img className="login-img" src={loginimg} alt="loginImg" />
          </div>
        </form>
      </CSSTransition>

      <CSSTransition
        in={authMode === "signup"}
        timeout={300}
        classNames="auth-form"
        unmountOnExit
      >
        <form onSubmit={handleSubmit}>
          <div className="register-form auth-form-transition">
            <img className="register-img" src={registerimg} alt="registerImg" />
            <div className="flex-col-2">
              <div className="register-title abrilfatface-normal-woodsmoke-38px">
                Join Our Community
              </div>
              <div className="overlap-group5">
                <div className="sign-up-text abrilfatface-normal-woodsmoke-32px">
                  Sign Up
                </div>
                <div className="overlap-group4">
                  <div className="e-mail-address inter-medium-woodsmoke-15px">
                    <input
                      // ref={userEmail}
                      type="email"
                      className="auth-form-control"
                      placeholder="E-mail Address"
                      onChange={(e) =>
                        setAccount({ ...account, email: e.target.value })
                      }
                      value={account.email}
                    />
                  </div>
                </div>
                <div className="overlap-group3">
                  <div className="password inter-medium-woodsmoke-15px">
                    <input
                      // ref={userPassword}
                      type="password"
                      className="auth-form-control"
                      placeholder="Password"
                      onChange={(e) =>
                        setAccount({ ...account, password: e.target.value })
                      }
                      value={account.password}
                    />
                  </div>
                </div>
                <div className="overlap-group-container">
                  <div className="overlap-group2">
                    <div className="first-name inter-medium-woodsmoke-15px">
                      <input
                        type="text"
                        className="auth-form-control"
                        placeholder="First Name"
                        onChange={(e) =>
                          setAccount({ ...account, first_name: e.target.value })
                        }
                        value={account.first_name}
                      />
                    </div>
                  </div>
                  <div className="overlap-group1">
                    <div className="last-name">
                      <input
                        type="text"
                        className="auth-form-control"
                        placeholder="Last Name"
                        onChange={(e) =>
                          setAccount({ ...account, last_name: e.target.value })
                        }
                        value={account.last_name}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button
                    type="submit"
                    className="register-2 abrilfatface-normal-woodsmoke-15px"
                  >
                    REGISTER
                  </button>
                </div>
                <div className="already-have-an-account inter-medium-woodsmoke-14px">
                  Already have an account?
                </div>
                <div
                  className="link-primary login abrilfatface-normal-sundown-14px"
                  onClick={changeAuthMode}
                >
                  LOGIN
                </div>
              </div>
            </div>
          </div>
        </form>
      </CSSTransition>

      <CSSTransition
        in={authMode === "forgot"}
        timeout={300}
        classNames="auth-form"
        unmountOnExit
      >
        <form onSubmit={handlePasswordReset}>
          <div className="forgot-form auth-form-transition">
            <div className="forgot-text abrilfatface-normal-woodsmoke-32px">
              Forgot Password
            </div>
            <div className="overlap-group4">
              <div className="e-mail-address inter-medium-woodsmoke-15px">
                <input
                  type="email"
                  className="auth-form-control"
                  placeholder="E-mail Address"
                  onChange={(e) => setResetEmail(e.target.value)}
                  value={resetEmail}
                />
              </div>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="reset-btn abrilfatface-normal-woodsmoke-15px"
              >
                RESET PASSWORD
              </button>
            </div>
            <div
              className="link-primary backtologin abrilfatface-normal-sundown-14px"
              onClick={() => setAuthMode("signin")}
            >
              Back to Login
            </div>
          </div>
        </form>
      </CSSTransition>
    </div>
  );
}
export default Auth;
