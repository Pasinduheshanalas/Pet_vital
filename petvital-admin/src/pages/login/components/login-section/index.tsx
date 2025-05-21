import React from "react";
import { Link } from "react-router-dom"; // Ensure you're using react-router for routing
import Text from "../text";
import LoginForm from "../login-form/index";
import Logo from "../../../../assets/images/LogoMain.png";

const LoginSection: React.FC = () => {
  return (
    <div className="login-section">
      <div className="login-section-wrapper">
        <img
          src={Logo}
          alt="Orel IT Logo"
          className="logo"
          style={{ width: "100px", height: "auto", objectFit: "contain" }}
        />
        <Text content="Login to your account" type="title" />
        <Text
          content="Enter your details to access your account"
          type="subtitle"
        />
        <LoginForm />
        <div
          className="signup-link"
          style={{ marginTop: "1rem", textAlign: "center" }}
        >
          <span>Don't have an account? </span>
          <Link to="/signup" style={{ color: "#1890ff", fontWeight: "bold" }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
