import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { Bill } from "./Bill";
import { Cascader, InputNumber, Select, Space, Card } from "antd";
import { DatePicker } from "antd";
import { CloseOutlined } from '@ant-design/icons';

export const CreateBills = () => {
  const [totalTreatment, setTotalTreatment]= useState()
  const [bill, setBill] = useState({});
  const [newBillForm]= Form.useForm()

  const treatmentsValues = Form.useWatch("treatments", newBillForm)
  useEffect(()=>{
    treatmentsValues?.map((val)=>{
      const total= val?.qty*val?.price*(val?.iva+1)
   // setTotalTreatment(total)
    console.log(val)
    console.log(total)
      newBillForm.setFieldsValue({
        treatments:{
          total:"total"}
      })
    })
    

  },[treatmentsValues])

  const onFinish = (value) => {
    console.log(value);
    setBill(value);
  };

  const { TextArea } = Input;

  const ivaOptions= [{
    label: "21% IVA",
    value: 0.21
  },{
    label: "10% IVA",
    value: 0.1
  },{
    label: "4% IVA",
    value: 0.04
  }, {
    label: "0% IVA",
    value: 0

  }
]

const totalItem= () => {

}
  return (
    <>
  
      <Form form= {newBillForm} name="newBill" onFinish={onFinish} onValuesChange={(value)=>setBill(value)}>
        <Form.Item name="date" label="Date">
          <DatePicker />
        </Form.Item>

        <Form.Item name="pacient" label="Pacient">
          <Input />
        </Form.Item>

        <Form.Item name="DNI" label="DNI">
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
                display: 'flex',
                rowGap: 5,
                flexDirection: 'column',
                width: "100%"
              }}
            >
              {fields.map((field) => (
              
                <Space key={field.key}>

                  <Form.Item style={{ width: "30%",}} name={[field.name, 'qty']}>
                    <InputNumber placeholder="Qty"
                     
                    />
                  </Form.Item>
   
                   <Form.Item name={[field.name, 'treatment']}>
                     <Input placeholder="Treatment" />
                   </Form.Item>

                   <Form.Item name={[field.name, 'price']}>
                      <InputNumber
                          min={0}
                          max={100}
                          suffix="€"
                      />
                   </Form.Item>

                   <Form.Item style={{ width: "7em",}} name={[field.name, 'iva']}>
                      <Select options={ivaOptions}/>  
                   </Form.Item>
                   
                   <Form.Item style={{ width: "30%",}}  name={[field.name, 'total']}>
                    <InputNumber  disabled
                     
                    />
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

      <Bill bill= {bill} />
    </>
  );
};
 
 