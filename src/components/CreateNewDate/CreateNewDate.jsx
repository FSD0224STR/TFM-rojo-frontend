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
import dayjs from "dayjs";
import { durationDate } from "./durationDate";

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
  const {
    searchDoctorDates,
    doctors,
    userPacientes,
    findPacientes,
    searchDayDates,
    searchDoctors,
    enableDayHoursList,
  } = useContext(DatesContext);
  const [doctorSelected, setDoctorSelected] = useState("");

  useEffect(() => {
    console.log(doctors);
    console.log(userPacientes);
    searchDoctors();
    findPacientes();
    searchDoctorDates("all");
  }, []);

  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const onChange = (value) => {
    console.log(value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Form
      // {...formItemLayout}
      variant="filled"
      style={{
        maxWidth: 1500,
        height: "100%",
      }}
    >
      <Form.Item
        label="Patient"
        name="patient"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select
          showSearch
          filterOption={filterOption}
          options={userPacientes}
        />
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
          filterOption={filterOption}
          value={doctorSelected}
          onChange={(e) => setDoctorSelected(e)}
          options={doctors}
        />
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
        <DatePicker
          onChange={(e) =>
            searchDayDates(dayjs(e).format("YYYY-MM-DD"), doctorSelected)
          }
        />
      </Form.Item>

      <Form.Item
        label="Select hour"
        name="hour"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select options={enableDayHoursList} />
      </Form.Item>

      <Form.Item
        label="Duration"
        name="duration"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select options={durationDate} />
      </Form.Item>

      <Form.Item
        label="Treatment"
        name="reason"
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
        name="state"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select
          options={[
            { label: "confirmed", value: "confirmed" },
            { label: "pending", value: "pending" },
            { label: "canceled", value: "canceled" },
          ]}
        />
      </Form.Item>

      {/* <Form.Item
        label="State"
        name="color"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select options={durationDate} />
      </Form.Item> */}

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
