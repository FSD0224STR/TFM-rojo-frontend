import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

// Form
import { Button, Form, Input } from "antd";

// Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Host
const host = "http://localhost:3000";

export const Login = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  // User data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Navigate
  const navigate = useNavigate();

  // Backend
  const loginFunction = (email, password) => {
    const user = { email: email, password: password };

    if (user.email !== "") {
      fetch(`${host}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Success");
            return response.json();
          } else if (response.status === 403) {
            toast.error("La contraseña es incorrecta");
          } else if (response.status === 404) {
            toast.error("El usuario no existe");
            setTimeout(() => {
              navigate("/CreateUser");
            }, 1000);
          }
        })
        .then((data) => {
          // Set token
          console.log(data);
          const access_token = data.token;
          localStorage.setItem("accessToken", access_token);
        });
    } else {
      toast.warning("Por favor ingrese un correo");
    }
  };

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
                loginFunction(email, password);
              }}
            >
              Iniciar sesión
            </Button>
            <Button type="link" size="large">
              <Link to="/CreateUser">Nuevo usuario</Link>
            </Button>
          </div>
        </Form>
      </div>
      <ToastContainer />
    </>
  );
};
