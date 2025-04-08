import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PlusOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Select,
  Upload,
  message,
} from "antd";

const { Option } = Select;

// Notifications
import "react-toastify/dist/ReactToastify.css";

// BD for countries
// import { countries } from "./Countries.js";
// import { provinces } from "./Provinces.js";
import { AuthContext } from "../../contexts/authContext.jsx";
import dayjs from "dayjs";
// import { CountryCodes } from "./ContryCodes.js";

export const UserForm = ({ type, update }) => {
  const {
    roleData,
    isLoggedIn,
    setError,
    createNewUser,
    loadProfilePhoto,
    loadingPhoto,
    userData,
    searchedUser,
    updateUser,
    findUsers,
  } = useContext(AuthContext);

  const [selectProvinces, setSelectProvinces] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState();
  const [roleOptions, setRoleOptions] = useState();
  const [fileUrl, setFileUrl] = useState();
  const [userDataForm] = Form.useForm();
  const [userDataChange, setUserDataChange] = useState(false);

  // Image preview
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

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

  //   const roleOptions = [{ value: "admin" }, { value: "patient" }];

  const handleFinish = (values) => {
    // console.log(values);
    !update && createNewUser(values);
    update &&
      !userDataChange &&
      setError("No changes were made") &&
      findUsers();
    update && userDataChange && updateUser(values);
  };

  useEffect(() => {
    if (type === "notPatient") {
      setRoleOptions([
        // { value: "patient" },
        { value: "doctor" },
        { value: "admin" },
      ]);
    }
  }, []);

  useEffect(() => {
    // console.log("URL from useEffect", fileUrl);
    userDataForm.setFieldsValue({
      fileUrlLink: fileUrl,
    });
  }, [fileUrl]);

  const [initialData, setInitialData] = useState();

  useEffect(() => {
    if (type === "patient") {
      userDataForm.setFieldsValue({
        roles: "patient",
      });
    } else if (update === true) {
      userDataForm.setFieldsValue({
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
        // profilePhoto: searchedUser?.profilePhoto,
        fileUrlLink: searchedUser?.fileUrlLink,
      });
    }
  }, []);

  return (
    <>
      {!isLoggedIn && (
        <div style={{ height: "100%" }}>
          <Form
            form={userDataForm}
            labelCol={{ span: 20 }}
            wrapperCol={{ span: 25 }}
            labelWrap={{ wrap: "wrap" }}
            labelAlign="left"
            scrollToFirstError
            layout="vertical"
            onFinish={handleFinish}
            onFinishFailed={() => setError("You must fill the form")}
            onValuesChange={() => setUserDataChange(true)}
          >
            {update !== true ? (
              <h1 style={{ textAlign: "center" }}>Create a new user</h1>
            ) : (
              <h1 style={{ textAlign: "center" }}>
                Update user: {searchedUser?.name} {searchedUser?.lastName}
              </h1>
            )}

            {roleData === "admin" && update === true && (
              <Form.Item name="userId" label="User Id" hidden>
                <Input size="large" placeholder="userId" readOnly />
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
            {/* Last name */}
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
                // addonBefore={prefixSelector}
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

            {/* Password */}
            {type === "notPatient" && (
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
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>
            )}

            {/* Confirm password */}
            {type === "notPatient" && (
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
                <Input.Password size="large" placeholder="Confirm password" />
              </Form.Item>
            )}
            {/* Country */}
            {/* <Form.Item
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
            </Form.Item> */}
            {/* Province */}
            {/* <Form.Item
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
            </Form.Item> */}
            {/* Role if admin */}
            {
              // roleData === "admin" && type !== "patient" &&
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
            }

            {/* Role if not admin */}
            {roleData !== "admin" ||
              (type === "patient" && (
                <Form.Item
                  name="roles"
                  label="Rol"
                  rules={[
                    {
                      // required: true,
                      message: "Select a rol",
                    },
                  ]}
                  hidden={type === "patient" ? true : false}
                >
                  <Input
                    size="large"
                    placeholder="patient"
                    // value="patient"
                    disabled
                  ></Input>
                </Form.Item>
              ))}

            {/* Birthday */}
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
                style={{ width: "100%" }}
                placeholder="Birthday"
              />
            </Form.Item>
            {/* Profile photo */}
            <Form.Item
              name="profilePhoto"
              label="Profile photo"
              rules={[
                {
                  required: false,
                  message: "Place your photo",
                },
              ]}
              status="success"
            >
              <Upload
                // style={{ width: "100%" }}
                // action={(value) => loadProfilePhoto(value)}
                listType="picture-card"
                action={async (value) => {
                  const url = await loadProfilePhoto(value);
                  console.log(url);
                  setFileUrl(url);
                }}
                fileList={fileList}
                beforeUpload={beforeUpload}
                onPreview={handlePreview}
                maxCount={1}
                multiple="false"
                // onChange={handleChange}
                // status="success"
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>profile photo</div>
                </button>
              </Upload>
            </Form.Item>

            <Form.Item>
              {update && (
                <Image
                  width={100}
                  style={{ borderRadius: "50%" }}
                  src={
                    searchedUser?.fileUrlLink ? searchedUser?.fileUrlLink : ""
                  }
                />
              )}
            </Form.Item>

            {/* File url */}
            <Form.Item name="fileUrlLink" hidden>
              <Input />
            </Form.Item>
            {/* END */}
            <div
              style={{ display: "flex", gap: "1em", justifyContent: "center" }}
            >
              <Button htmlType="submit" size="large">
                {!update ? "Create" : "Update"}
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
