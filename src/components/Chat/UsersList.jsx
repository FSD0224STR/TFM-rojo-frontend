import { Avatar, Button, List } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { ChatContext } from "../../contexts/ChatContext";

export const UsersList = () => {
  const { findUsers, userData } = useContext(AuthContext);
  const { usersInChat, usersToChat, AddUserToChat, findUsersToChat, AddUser } =
    useContext(ChatContext);

  useEffect(() => {
    findUsersToChat();
    // console.log("User data", userData.id);
  }, []);

  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <List
        // style={{ width: "100%" }}
        header={`Company chat - ${userData?.name}`}
        itemLayout="horizontal"
        dataSource={usersToChat}
        renderItem={(item, index) => (
          // <List.Item>
          <Button
            onClick={() => {
              const user = {
                user: `${item.roles.substring(0, 2).toUpperCase()} - ${item.name
                  .substring(0, 3)
                  .toUpperCase()} ${item.lastName
                  .substring(0, 3)
                  .toUpperCase()}`,
                id: item._id,
              };
              AddUser(user);
            }}
            style={{
              width: "100%",
              height: "100%",
              // padding: "1em",
              // display: "flex",
              // justifyContent: "space-between",
              // alignItems: "center",
            }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    !item.fileUrlLink
                      ? `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`
                      : item.fileUrlLink
                  }
                />
              }
              title={`${item.roles} - ${item.name} ${item.lastName}`}
              // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </Button>
          // </List.Item>
        )}
      />
    </div>
  );
};
