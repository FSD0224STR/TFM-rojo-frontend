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
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <Form
      // {...formItemLayout}
      variant="filled"
      style={{
        maxWidth: 1500,
      }}
    >
      <Form.Item
        label="Input"
        name="Input"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Search
          placeholder="Ingrese el usuario"
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
      </Form.Item>

      <Form.Item
        label="InputNumber"
        name="InputNumber"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        label="TextArea"
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
        label="Select"
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
        label="Cascader"
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
        label="TreeSelect"
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
        <DatePicker />
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
