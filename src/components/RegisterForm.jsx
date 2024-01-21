import React from "react";
import "../assets/css/auth.css";
import registerimg from "../assets/img/registerimg.png";

function Registration(props) {
  const { login, password, eMailAddress, place1 } = props;

  return (
    <div className="register-form">
      <img className="register-img" src={registerimg} alt="registerImg" />
      <div className="flex-col-2">
        <div className="register-title abrilfatface-normal-woodsmoke-38px">
          {registertitle}
        </div>
        <div className="overlap-group5">
          <div className="sign-up-text abrilfatface-normal-woodsmoke-32px">
            {signuptext}
          </div>
          <div className="overlap-group4">
            <div className="e-mail-address inter-medium-woodsmoke-15px">
              {eMailAddress}
            </div>
          </div>
          <div className="overlap-group3">
            <div className="password inter-medium-woodsmoke-15px">
              {password}
            </div>
          </div>
          <div className="overlap-group-container">
            <div className="overlap-group2">
              <div className="first-name inter-medium-woodsmoke-15px">
                {firstName}
              </div>
            </div>
            <div className="overlap-group1">
              <div className="last-name">{lastName}</div>
            </div>
          </div>
          <div className="accept-terms-conditions inter-medium-woodsmoke-14px">
            {acceptTermsConditions}
          </div>
          <div className="overlap-group">
            <div className="place abrilfatface-normal-woodsmoke-15px">
              {place1}
            </div>
          </div>
          <div className="already-have-an-account inter-medium-woodsmoke-14px">
            {alreadyHaveAnAccount}
          </div>
          <div className="login abrilfatface-normal-sundown-14px">{login}</div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
