import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PlusOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  notification,
  Space,
} from "antd";

// Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Navigate
import { useNavigate } from "react-router-dom";

// BD for countries
import { countries } from "./Countries.js";
import { provinces } from "./Provinces.js";

// Host
const host = "http://localhost:3000";

// Backend

export const CreateUserForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [selectCountry, setSelectCountry] = useState([]);
  const [selectProvinces, setSelectProvinces] = useState([]);

  // Navigate
  const navigate = useNavigate();

  // User Data
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [politicsAccepted, setPoliticsAccepted] = useState(false);

  const findProvince = async (e) => {
    // console.log(typeof e);
    const countryFound = countries.filter((country) => {
      if (country.value === e) {
        return country;
      }
    });

    const countryId = countryFound[0].id;

    const provinceFound = provinces.filter((province) => {
      if (province.id_country == countryId) {
        return province;
      }
    });

    setSelectProvinces(provinceFound);
  };

  // Crear usuario
  const createUser = (
    name,
    lastName,
    email,
    password,
    confirmPassword,
    country,
    province,
    birthDay,
    politicsAccepted
  ) => {
    if (password === confirmPassword) {
      if (politicsAccepted) {
        const newUser = {
          name: name,
          lastName: lastName,
          email: email,
          password: password,
          country: country,
          province: province,
          birthDay: new Date(String(birthDay)).toISOString(),
          roles: "user",
        };
        // console.log(newUser);
        fetch(`${host}/user/newUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }).then((response) => {
          console.log(response);
          if (response.status === 200) {
            toast.success("Usuario creado correctamente");
            setTimeout(() => {
              navigate("/login");
            }, 1000);
          } else if (response.status === 409) {
            toast.error("Este usuario ya existe");
          } else {
            toast.error("Error al crear el usuario");
          }
        });
      } else {
        toast.error("Debes aceptar las politicas de privacidad");
      }
    } else {
      toast.error("Las contraseñas no coinciden");
    }
  };

  return (
    <>
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
        <h1 style={{ textAlign: "center" }}>Crear un usuario nuevo</h1>

        <Form.Item
          name="Nombre"
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Entre una contraseña valida",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Nombre"
            value={name}
            onChange={(e) => {
              // console.log("name", e.target.value);
              setName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="Apellido"
          label="Apellido"
          rules={[
            {
              required: true,
              message: "Ingrese un apellido valido",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => {
              // console.log("lastName", e.target.value);
              setLastName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="email"
          rules={[
            {
              required: true,
              message: "Ingrese un email valido",
            },
          ]}
        >
          <Input
            type="email"
            size="large"
            placeholder="Correo electronico"
            value={email}
            onChange={(e) => {
              // console.log("email", e.target.value);
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="contraseña"
          label="contraseña"
          rules={[
            {
              required: true,
              message: "Entre una contraseña valida",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            value={password}
            onChange={(e) => {
              // console.log("password", e.target.value);
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="confirmar"
          label="Confirmar"
          dependencies={["contraseña"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Por favor confirmar la contraseña",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("contraseña") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden")
                );
              },
            }),
          ]}
        >
          <Input.Password
            value={confirmPassword}
            onChange={(e) => {
              // console.log("Confirm password", e.target.value);
              setConfirmPassword(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="pais"
          label="pais"
          rules={[
            {
              required: false,
              message: "Seleccione un pais",
            },
          ]}
        >
          <Select
            size="large"
            placeholder="Pais"
            options={countries}
            onChange={(e) => {
              findProvince(e);
              setCountry(e);
            }}
          ></Select>
        </Form.Item>
        <Form.Item
          name="Provincia"
          label="Provincia"
          rules={[
            {
              required: false,
              message: "Seleccione un provincia",
            },
          ]}
        >
          <Select
            size="large"
            placeholder="Provincia"
            options={selectProvinces}
            onChange={(e) => setProvince(e)}
          ></Select>
        </Form.Item>
        <Form.Item
          name="fecha de nacimiento"
          label="fecha "
          rules={[
            {
              required: false,
              message: "Seleccione su fecha de cumpleaños",
            },
          ]}
        >
          <DatePicker
            size="large"
            placeholder="Fecha de nacimiento"
            onChange={(e) => setBirthDay(e)}
          />
        </Form.Item>
        <Form.Item
          name="pais"
          label="pais"
          rules={[
            {
              required: false,
              message: "Entre una contraseña valida",
            },
          ]}
        >
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Foto de perfil</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          // {...tailFormItemLayout}
          style={{ textAlign: "center" }}
        >
          <Checkbox
            onChange={() => {
              setPoliticsAccepted(!politicsAccepted);
              // console.log("onchange", politicsAccepted);
            }}
          >
            He leído y acepto las <a href="">políticas de privacidad</a>
          </Checkbox>
        </Form.Item>
        <br />
        <div style={{ display: "flex", gap: "1em", justifyContent: "center" }}>
          <Button
            htmlType="submit"
            size="large"
            onClick={() => {
              createUser(
                name,
                lastName,
                email,
                password,
                confirmPassword,
                country,
                province,
                birthDay,
                politicsAccepted
              );
            }}
          >
            Crear
          </Button>
          <Button size="large">
            <Link to={"/login"}>Cancelar</Link>
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </>
  );
};
