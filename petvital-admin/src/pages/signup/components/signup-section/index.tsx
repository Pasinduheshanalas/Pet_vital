import React from "react";
import Text from "../text";
import Logo from "../../../../assets/images/LogoMain.png";
import SignupForm from "../signup-form";

const SignupSection: React.FC = () => {
  return (
    <div className="login-section">
      <div className="login-section-wrapper">
        <img
          src={Logo}
          alt="Orel IT Logo"
          className="logo"
          style={{ width: "100px", height: "auto", objectFit: "contain" }}
        />
        <Text content="Sign Up Account" type="title" />
        <Text
          content="Enter your details to sign up your account"
          type="subtitle"
        />
        {/* <LoginForm /> */}
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupSection;
