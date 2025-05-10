import React from "react";
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
      </div>
    </div>
  );
};

export default LoginSection;
