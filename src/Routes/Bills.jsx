import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";

export const Bills = () => {
  const [form] = Form.useForm();
  // const []

  const handleTotal = (_, values) => {
    const treatmentsCopy = [...values.treatments];

    values.treatments.forEach((fieldGroup, index) => {
      if (fieldGroup && fieldGroup.qty && fieldGroup.iva && fieldGroup.price) {
        // console.log(fieldGroup);
        fieldGroup.total = fieldGroup.qty * fieldGroup.price * fieldGroup.iva;
        treatmentsCopy.splice(index, 1, fieldGroup);
        // console.log("fieldGroup", fieldGroup);
        // console.log("treatmentsCopy", treatmentsCopy);
        form.setFieldsValue({ treatments: treatmentsCopy });
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
      <Form.Item label="name" name="name">
        <Input placeholder="name" />
      </Form.Item>
      <Form.List name="treatments">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: "flex", marginBottom: 11 }}
                  align="start"
                >
                  {/* qty */}
                  <Form.Item
                    noStyle
                    {...field}
                    name={[field.name, "qty"]}
                    key={[field.key, "qty"]}
                    rules={[{ required: true, message: "Missing quantity" }]}
                  >
                    <Input placeholder="quantity" />
                  </Form.Item>
                  {/* Price */}
                  <Form.Item
                    noStyle
                    {...field}
                    name={[field.name, "price"]}
                    key={[field.key, "price"]}
                    rules={[{ required: true, message: "Missing price" }]}
                  >
                    <Input placeholder="price" />
                  </Form.Item>
                  {/* iva */}
                  <Form.Item
                    noStyle
                    {...field}
                    name={[field.name, "iva"]}
                    key={[field.key, "iva"]}
                    rules={[{ required: true, message: "Missing iva" }]}
                  >
                    <Input placeholder="iva" />
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
