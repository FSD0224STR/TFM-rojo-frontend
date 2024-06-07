import { Outlet } from "react-router-dom";
import { Layout, Modal, Spin } from "antd";
import { AuthContext, AuthProvider } from "../contexts/authContext";
import { Navbar } from "./Navbar/Navbar";
import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./LayoutPage.css";

const { Content, Footer } = Layout;

export const LayoutPage = () => {
  const { loading, success, error } = useContext(AuthContext);

  useEffect(() => {
    // console.log("error", error);
    if (success) {
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
  }, [error, success]);

  return (
    <>
      <Layout className="LayoutContainer">
        <Navbar />
        <Layout className="OutletContainer">
          <Content className="OutletContent">
            <Outlet className="Outlet" />
          </Content>

          <Spin
            spinning={loading}
            style={{
              position: "absolute",
              margin: "auto",
              // background: "red",
            }}
            fullscreen
          />
        </Layout>
      </Layout>
      <Footer>
        <div>
          <p>Molaris Copyright © 2024</p>
        </div>
      </Footer>
      <ToastContainer />
    </>
  );
};
