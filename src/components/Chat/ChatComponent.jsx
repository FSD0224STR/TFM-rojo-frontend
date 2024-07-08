import { WechatOutlined } from "@ant-design/icons";
import { Avatar, FloatButton, List } from "antd";
import React, { useState } from "react";

export const ChatComponent = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const handleOpenChat = () => {
    setChatOpen(!chatOpen);
    // alert(chatOpen);
  };

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
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
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item.title}</a>}
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
