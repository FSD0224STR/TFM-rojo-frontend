import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const Items = [
  // {
  //   key: "1",
  //   icon: <HomeOutlined />,
  //   label: <Link to={"/"}>Home</Link>,
  // },
  {
    type: "divider",
  },
  {
    key: "Login",
    icon: <FileOutlined />,
    label: "User",
    type: "group",
    children: [
      {
        key: "Login1",
        icon: <LoginOutlined />,
        label: <Link to={"/Login"}>Login</Link>,
        id: "loggedin",
      },
      // {
      //   key: "Login2",
      //   icon: <UserAddOutlined />,
      //   label: <Link to={"/CreateUser"}>Create user</Link>,
      // },
      // {
      //   key: "Login3",
      //   icon: <LogoutOutlined />,
      //   label: <Link to={"/"}>LogOut</Link>,
      // },
    ],
  },
];
