import { Button, Form, Input, Radio } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import { AuthContext } from "../../contexts/authContext";
import { ChatContext } from "../../contexts/ChatContext";

export const ChatMessages = ({ key }) => {
  const [form] = Form.useForm();
  const { userData } = useContext(AuthContext);
  const { userToChat } = useContext(ChatContext);

  var socket = io("http://localhost:3000");

  socket.emit("login", { id: userData.id, name: userData.name });

  const chatForm = document.getElementById(`chatForm_${userToChat}`);
  const input = document.getElementById(`input_${userToChat}`);
  const messageList = document.getElementById(`Messages_${userToChat}`);
  const statusMsg = document.getElementById(`Status_${userToChat}`);

  const nickname = userData.name;

  chatForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    socket.to(userToChat).emit("private message", socket.id, input.value);

    console.log("msg", { nickname: nickname, msg: input.value });
  });

  input?.addEventListener("keypress", function (e) {
    console.log("Usuario está escribiendo");
    socket.emit("status", { nickname: nickname, status: "writting" });
  });

  // socket.on("msg", function (msg) {
  //   console.log("He recibido un mensaje", msg.msg);
  //   let item = document.createElement("li");
  //   item.innerText = "💌 " + msg.nickname + ": " + msg.msg;
  //   messageList.append(item);
  // });

  // socket.on("userConnection", (msg) => {
  //   let item = document.createElement("li");
  //   item.innerText = "👨 " + msg.msg;
  //   messageList.append(item);
  // });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        gap: "1em",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "65vh",
          backgroundColor: "#f8fbe9",
          padding: "1em",
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
        }}
      >
        <div style={{ width: "100%", height: "90%", overflow: "auto" }}>
          <ul id={`Messages_${userToChat}`}></ul>
        </div>
        <div style={{ fontSize: "2em" }}>
          <p id={`Status_${userToChat}`}></p>
        </div>
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        <Form
          form={form}
          id={`chatForm_${userToChat}`}
          style={{
            width: "100%",
            display: "flex",
            gap: "1em",
          }}
        >
          <Form.Item style={{ width: "95%" }}>
            <Input
              placeholder="input placeholder"
              id={`input__${userToChat}`}
              autoComplete=""
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
