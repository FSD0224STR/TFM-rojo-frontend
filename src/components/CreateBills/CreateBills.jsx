import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { Bill } from "./Bill";
import { Cascader, InputNumber, Select, Space, Card } from "antd";
import { DatePicker } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { BillContext } from "../../contexts/BillsContext";

export const CreateBills = () => {
  const {createNewBill,GetBills,billData} = useContext(BillContext)
  const [bill, setBill] = useState({});
  const [form] = Form.useForm();
  // const []

  const handleTotal = (_, values) => {
    const treatmentsCopy = [...values.treatments];

    values.treatments.forEach((fieldGroup, index) => {
      if (fieldGroup && fieldGroup.qty && fieldGroup.iva && fieldGroup.price) {
        // console.log(fieldGroup);
        fieldGroup.total =
          fieldGroup.qty * fieldGroup.price * (fieldGroup.iva + 1);
        treatmentsCopy.splice(index, 1, fieldGroup);
        // console.log("fieldGroup", fieldGroup);
        // console.log("treatmentsCopy", treatmentsCopy);
        form.setFieldsValue({ treatments: treatmentsCopy });
      }
    });
  };

  const onFinish = (value) => {
    console.log(value);
    createNewBill(value);
    setBill(value);
  };

  const { TextArea } = Input;

  const ivaOptions = [
    {
      label: "21% IVA",
      value: 0.21,
    },
    {
      label: "10% IVA",
      value: 0.1,
    },
    {
      label: "4% IVA",
      value: 0.04,
    },
    {
      label: "0% IVA",
      value: 0,
    },
  ];

  // const totalBill =
  //  .reduce ((accumulator, currentValue)=> accumulator + currentValue, 0)

  return (
    <>
      <div style={ {height: "100%"}}>
        <Form
          form={form}
          name="newBill"
          onFinish={onFinish}
          onValuesChange={handleTotal}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item name="date" label="Date">
            <DatePicker />
          </Form.Item>

          <Form.Item name="pacient" label="Pacient">
            <Input />
          </Form.Item>

          <Form.Item name="idPatient" label="DNI">
            <Input />
          </Form.Item>

          <Form.Item name="adress" label="Adress">
            <Input />
          </Form.Item>

          <Form.Item name="tel" label="Tel">
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={4} />
          </Form.Item>

          <Form.List name="treatments">
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: "flex",
                  rowGap: 5,
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 11 }}
                    align="start"
                  >
                    {/* qty */}
                    <Form.Item
                      style={{ width: "30%" }}
                      {...field}
                      name={[field.name, "qty"]}
                      key={[field.key, "qty"]}
                      rules={[{ required: true, message: "Missing quantity" }]}
                    >
                      <InputNumber placeholder="Qty" />
                    </Form.Item>

                    {/* Treatment */}
                    <Form.Item
                      {...field}
                      name={[field.name, "treatment"]}
                      key={[field.key, "treatment"]}
                      rules={[{ required: true, message: "Missing treatment" }]}
                    >
                      <Input plac eholder="TREATMENT" />
                    </Form.Item>

                    {/* Price */}
                    <Form.Item
                      {...field}
                      name={[field.name, "price"]}
                      key={[field.key, "price"]}
                      rules={[{ required: true, message: "Missing price" }]}
                    >
                      <InputNumber
                        placeholder="PRICE"
                        min={0}
                        max={100}
                        suffix="€"
                      />
                    </Form.Item>

                    {/* iva */}
                    <Form.Item
                      style={{ width: "7em" }}
                      name={[field.name, "iva"]}
                      key={[field.key, "iva"]}
                      rules={[{ required: true, message: "Missing iva" }]}
                    >
                      <Select options={ivaOptions} placeholder="IVA" />
                    </Form.Item>

                    {/* Total */}
                    <Form.Item
                      style={{ width: "30%" }}
                      {...field}
                      name={[field.name, "total"]}
                      key={[field.key, "total"]}
                    >
                      <InputNumber disabled placeholder="TOTAL" />
                    </Form.Item>

                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Space>
                ))}

                <Button type="dashed" onClick={() => add()} block>
                  + Add Treatment
                </Button>
              </div>
            )}
          </Form.List>

          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
        <Bill bill={bill.total} />
      </div>
    </>
  );
};
// <label> {totalBill} </label>

//
