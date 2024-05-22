import { Avatar, Badge, Descriptions } from "antd";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { UserOutlined } from "@ant-design/icons";

export const MyUser = () => {
  const { userData } = useContext(AuthContext);
  useEffect(() => {
    // console.log(userData);
  }, [userData]);
  const items = [
    {
      key: "1",
      label: "Name",
      children: `${userData.name}`,
    },
    {
      key: "2",
      label: "E-mail Address",
      children: `${userData.email}`,
    },
    {
      key: "3",
      label: "Role",
      children: `${userData.role}`,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2em",
      }}
    >
      <Avatar size={64} icon={<UserOutlined />} />
      <Descriptions layout="vertical" bordered items={items} />
    </div>
  );
};
