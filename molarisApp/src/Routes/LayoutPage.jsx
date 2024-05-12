import { Outlet } from "react-router-dom";
import { Layout, Spin } from "antd";
import { AuthContext, AuthProvider } from "../contexts/authContext";
import { Navbar } from "./Navbar/Navbar";
import { useContext } from "react";

const { Content, Footer } = Layout;

export const LayoutPage = () => {
  const { loading } = useContext(AuthContext);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Layout className="OutletContainer">
        <Content
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // marginLeft: "400px",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
        {/* <ToastContainer /> */}
      </Layout>
      <Spin spinning={loading} fullscreen />
    </Layout>
  );
};
