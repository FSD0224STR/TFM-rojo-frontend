import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";

import { PlusOutlined } from "@ant-design/icons";

import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
const { Option } = Select;

// BD for countries
import { countries } from "./Countries.js";
import { provinces } from "./Provinces.js";
import { AuthContext } from "../../contexts/authContext.jsx";
import { CountryCodes } from "./ContryCodes.js";

export const UpdateUserForm = () => {
  // Import authcontext
  const { roleData, isLoggedIn, searchedUser, updateUser, setError } =
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

  useEffect(() => {
    console.log(searchedUser);
  }, []);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        {CountryCodes.map((country) => {
          return (
            <>
              <Option value={country.code}>
                <img
                  src={country.flag}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </Option>
            </>
          );
        })}
      </Select>
    </Form.Item>
  );

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
              userId: searchedUser?._id,
              dni: searchedUser?.dni,
              name: searchedUser?.name,
              lastName: searchedUser?.lastName,
              email: searchedUser?.email,
              country: searchedUser?.country,
              province: searchedUser?.province,
              birthDay: dayjs(searchedUser?.birthDay),
              roles: searchedUser?.roles,
              phone: searchedUser?.phone,
              prefix: searchedUser?.prefix,
              address: searchedUser?.address,
              photo: searchedUser?.photo,
            }}
            onFinish={userDataChange && updateUser}
            onValuesChange={() => setUserDataChange(true)}
          >
            <h1 style={{ textAlign: "center" }}>
              Update user: {searchedUser?.name} {searchedUser?.lastName}
            </h1>
            {roleData === "admin" && (
              <Form.Item name="userId" label="User Id">
                <Input size="large" placeholder="userId" disabled={true} />
              </Form.Item>
            )}

            {/* DNI */}
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

            {/* Name */}
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

            {/* Last Name */}
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

            {/* Email */}
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
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Write your address",
                },
              ]}
            >
              <Input size="large" placeholder="Adress" />
            </Form.Item>

            {/* Country */}
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

            {/* Province */}
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

            {/* Roles */}
            {roleData === "admin" && (
              <Form.Item
                name="roles"
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

            {/* BirthDay */}
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
              />
            </Form.Item>

            {/* ProfilePhoto */}
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
              <Button htmlType="submit" size="large">
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
