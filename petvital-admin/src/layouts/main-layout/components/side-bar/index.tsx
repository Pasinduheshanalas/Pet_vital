import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import {
  AuditOutlined,
  BaiduOutlined,
  DollarOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  RadarChartOutlined,
  SaveOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomeIcon from "../../../../assets/images/home-nav.png";
import PetInfo from "../../../../assets/images/pet-info-nav.png";
import ManageVaccineImg from "../../../../assets/images/manage-vac-image.png";
import AppoinmentImg from "../../../../assets/images/appoinment-nav.png";
import ProductImg from "../../../../assets/images/product-nav.png";
import OrderImg from "../../../../assets/images/order-nav.png";
import HomeImg from "../../../../assets/images/home1-nav.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdFormatListBulletedAdd } from "react-icons/md";
import "./style.scss";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import LogoUrl from "../../../../assets/images/logo.png";
import { IoIosLogOut } from "react-icons/io";
import ProfileIcon from "../../../../assets/images/profile.png";
import { logout } from "../../../../service/firebase/firebase-config";
import { logoutUser } from "../../../../pages/login/authAction";

const { Sider } = Layout;
const SideBar: React.FC<{}> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const handleMouseOver = () => setCollapsed(false);
  const handleMouseOut = () => setCollapsed(false);
  const [selectedKeys, setSelectedKeys] = useState(location.pathname);

  const handleNavigation = (path: string) => {
    setSelectedKeys(path);
    navigate(path);
  };
  const handleLogout = () => {
    logout();
    logoutUser();
    navigate("/login");
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 0,
          background: "#fff",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          defaultSelectedKeys={["/"]}
          mode="inline"
          onClick={({ key }) => handleNavigation(key)}
          selectedKeys={[selectedKeys]}
          style={{
            marginTop: 100,
          }}
        >
          <Menu.Item
            // style={{ marginBottom: 30 }}
            key="/"
            icon={<HomeOutlined style={{ fontSize: "20px" }} />}
          >
            Home
          </Menu.Item>
          {/* <Menu.Item
            key="/pet-information"
            icon={<BaiduOutlined style={{ fontSize: "20px" }} />}
          >
            Pet Information
          </Menu.Item> */}
          <Menu.Item
            key="/appoinments"
            icon={<AuditOutlined style={{ fontSize: "20px" }} />}
          >
            Appoinments
          </Menu.Item>
          <Menu.Item
            key="/products"
            icon={<DollarOutlined style={{ fontSize: "20px" }} />}
          >
            Products
          </Menu.Item>
          <Menu.Item
            key="/orders"
            icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />}
          >
            Orders
          </Menu.Item>
          <Menu.Item
            key="/manage-vaccine"
            icon={<MedicineBoxOutlined style={{ fontSize: "20px" }} />}
          >
            Manage Vaccine
          </Menu.Item>
        </Menu>
        <hr style={{ marginTop: "50px", marginBottom: "20px" }} />
        <div className="profile-card">
          <Dropdown overlay={profileMenu} trigger={["click"]}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                padding: "5px 10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Avatar src={ProfileIcon} size={35} />
                <div className="profile-info" style={{ marginLeft: "10px" }}>
                  <div
                    className="profile-name"
                    style={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    Villa Resort
                  </div>
                  <div
                    className="profile-email"
                    style={{
                      fontSize: "12px",
                      color: "#737373",
                      fontWeight: "400",
                    }}
                  >
                    villauser@gmail.com
                  </div>
                </div>
              </div>
              <IoIosLogOut size={20} style={{ marginLeft: "15px" }} />
            </div>
          </Dropdown>
        </div>
      </Sider>
    </Layout>
  );

  // return (
  //     <nav className="side-nav-bar">
  //        <Link
  //         color="#fff"
  //         className={
  //           active === "add-field"
  //             ? "side-nav-bar-link-active"
  //             : "side-nav-bar-link-inactive"
  //         }
  //         to="/add-field"
  //       >
  //         <MdFormatListBulletedAdd />
  //       </Link>
  //       <Link
  //         color="#fff"
  //         className={
  //           active === "field-list"
  //             ? "side-nav-bar-link-active"
  //             : "side-nav-bar-link-inactive"
  //         }
  //         to="/field-list"
  //       >
  //         <GiHamburgerMenu />
  //       </Link>
  //       <p className="app-version-text" style={{ marginTop: height / 1.7 }}>
  //         {process.env.REACT_APP_APP_VERSION}
  //       </p>
  //     </nav>
  // );
};

export default SideBar;
