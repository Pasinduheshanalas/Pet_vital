// MainLayout.tsx
import React from "react";

import SideBar from "./components/side-bar";
import TopNavBar from "./components/top-nav-bar";
import { Col, Row } from "antd";
import NewFieldView from "../../pages/home";
import { SyncLoader } from "react-spinners";
import "../../index.css";
import FooterBar from "./components/footer-bar";
import { Outlet, useLocation } from "react-router-dom";
import Layout, { Content } from "antd/es/layout/layout";

interface CoreProps {
  copyright: string;
  year: number;
}

//Few Sample Interface types defined here
interface Props {
  text?: string;
  number?: number;
  boolean?: boolean;
  voidFunction?: () => void;
  returnFunction?: () => string;
  paramFunction?: (args: string) => string;
  object?: {
    property: string;
    id: number;
  };
  coreProps?: CoreProps;
}

const MainLayout: React.FC<{}> = () => {
  const location = useLocation();
  console.log({ location });

  // Check for paths where sidebar should be hidden
  const isLoginPage = location.pathname === "/login";
  const signupPage = location.pathname === "/signup";

  console.log({ signupPage });
  console.log({ isLoginPage });

  console.log(location.pathname);

  return (
    <Layout>
      {!isLoginPage && !signupPage && <SideBar />}
      <Layout>
      {!isLoginPage && !signupPage && <TopNavBar />}
        {/* {!isLoginPage ||
          (!signupPage && (
            // && !isNotFoundPage */}
        {/* <TopNavBar /> */}
        {/* ))} */}
        {/* <Content> */}
        {/* <div className="main-router-container" style={{ minHeight: 360 }}>
            <SyncLoader className="loader" color="#36d7b7" />
            <Outlet />
          </div> */}
        {/* </Content> */}
        {/* <FooterBar /> */}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
