import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Radio, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllUsers } from "../../apiService/userApi.js";

export const Users = () => {
  const [data, setData] = useState([]);

  // Navigate
  const navigate = useNavigate();

  //   GetUsers
  // Host
  const GetUsers = async () => {
    // console.log("token", localStorage.getItem("access_token"));
    const token = ` ${localStorage.getItem("access_token")}`;
    // console.log("Token", token);
    const response = await getAllUsers(token);

    if (response.error === 400) {
      localStorage.removeItem("access_token");
      navigate("/");
    } else if (response.error === 403) {
      setData([]);
    } else {
      setData(response);
      // console.log(response);
    }
  };

  // Call get users
  useEffect(() => {
    GetUsers();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Users Info</h1>
      {data.length ? (
        <List
          pagination={{
            position: "bottom",
            align: "center",
          }}
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.email}
              />
              <h3 style={{ marginRight: "2em" }}>{item.roles}</h3>
              <Button>
                <EditOutlined />
              </Button>
              <Button>
                <DeleteOutlined />
              </Button>
            </List.Item>
          )}
          style={{ width: "70vw" }}
        />
      ) : (
        <h1>No tiene acceso</h1>
      )}
    </>
  );
};
