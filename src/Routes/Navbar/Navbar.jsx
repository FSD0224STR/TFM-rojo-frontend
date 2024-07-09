import {
  FileOutlined,
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CalendarOutlined,
  HomeOutlined,
  DiffOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import Sider from "antd/es/layout/Sider";

export const Navbar = () => {
  const { logout, isLoggedIn, roleData, userName } = useContext(AuthContext);

  const Items = [
    isLoggedIn &&
      roleData !== "patient" && {
        key: "Agenda",
        icon: <CalendarOutlined />,
        label: <Link to={"/agenda"}>Agenda</Link>,
      },
     isLoggedIn && {
       key: "CreateDate",
       icon: <DiffOutlined />,
       label: <Link to={"/createnewdate"}>Create Date</Link>,
     },
    isLoggedIn && {
      key: "UserData",
      icon: <UserOutlined />,
      label: <Link to={"/userdata"}>Users Data</Link>,
    },
    isLoggedIn && {
      key: "CreateBills",
      icon: <UserOutlined />,
      label: <Link to={"/CreateBills"}>Create Bills</Link>,
    },
    isLoggedIn && {
      key: "tabletest",
      icon: <UserOutlined />,
      label: <Link to={"/tabletest"}>table test</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "user",
      icon: <ProfileOutlined />,
      label: isLoggedIn && (
        <Link to={"/myuser"}>
          <>
            <p style={{ color: "white" }}>
              {userName.split(" ")[0]} - {roleData}
            </p>
          </>
        </Link>
      ),
      type: "group",
      children: [
        !isLoggedIn && {
          key: "Login",
          icon: <LoginOutlined />,
          label: <Link to={"/"}>Login</Link>,
          id: "loggedin",
        },
        isLoggedIn &&
          roleData !== "patient" && {
            key: "CreateUser",
            icon: <UserAddOutlined />,
            label: <Link to={"/createuser"}>Create user</Link>,
          },
        isLoggedIn &&
          roleData !== "patient" && {
            key: "CreatePatient",
            icon: <UserAddOutlined />,
            label: <Link to={"/createuserpatient"}>Create patient</Link>,
          },
        isLoggedIn && {
          key: "Logout",
          icon: <LogoutOutlined />,
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
          style={{ color: "white" }}
        ></Menu>
      </Sider>
    </>
  );
};
