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
import { DatesContext } from "../../contexts/DatesContext";

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
  const {searchDoctorDates, doctors,userPacientes,
    findPacientes}= useContext(DatesContext);

  
  useEffect(() => {
    findPacientes();
    searchDoctorDates("all");
  }, []);

  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const onChange = (value) => {
    console.log(value);
  };
  function filter(inputValue, path) {
    return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
  }
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
        <Select 
        showSearch
        options={userPacientes} />
      </Form.Item>

      <Form.Item
        label="Doctor Name"
        name="Select"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select 
        showSearch
        options={doctors} />
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
        <DatePicker onChange={e=> console.log(dayjs(e))} />
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
        label="State"
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
