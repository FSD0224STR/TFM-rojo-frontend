import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';

function FloatingEmailForm({ isVisible, onClose }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isVisible) {
      form.resetFields();
    }
  }, [isVisible, form]);

  const handleSubmit = () => {
    console.log(form.getFieldsValue());
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#C3C3C3', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', zIndex: 1000 }}>
      <Form
        form={form}
        onFinish={handleSubmit}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
      >
        <Form.Item
          name="email"
          label="Email : "
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please write a valid email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="subject"
          label="Subject : "
          rules={[
            {
              required: true,
              message: 'Please tell us the subject!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message : "
          rules={[
            {
              required: true,
              message: 'Please write a message!',
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 14,
          }}
        >
          <Button type="primary" htmlType="submit">
            Send
          </Button>
          <Button style={{ marginLeft: '8px' }} onClick={onClose}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FloatingEmailForm;