import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";

import UserMessage from "./components/user-message/index";

import { useNavigate } from "react-router-dom";
import "./style.scss";
import { Sign } from "crypto";
import SignupSection from "./components/signup-section";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout className="login-page">
      <div className="login-template">
        <SignupSection />
        <UserMessage />
      </div>
    </Layout>
  );
};

export default LoginPage;
