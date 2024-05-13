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

  const { createNewUser } = useContext(AuthContext);

  return (
    <>
      <div>
        <Form
          labelCol={{ span: 6 }}
          // wrapperCol={{ span: 14 }}
          // layout="horizontal"
          style={{
            // maxWidth: "1000px",
            margin: "10em 0 2em 0",
            width: "600px",
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Create a new user</h1>

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
            name="Name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Write a valid name",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                // console.log("name", e.target.value);
                setName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Write your last name",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Last Name"
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
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
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
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm password"
            dependencies={["password"]}
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
              placeholder="Confirm password"
            />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                required: false,
                message: "Select a country",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Country"
              options={countries}
              onChange={(e) => {
                setProvince();
                findProvince(e);
                setCountry(e);
              }}
            ></Select>
          </Form.Item>
          <Form.Item
            name="Province"
            label="Province"
            dependencies={["pais"]}
            rules={[
              {
                required: false,
                message: "Select a province",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Province"
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
                message: "Select a rol",
              },
            ]}
          >
            <Select
              size="large"
              options={roleOptions}
              value={role}
              onChange={(e) => setRole(e)}
              placeholder="Rol"
            ></Select>
          </Form.Item>
          <Form.Item
            name="Birthday"
            label="Birthday"
            rules={[
              {
                required: true,
                message: "Select your birthday",
              },
            ]}
          >
            <DatePicker
              size="large"
              placeholder="Birthday"
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
          <div
            style={{ display: "flex", gap: "1em", justifyContent: "center" }}
          >
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
      </div>
    </>
  );
};
