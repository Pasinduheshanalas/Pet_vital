import React from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";


const FooterBar:React.FC<{}> = () => {

    return (
        <Footer style={{ bottom:0,width:'100%',position:"absolute", background: "#fff", }}>
          All right reserved @2024
        </Footer>
    );
}
export default FooterBar;