import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
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

// BD for countries
import { countries } from "./Countries.js";
import { provinces } from "./Provinces.js";
import { AuthContext } from "../../contexts/authContext.jsx";

export const UpdateUserForm = () => {
  // Import authcontext
  const { roleData, isLoggedIn, searchUser, udpdateUser } =
    useContext(AuthContext);

  const [selectProvinces, setSelectProvinces] = useState([]);

  // User Data
  const [userId, setUserId] = useState(`${searchUser?._id}`);
  var [dni, setDni] = useState(`${searchUser?.dni}`);
  const [name, setName] = useState(`${searchUser?.name}`);
  const [lastName, setLastName] = useState(`${searchUser?.lastName}`);
  const [email, setEmail] = useState(`${searchUser?.email}`);
  const [country, setCountry] = useState(`${searchUser?.country}`);
  const [province, setProvince] = useState(`${searchUser?.province}`);
  const [birthDay, setBirthDay] = useState(`${searchUser?.birthDay}`);
  const [role, setRole] = useState(`${searchUser?.roles}`);
  const [userDataChange, setUserDataChange] = useState(false);
  // const [politicsAccepted, setPoliticsAccepted] = useState(false);

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

  const dateFormat = "DD-MM-YYYY";

  return (
    <>
      {isLoggedIn && (
        <div>
          <Form
            labelCol={{ span: 6 }}
            style={{
              margin: "10em 0 2em 0",
              width: "600px",
            }}
            initialValues={{
              userId: searchUser?._id,
              dni: searchUser?.dni,
              name: searchUser?.name,
              lastName: searchUser?.lastName,
              email: searchUser?.email,
              country: searchUser?.country,
              province: searchUser?.province,
              birthDay: dayjs(searchUser?.birthDay),
              role: searchUser?.roles,
            }}
          >
            <h1 style={{ textAlign: "center" }}>
              Update user: {searchUser.name} {searchUser.lastName}
            </h1>

            <Form.Item name="userId" label="User Id">
              <Input
                size="large"
                placeholder="userId"
                value={dni}
                disabled={true}
              />
            </Form.Item>
            <Form.Item
              name="dni"
              label="DNI"
              rules={[
                {
                  required: false,
                  message: "Write your DNI",
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
                  setUserDataChange(true);
                }}
              />
            </Form.Item>
            <Form.Item
              name="name"
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
                  setUserDataChange(true);
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
                  setUserDataChange(true);
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
                  setUserDataChange(true);
                }}
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
                  setUserDataChange(true);
                }}
              ></Select>
            </Form.Item>
            <Form.Item
              name="province"
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
                onChange={(e) => {
                  setProvince(e);
                  setUserDataChange(true);
                }}
              ></Select>
            </Form.Item>
            {roleData === "admin" && (
              <Form.Item
                name="role"
                label="Role"
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
                  onChange={(e) => {
                    setRole(e);
                    setUserDataChange(true);
                  }}
                  placeholder="Rol"
                ></Select>
              </Form.Item>
            )}
            {roleData !== "admin" && (
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
                <Input
                  size="large"
                  // value="paciente"
                  placeholder="paciente"
                  disabled
                ></Input>
              </Form.Item>
            )}
            <Form.Item
              name="birthDay"
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
                format={dateFormat}
                onChange={(e) => {
                  setBirthDay(e);
                  setUserDataChange(true);
                }}
              />
            </Form.Item>
            <Form.Item
              name="profilePhoto"
              label="Profile photo"
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
                  <div style={{ marginTop: 8 }}>profile photo</div>
                </button>
              </Upload>
            </Form.Item>
            <br />
            <div
              style={{ display: "flex", gap: "1em", justifyContent: "center" }}
            >
              <Button
                htmlType="submit"
                size="large"
                onClick={() => {
                  udpdateUser(
                    userId,
                    dni,
                    name,
                    lastName,
                    email,
                    country,
                    province,
                    birthDay,
                    role,
                    userDataChange
                  );
                }}
              >
                Update
              </Button>
              <Button size="large">
                <Link to={"/userdata"}>Cancel</Link>
              </Button>
              <Button size="large" onClick={() => console.log("email", email)}>
                Prueba
              </Button>
            </div>
          </Form>
          {/* <ToastContainer /> */}
        </div>
      )}
    </>
  );
};
