import { Tabs } from "antd";
import { UsersList } from "../../components/Chat/UsersList";
import { useContext, useEffect } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { ChatTabs } from "../../components/Chat/ChatTabs";

export const ChatLayout = () => {
  const { findItems } = useContext(ChatContext);

  useEffect(() => {
    findItems();
  }, []);
  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          //   overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "300px",
            height: "100%",
            marginLeft: "0",
            padding: "1em",
          }}
        >
          <UsersList />
        </div>
        <div style={{ width: "100%", height: "100%" }}>
          <ChatTabs />
        </div>
      </div>
    </>
  );
};
