import React, { useContext, useEffect, useState, setError } from "react";
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

const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import { DatesContext } from "../../contexts/DatesContext";
import { durationDate } from "./durationDate";

export const CreateNewDate = () => {
  const { setError } = useContext(AuthContext);
  const { createNewDate, searchDoctorName, doctor } = useContext(DatesContext);

  const {
    searchDoctorDates,
    doctors,
    userPatients,
    findPatients,
    searchDayDates,
    searchDoctors,
    enableDayHoursList,
  } = useContext(DatesContext);
  const [doctorSelected, setDoctorSelected] = useState("");
  const [finishTimeData, setFinishedTimeData] = useState();

  const onFinish = (value) => {
    console.log(value);
    createNewDate(value);
  };

  useEffect(() => {
    searchDoctors();
    findPatients();
    searchDoctorDates("all");
  }, []);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const [createDateForm] = Form.useForm();

  // Find finish time
  const dateSelected = Form.useWatch("date", createDateForm);
  const timeSelected = Form.useWatch("time", createDateForm);
  const durationSelected = Form.useWatch("duration", createDateForm);

  useEffect(() => {
    const fullTime =
      dayjs(dateSelected).format("YYYY-MM-DD") + " " + timeSelected;
    const date = dayjs(fullTime);
    // console.log(date);
    setTimeout(() => {
      const timeAdded = date.add(durationSelected, "minute");
      // console.log(timeAdded);
      setFinishedTimeData(timeAdded.format("HH:mm"));
      createDateForm.setFieldsValue({
        timeFinish: timeAdded.format("HH:mm"),
      });
    }, 200);
  }, [dateSelected, timeSelected, durationSelected]);

  // Find color choices
  const [colorSelected, setColorSelected] = useState();

  const stateSelected = Form.useWatch("state", createDateForm);

  useEffect(() => {
    switch (stateSelected) {
      case "confirmed":
        var color = "#cad5ad";
        // setColorSelected("#cad5ad");
        break;
      case "cancelled":
        var color = "#e77a77";
        // setColorSelected("#e77a77");
        break;
      case "pending":
        var color = "#f6a570";
        // setColorSelected("#f6a570");
        break;
      default:
        var color = "#f6a570";
        break;
    }

    setColorSelected(color);
    createDateForm.setFieldsValue({
      color: color,
    });
  }, [stateSelected]);

  return (
    <>
      <div style={{ height: "100%" }}>
        <h2 style={{ textAlign: "center" }}>Create new date</h2>
        <Form
          form={createDateForm}
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 25 }}
          labelWrap={{ wrap: "wrap" }}
          labelAlign="left"
          scrollToFirstError
          layout="vertical"
          onFinish={onFinish}
          // onFinish={createNewUser}
          onFinishFailed={() => setError("You must fill the form")}
        >
          <Form.Item
            label="Patient"
            name="idPatient"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Select
              size="large"
              showSearch
              filterOption={filterOption}
              options={userPatients}
            />
          </Form.Item>

          <Form.Item
            label="Doctor Name"
            name="idDoctor"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Select
              size="large"
              showSearch
              filterOption={filterOption}
              value={doctorSelected}
              onChange={(e) => setDoctorSelected(e)}
              options={doctors}
            />
          </Form.Item>

          <Form.Item
            label="DatePicker"
            name="date"
            size="large"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <DatePicker
              size="large"
              onChange={(e) =>
                searchDayDates(dayjs(e).format("YYYY-MM-DD"), doctorSelected)
              }
            />
          </Form.Item>

          <Form.Item
            label="Select hour"
            name="time"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Select size="large" options={enableDayHoursList} />
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
            <Select
              size="large"
              options={durationDate}
              // onChange={findFinishTime}
            />
          </Form.Item>

          <Form.Item label="Finish time" name="timeFinish">
            <Input size="large" disabled placeholder={finishTimeData} />
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
            <Input.TextArea size="large" />
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
            initialValue={"pending"}
          >
            <Select
              size="large"
              options={[
                { label: "confirmed", value: "confirmed" },
                { label: "pending", value: "pending" },
                { label: "cancelled", value: "cancelled" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Color" name="color" valuePropName="">
            <Input size="large" disabled placeholder={colorSelected} />
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
      </div>
    </>
  );
};
