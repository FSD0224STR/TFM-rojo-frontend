import React from 'react'
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
  } from 'antd';
import Search from 'antd/es/transfer/search';

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
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

export const CreateNewDate = () => {
  return (
    <Form
    {...formItemLayout}
    variant="filled"
    style={{
      maxWidth: 600,
    }}
  >
    <Form.Item
      label="Input"
      name="Input"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
    <Search
      placeholder="input search text"
      //onSearch={onSearch}
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
          message: 'Please input!',
        },
      ]}
    >
      <InputNumber
        style={{
          width: '100%',
        }}
      />
    </Form.Item>

    <Form.Item
      label="TextArea"
      name="TextArea"
      rules={[
        {
          required: true,
          message: 'Please input!',
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
          message: 'Please input!',
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
          message: 'Please input!',
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
          message: 'Please input!',
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
          message: 'Please input!',
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
          message: 'Please input!',
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
  )
}