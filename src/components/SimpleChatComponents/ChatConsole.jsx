import React, { useContext, useEffect } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { CardChat } from "./CardChat";
import { AuthContext } from "../../contexts/authContext";

export const ChatConsole = () => {
  const { userData } = useContext(AuthContext);
  const { messages } = useContext(ChatContext);
  //   useEffect(() => {}, [messages]);

  return (
    <div className="ChatContainer">
      <ul style={{ listStyleType: "none" }}>
        {messages?.map((message, index) => (
          <li
            key={index}
            className={
              userData.name !== message.user
                ? `RowContainer Left`
                : `RowContainer Right`
            }
          >
            <CardChat message={message} key={index} />
          </li>
        ))}
      </ul>
    </div>
  );
};
