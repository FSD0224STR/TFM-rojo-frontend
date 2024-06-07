import {
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";

export const Bills = () => {
  const [form] = Form.useForm();
  const [qtyData, setQtyData] = useState();
  // const []

  const handleTotal = (_, values) => {
    const rowsCopy = [...values.rows];

    values.rows.forEach((fieldGroup, index) => {
      if (fieldGroup && fieldGroup.qty && fieldGroup.price) {
        console.log(fieldGroup);
        fieldGroup.total = fieldGroup.qty * fieldGroup.price;
        rowsCopy.splice(index, 1, fieldGroup);
        console.log("fieldGroup", fieldGroup);
        console.log("rowsCopy", rowsCopy);
        form.setFieldsValue({ rows: rowsCopy });
      }
    });
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      onValuesChange={handleTotal}
      style={{
        maxWidth: 600,
      }}
      autoComplete="off"
    >
      <Form.List name="rows">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: "flex", marginBottom: 11 }}
                  align="start"
                >
                  {/* Longitud */}
                  <Form.Item
                    noStyle
                    {...field}
                    name={[field.name, "qty"]}
                    key={[field.key, "qty"]}
                    rules={[{ required: true, message: "Missing quantity" }]}
                  >
                    <Input placeholder="quantity" />
                  </Form.Item>
                  {/* Altura */}
                  <Form.Item
                    noStyle
                    {...field}
                    name={[field.name, "price"]}
                    key={[field.key, "price"]}
                    rules={[{ required: true, message: "Missing price" }]}
                  >
                    <Input placeholder="price" />
                  </Form.Item>
                  {/* Total */}
                  <Form.Item
                    noStyle
                    {...field}
                    name={[field.name, "total"]}
                    key={[field.key, "total"]}
                  >
                    <Input disabled placeholder="Total" />
                  </Form.Item>

                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
