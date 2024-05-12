import React, { useContext, useEffect, useState } from "react";
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

// BD for countries
import { countries } from "./Countries.js";
import { provinces } from "./Provinces.js";
import { AuthContext } from "../../contexts/authContext.jsx";
// import Search from "antd/lib/transfer/search.js";
// import Search from "antd/lib/input/Search.js";

export const CreateUserForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [selectCountry, setSelectCountry] = useState([]);
  const [selectProvinces, setSelectProvinces] = useState([]);

  // User Data
  const [dni, setDni] = useState();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [role, setRole] = useState("");
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

  const roleOptions = [
    { value: "admin" },
    { value: "paciente" },
    { value: "doctor" },
  ];

  const { createNewUser, success, error } = useContext(AuthContext);

  useEffect(() => {
    // console.log("error", error);
    if (success) {
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
  }, [error, success]);

  return (
    <>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{
          maxWidth: "1000px",
          width: "600px",
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Crear un usuario nuevo</h1>

        {/* <Form.Item
          name="DNI"
          label="DNI"
          rules={[
            {
              required: false,
              message: "Entre un DNI valido",
            },
          ]}
        >
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            loading
          />
        </Form.Item> */}
        <Form.Item
          name="DNI"
          label="DNI"
          rules={[
            {
              required: false,
              message: "Entre un DNI valido",
            },
          ]}
        >
          <Input
            type="number"
            size="large"
            placeholder="DNI"
            value={dni}
            onChange={(e) => {
              // console.log("name", e.target.value);
              setDni(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="Nombre"
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Entre un nombre valida",
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
          label="E-mail"
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
          label="Contraseña"
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
          label="País"
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
              setProvince();
              findProvince(e);
              setCountry(e);
            }}
          ></Select>
        </Form.Item>
        <Form.Item
          name="Provincia"
          label="Provincia"
          dependencies={["pais"]}
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
          name="Rol"
          label="Rol"
          rules={[
            {
              required: true,
              message: "Seleccione un rol",
            },
          ]}
        >
          <Select
            size="large"
            options={roleOptions}
            value={role}
            onChange={(e) => setRole(e)}
          ></Select>
        </Form.Item>
        <Form.Item
          name="fecha"
          label="fecha de nacimiento"
          rules={[
            {
              required: true,
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
          name="Foto de perfil"
          label="Foto de perfil"
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
              createNewUser(
                dni,
                name,
                lastName,
                email,
                password,
                confirmPassword,
                country,
                province,
                birthDay,
                role,
                politicsAccepted
              );
            }}
          >
            Crear
          </Button>
          <Button size="large">
            <Link to={"/"}>Cancelar</Link>
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </>
  );
};
