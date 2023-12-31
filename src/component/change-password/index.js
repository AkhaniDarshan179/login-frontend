import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiCall from "../../service/apiCall";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { mobile } = useParams();
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiCall("change-password", { passwords, mobile });
      navigate("/login");

      setPasswords({
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Change Password
          </button>
        </div>
        <p style={{ color: "red" }}>{error}</p>
      </form>
    </div>
  );
};

export default ChangePassword;
