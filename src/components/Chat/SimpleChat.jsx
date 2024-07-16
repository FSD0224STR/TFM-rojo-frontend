import { Button, Form, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { ChatContext } from "../../contexts/ChatContext";
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

export const SimpleChat = () => {
  const { userData } = useContext(AuthContext);
  const { userToChat } = useContext(ChatContext);

  //   const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  var socket = io("http://localhost:3000");

  //   socket.emit("login", { id: userData?.id, name: userData?.name });

  const chatForm = document.getElementById(`chatForm`);
  const input = document.getElementById(`input`);
  const messageList = document.getElementById(`messages`);
  const statusMsg = document.getElementById(`status`);

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {};

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages([...messages, receivedMessage]);
    };

    return () => {
      socket.close();
    };
  }, [messages]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <h1>Company chat</h1> */}
      <div
        style={{
          backgroundColor: "#fcf3e3",
          width: "100%",
          height: "80vh",
          overflow: "auto",
        }}
      >
        <ul id="messages"></ul>
      </div>
      <div style={{ left: 0 }}>
        <p id="status"></p>
      </div>
      <div style={{ width: "100%" }}>
        <Form
          style={{ display: "flex", gap: "1em", width: "100%" }}
          id="chatForm"
          //   onFinish={sendMessage}
        >
          <Form.Item name="msg">
            <Input placeholder="Type here..." id="input" />
          </Form.Item>
          <Button htmlType="submit">Send</Button>
        </Form>
      </div>
    </div>
  );
};
