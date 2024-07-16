import React, { useContext, useState } from "react";
import { socket } from "./Socket";
import { Button, Form, Input } from "antd";
import { AuthContext } from "../../contexts/authContext";
import { ChatContext } from "../../contexts/ChatContext";

export function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(AuthContext);
  const { messages, setMessages } = useContext(ChatContext);

  function onSubmit(value) {
    // event.preventDefault();
    console.log(value);
    // setIsLoading(true);

    socket.emit("msg", value);
  }

  return (
    userData && (
      <Form
        onFinish={onSubmit}
        initialValues={{ user: userData?.name }}
        style={{
          display: "flex",
          gap: "1em",
          width: "80vw",
          // backgroundColor: "red",
        }}
      >
        <Form.Item name="user" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="message" style={{ width: "100%" }}>
          <Input />
        </Form.Item>

        <Button htmlType="submit" type="primary">
          send
        </Button>
      </Form>
    )
  );
}
