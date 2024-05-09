import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { AuthProvider } from "../contexts/authContext";
import { Navbar } from "./Navbar/Navbar";

const { Content, Footer } = Layout;

export function Root() {
  return (
    <AuthProvider>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <Layout>
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
        </Layout>
      </Layout>
    </AuthProvider>
  );
}
