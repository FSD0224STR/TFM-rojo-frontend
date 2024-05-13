import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

// Form
import { Alert, Button, Form, Input, Spin } from "antd";

// Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// UserApi
import { AuthContext } from "../../contexts/authContext.jsx";

export const Login = () => {
  // const [passwordVisible, setPasswordVisible] = React.useState(false);

  // User data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

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
          <h1 style={{ textAlign: "center" }}>Iniciar sesión</h1>
          <Form.Item
            name="email"
            label="Correo"
            labelCol={{ span: 6 }}
            rules={[
              {
                required: true,
                message: "Por favor ingrese su correo",
              },
            ]}
            // {...tailFormItemLayout}
            style={{ textAlign: "center" }}
          >
            <Input
              size="large"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="contraseña"
            label="contraseña"
            labelCol={{ span: 6 }}
            rules={[
              {
                required: true,
                message: "Por favor ingrese su contraseña",
              },
            ]}
            // {...tailFormItemLayout}
            style={{ textAlign: "center" }}
          >
            <Input.Password
              size="large"
              placeholder="Contraseña"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                login(email, password);
              }}
            >
              Iniciar sesión
            </Button>
            <Button type="link" size="large">
              <Link to="/CreateUser">Nuevo usuario</Link>
            </Button>
          </div>
        </Form>
        <ToastContainer />
      </div>
    </>
  );
};
