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
  const { roleData, isLoggedIn, searchUser, updateUser, setError } =
    useContext(AuthContext);

  const [selectProvinces, setSelectProvinces] = useState([]);

  // User Data
  const [province, setProvince] = useState();
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
        <div style={{ height: "100%" }}>
          <Form
            labelCol={{ span: 20 }}
            wrapperCol={{ span: 25 }}
            labelAlign="left"
            scrollToFirstError
            layout="vertical"
            initialValues={{
              userId: searchUser?._id,
              dni: searchUser?.dni,
              name: searchUser?.name,
              lastName: searchUser?.lastName,
              email: searchUser?.email,
              country: searchUser?.country,
              province: searchUser?.province,
              birthDay: dayjs(searchUser?.birthDay),
              roles: searchUser?.roles,
            }}
            onFinish={userDataChange && updateUser}
            onValuesChange={() => setUserDataChange(true)}
          >
            <h1 style={{ textAlign: "center" }}>
              Update user: {searchUser.name} {searchUser.lastName}
            </h1>
            {roleData === "admin" && (
              <Form.Item name="userId" label="User Id">
                <Input size="large" placeholder="userId" disabled={true} />
              </Form.Item>
            )}
            <Form.Item
              name="dni"
              label="DNI"
              rules={[
                {
                  required: true,
                  message: "Write your DNI",
                },
              ]}
            >
              <Input type="number" size="large" placeholder="DNI" />
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
              <Input size="large" placeholder="Name" />
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
              <Input size="large" placeholder="Last Name" />
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
              <Input type="email" size="large" placeholder="E-mail" />
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
                }}
              ></Select>
            </Form.Item>
            <Form.Item
              name="province"
              label="Province"
              dependencies={["country"]}
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
                  }}
                  placeholder="Rol"
                ></Select>
              </Form.Item>
            )}
            {roleData !== "admin" && (
              <Form.Item
                name="roles"
                label="Rol"
                rules={[
                  {
                    required: true,
                    message: "Select a rol",
                  },
                ]}
              >
                <Input size="large" placeholder="paciente" disabled></Input>
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
                }}
              />
            </Form.Item>
            <Form.Item
              name="profilePhoto"
              label="Profile photo"
              rules={[
                {
                  required: false,
                  message: "Select a photo",
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
            </div>
          </Form>
          {/* <ToastContainer /> */}
        </div>
      )}
    </>
  );
};
