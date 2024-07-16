import { WechatOutlined } from "@ant-design/icons";
import { Avatar, FloatButton, List } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";

export const ChatComponent = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [usersToChat, setUsersToChat] = useState();

  const { findUsers } = useContext(AuthContext);

  const handleOpenChat = () => {
    setChatOpen(!chatOpen);
    // alert(chatOpen);
  };

  const findUsersToChat = async () => {
    const response = await findUsers();
    setUsersToChat(response.filter((user) => user.roles !== "patient"));
  };

  useEffect(() => {
    findUsersToChat();
  }, []);

  return (
    <>
      {/* <div
        style={{
          position: "absolute",
          height: "90%",
          width: "80%",
          marginRight: "0px",
          marginBottom: "0px",
          // backgroundColor: "red",
          zIndex: "100",
          overflow: "hidden",
        }}
      > */}
      <div
        style={{
          position: "absolute",
          right: "50px",
          bottom: "15vh",
          width: "30vw",
          height: "40vh",
          // background: "blue",
          borderBottomLeftRadius: "1em",
          borderTopLeftRadius: "1em",
          // borderRadius: "1em",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          padding: "1em",
          overflowY: "auto",
          backgroundColor: "white",
          display: chatOpen ? "block" : "none",
          zIndex: "100",
        }}
      >
        <List
          header="Company Chat"
          itemLayout="horizontal"
          dataSource={usersToChat}
          renderItem={(item, index) => (
            <List.Item>
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
            </List.Item>
          )}
        />
      </div>
      <FloatButton
        style={{
          marginRight: "2em",
        }}
        type="primary"
        shape="circle"
        icon={<WechatOutlined />}
        onClick={handleOpenChat}
      />
      <FloatButton.Group
        style={{
          marginRight: "6em",
        }}
      >
        <FloatButton
          // href="https://ant.design/index-cn"
          tooltip={<div>custom badge color</div>}
          badge={{
            count: 5,
            color: "blue",
          }}
        />
      </FloatButton.Group>
      {/* </div> */}
    </>
  );
};
