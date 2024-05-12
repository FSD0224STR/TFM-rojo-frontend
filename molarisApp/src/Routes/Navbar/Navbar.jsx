import {
  FileOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import Sider from "antd/es/layout/Sider";

export const Navbar = () => {
  const { logout, isLoggedIn, roleData, userName } = useContext(AuthContext);

  const Items = [
    isLoggedIn && {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to={"/app"}>Home</Link>,
    },
    isLoggedIn && {
      key: "2",
      icon: <LogoutOutlined />,
      label: <Link to={"/dashboard"}>DashBoard</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "Login",
      icon: <FileOutlined />,
      label: isLoggedIn ? `${userName.split("")[0]} - ${roleData}` : "",
      type: "group",
      children: [
        !isLoggedIn && {
          key: "user1",
          icon: <LoginOutlined />,
          label: <Link to={"/"}>Login</Link>,
          id: "loggedin",
        },
        !isLoggedIn && {
          key: "user2",
          icon: <UserAddOutlined />,
          label: <Link to={"/CreateUser"}>Create user</Link>,
        },
        isLoggedIn && {
          key: "user3",
          label: <Link onClick={logout}>LogOut</Link>,
        },
      ],
    },
  ];

  return (
    <>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          // display: {token ? "block" : "hide"}
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[1]}
          mode="inline"
          items={Items}
        ></Menu>
      </Sider>
    </>
  );
};
