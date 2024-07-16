import React, { useContext } from "react";
import "./CardChat.css";
import { AuthContext } from "../../contexts/authContext";

export const CardChat = ({ message }) => {
  const { userData } = useContext(AuthContext);
  return (
    <div className="CardChatContainer">
      <div className="CardChatContainer-user">{message.user}:</div>
      <div className="CardChatContainer-message">{message.message}</div>
    </div>
  );
};
