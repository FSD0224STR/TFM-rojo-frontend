import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";

// Form
import { Alert, Button, Form, Input, Spin } from "antd";

// Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// UserApi
import { AuthContext } from "../../contexts/authContext.jsx";

export const ForgotPassword = () => {
  // const [passwordVisible, setPasswordVisible] = React.useState(false);

  // User data
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { updatePasswordApi } = useContext(AuthContext);

  return (
    <>
      <div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{
            maxWidth: "1000px",
            width: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            I can not remember my password
          </h1>
          <Form.Item
            name="email"
            label="Email"
            labelCol={{ span: 6 }}
            rules={[
              {
                required: true,
                message: "Write your email address",
              },
            ]}
            // {...tailFormItemLayout}
            style={{ textAlign: "center" }}
          >
            <Input
              size="large"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              suffix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="oldPassword"
            label="Old Password"
            labelCol={{ span: 6 }}
            rules={[
              {
                required: true,
                message: "Write your password",
              },
            ]}
            // {...tailFormItemLayout}
            style={{ textAlign: "center" }}
          >
            <Input.Password
              size="large"
              placeholder="Old Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            labelCol={{ span: 6 }}
            rules={[
              {
                validator: (_, value) =>
                  value.split("").length >= 6
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("The password must be at least 6 characters")
                      ),
              },
              {
                required: true,
                message: "Write your new password",
              },
            ]}
            style={{ textAlign: "center" }}
            hasFeedback
          >
            <Input.Password
              size="large"
              placeholder="New Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              htmlType="submit"
              size="large"
              style={{ width: "300px" }}
              onClick={() => {
                updatePasswordApi(email, oldPassword, newPassword);
              }}
            >
              Recover Password
            </Button>
            {/* <Button type="link" size="large">
              <Link to="/CreateUser">Nuevo usuario</Link>
            </Button> */}
            <Button type="link" size="large">
              <Link to="/">Login</Link>
            </Button>
          </div>
        </Form>
        <ToastContainer />
      </div>
    </>
  );
};
