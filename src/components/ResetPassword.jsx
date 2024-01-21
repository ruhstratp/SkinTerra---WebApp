import React, { useState } from "react";
import axios from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import "../assets/css/resetPassword.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // extract token from URL
    const token = window.location.pathname.split("/").pop();

    try {
      await axios.patch(`/api/users/resetPassword/${token}`, {
        password,
        passwordConfirm: confirmPassword,
      });

      alert(
        "Your password has been reset. Please log in with your new password."
      );
      navigate("/"); // navigate to login page
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form className="reset-password-form" onSubmit={handleSubmit}>
      <h2 className="abrilfatface-normal-woodsmoke-15px">Reset Password</h2>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button className="abrilfatface-normal-woodsmoke-15px" type="submit">
        Submit
      </button>
    </form>
  );
}

export default ResetPassword;
