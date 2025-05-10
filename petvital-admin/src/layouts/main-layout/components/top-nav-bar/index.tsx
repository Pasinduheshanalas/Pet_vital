import { useLanguageSelect } from "../../../../lang/service/languageUtils";
import { languageList } from "../../../../lang/service/languageList";
import "./style.scss";
import { Dropdown, Flex, MenuProps, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import Logo from "../../../../assets/images/LogoMain.png";
import { Header } from "antd/es/layout/layout";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import {logout} from "../../../../service/firebase/firebase-config"
import { useNavigate } from "react-router";
import { logoutUser } from "../../../../pages/login/authAction";

const TopNavBar = () => {
  const { selectedLanguage, handleLanguageSelect } = useLanguageSelect(); // Use the utility function
  const [languageItems, setLanguageItems] = useState<MenuProps["items"]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLanguageItems(
      languageList.map((language, index) => ({
        label: language.text,
        code: language.code,
        key: index,
      }))
    );
  }, []);

  const logOutFunc = () => {
    logout();
    logoutUser();
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "menu-props-2",
      label: (
        <Flex gap={10} align="center" justify="flex-start" onClick={logOutFunc}>
          <LogoutOutlined />
          <span>LogOut</span>
        </Flex>
      ),
    },
  ];

  return (
    <Header
      className="top-nav-bar"
      style={{
        background: "white",
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <div className="logo-container">
        <img src={Logo} alt="logo" className="logo" />
      </div>

      <Dropdown menu={{ items }} className="settings-icon">
        <SettingOutlined style={{ fontSize: "23px" }} />
      </Dropdown>
    </Header>
  );
};

export default TopNavBar;
