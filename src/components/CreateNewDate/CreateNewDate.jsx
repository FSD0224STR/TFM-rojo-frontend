import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Button, DatePicker, Drawer, Form, Input, Select } from "antd";

import dayjs from "dayjs";
import { DatesContext } from "../../contexts/DatesContext";
import { durationDate } from "./durationDate";

export const CreateNewDate = () => {
  const { setError } = useContext(AuthContext);

  const {
    createNewDate,
    searchDoctorDates,
    doctors,
    doctorId,
    userPatients,
    findPatients,
    searchDayDates,
    searchDoctors,
    enableDayHoursList,
    dates,
    dayDates,
    hourAvailable,
    dateSelected,
    stateColorSelected,
  } = useContext(DatesContext);

  const [doctorSelected, setDoctorSelected] = useState("");
  const [finishTimeData, setFinishedTimeData] = useState();

  const onFinishCreateDate = (value) => {
    createDateForm.resetFields();
    createDateForm.setFieldsValue({
      time: "",
    });
    createNewDate(value);
  };

  useEffect(() => {
    searchDoctors();
    findPatients();
    searchDoctorDates();
    // console.log(hourAvailable?.hour.label);
  }, []);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const [createDateForm] = Form.useForm();

  // Find finish time
  const dateSelectedForm = Form.useWatch("date", createDateForm);
  const timeSelected = Form.useWatch("time", createDateForm);
  const durationSelected = Form.useWatch("duration", createDateForm);

  useEffect(() => {
    const fullTime =
      dayjs(dateSelectedForm).format("YYYY-MM-DD") + " " + timeSelected;
    const date = dayjs(fullTime);
    setTimeout(() => {
      const timeAdded = date.add(durationSelected, "minute");
      setFinishedTimeData(timeAdded.format("HH:mm"));
      createDateForm.setFieldsValue({
        timeFinish: timeAdded.format("HH:mm"),
      });
    }, 200);
  }, [dateSelectedForm, timeSelected, durationSelected]);

  // Find color choices
  const [colorSelected, setColorSelected] = useState();

  const stateSelected = Form.useWatch("state", createDateForm);

  useEffect(() => {
    const color = stateColorSelected(stateSelected);

    setColorSelected(color);
    createDateForm.setFieldsValue({
      color: color,
    });
  }, [stateSelected]);

  useEffect(() => {
    // console.log("hour", hourAvailable);
    // console.log("doctor", doctorId);
    // console.log("hoursList");
    // console.log(dayjs(dateSelected));
  }, []);

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
          onFinish={onFinishCreateDate}
          onFinishFailed={() => setError("You must fill the form")}
          initialValues={{
            state: "pending",
            color: "#f6a570",
            idDoctor: doctorId,
            time: hourAvailable?.hour.label,
            date: dayjs(dateSelected),
          }}
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
              onChange={(e) => {
                setDoctorSelected(e);
                createDateForm.setFieldsValue({
                  date: "",
                  time: "",
                  duration: "",
                  timeFinish: "",
                });
              }}
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
              onChange={(e) => {
                searchDayDates(
                  dayjs(e).format("YYYY-MM-DD"),
                  doctorSelected,
                  dates
                );
                createDateForm.setFieldsValue({
                  time: "",
                  duration: "",
                  timeFinish: "",
                });
              }}
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
            <Select
              size="large"
              options={enableDayHoursList}
              onChange={() => {
                createDateForm.setFieldsValue({
                  duration: "",
                  timeFinish: "",
                });
              }}
            />
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
            <Select size="large" options={durationDate} />
          </Form.Item>

          <Form.Item label="Finish time" name="timeFinish">
            <Input
              size="large"
              disabled
              // placeholder={finishTimeData}
            />
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
