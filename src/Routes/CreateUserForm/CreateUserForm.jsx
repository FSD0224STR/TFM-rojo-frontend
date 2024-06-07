import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PlusOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import { Button, DatePicker, Form, Input, Select, Upload } from "antd";

const { Option } = Select;

// Notifications
import "react-toastify/dist/ReactToastify.css";

// BD for countries
import { countries } from "./Countries.js";
import { provinces } from "./Provinces.js";
import { AuthContext } from "../../contexts/authContext.jsx";
import { CountryCodes } from "./ContryCodes.js";

export const CreateUserForm = () => {
  const { roleData, isLoggedIn, setError, createNewUser } =
    useContext(AuthContext);
  const [selectProvinces, setSelectProvinces] = useState([]);

  // User Data
  const [province, setProvince] = useState("");

  const findProvince = async (e) => {
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
    { value: "patient" },
    { value: "doctor" },
  ];

  const onFinishCreateUser = (values) => {
    createNewUser(values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        {CountryCodes.map((country) => {
          var flag = country.flag;
          return (
            <>
              <Option value={country.code}>
                <img
                  src={country.flag}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </Option>
              {console.log(flag)}
            </>
          );
        })}
      </Select>
    </Form.Item>
  );

  return (
    <>
      {isLoggedIn && (
        <div style={{ height: "100%" }}>
          <Form
            labelCol={{ span: 20 }}
            wrapperCol={{ span: 25 }}
            labelWrap={{ wrap: "wrap" }}
            labelAlign="left"
            scrollToFirstError
            layout="vertical"
            onFinish={onFinishCreateUser}
            onFinishFailed={() => setError("You must fill the form")}
          >
            <h1 style={{ textAlign: "center" }}>Create a new user</h1>

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
                  message: "Write a valid email address",
                },
              ]}
            >
              <Input type="email" size="large" placeholder="E-mail" />
            </Form.Item>

            {/* Phone */}
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Write your phone number",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Phone number"
                addonBefore={prefixSelector}
              />
            </Form.Item>

            {/* Adress */}
            <Form.Item
              name="address"
              label="Adress"
              rules={[
                {
                  required: true,
                  message: "Write your address",
                },
              ]}
            >
              <Input size="large" placeholder="Adress" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  validator: (_, value) =>
                    value.length >= 6
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "The password must be at least 6 characters"
                          )
                        ),
                },
                {
                  required: true,
                  message: "Write the password",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm password"
              dependencies={["password"]}
              labe
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Confirm password is required",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The password do not match")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
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
                showSearch
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
                showSearch
                size="large"
                placeholder="Province"
                options={selectProvinces}
                // onChange={(e) => setProvince(e)}
              ></Select>
            </Form.Item>
            {roleData === "admin" && (
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
                <Select
                  size="large"
                  options={roleOptions}
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
                <Input size="large" placeholder="patient" disabled></Input>
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
              <DatePicker size="large" placeholder="Birthday" />
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
            <div
              style={{ display: "flex", gap: "1em", justifyContent: "center" }}
            >
              <Button htmlType="submit" size="large">
                Create
              </Button>
              <Button size="large">
                <Link to={"/userdata"}>Cancel</Link>
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};
