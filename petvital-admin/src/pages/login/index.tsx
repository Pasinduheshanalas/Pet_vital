import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import LoginSection from "./components/login-section/index";
import UserMessage from "./components/user-message/index";

import { useNavigate } from "react-router-dom";
import "./style.scss";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout className="login-page">
      <div className="login-template">
        <LoginSection />
        <UserMessage />
      </div>
    </Layout>
  );
};

export default LoginPage;
