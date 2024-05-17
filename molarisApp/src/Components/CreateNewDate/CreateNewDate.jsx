import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
} from "antd";

// import { Input } from "antd";
const { Search } = Input;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 60,
    },
    sm: {
      span: 30,
    },
  },
};

export const CreateNewDate = () => {
  const { data } = useContext(AuthContext);
  const [userPacientes, setUserPacientes] = useState([]);
  const findPacientes = async () => {
    const response = await data.map((user) => {
      if (user.roles === "paciente")
        return { label: user.name, value: user._id };
    });
    const pacientes = await response.filter((user) => user!==undefined)
    return setUserPacientes(pacientes);
  };
  
  useEffect(() => {
    findPacientes();
  }, []);

  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const onChange = (value) => {
    console.log(value);
  };
  return (
    <Form
      // {...formItemLayout}
      variant="filled"
      style={{
        maxWidth: 1500,
        height: "100%"
      }}
    >
      <Form.Item
        label="Patient"
        name="Input"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Cascader
          options={userPacientes}
          onChange={onChange}
          placeholder="Please select"
          // showSearch={{
          //   filter,
          // }}
          onSearch={(value) => console.log(value)}
        />
      </Form.Item>

      <Form.Item
        label="Patient Code"
        name="Select"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select />
      </Form.Item>

      <Form.Item
        label="Treatment"
        name="TextArea"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Mentions"
        name="Mentions"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Mentions />
      </Form.Item>

      <Form.Item
        label="Doctor Code"
        name="Select"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select />
      </Form.Item>

      <Form.Item
        label="Box"
        name="Cascader"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Cascader />
      </Form.Item>

      <Form.Item
        label="Telephone Number"
        name="TreeSelect"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <TreeSelect />
      </Form.Item>

      <Form.Item
        label="DatePicker"
        name="DatePicker"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <DatePicker onChange={e=> console.log(e)} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
