import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { Bill } from "./Bill";
import { Cascader, InputNumber, Select, Space, Card } from "antd";
import { DatePicker } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { BillContext } from "../../contexts/BillsContext";
import { DatesContext } from "../../contexts/DatesContext";
import dayjs from "dayjs";
import { AuthContext } from "../../contexts/authContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const { TextArea } = Input;

export const CreateBills = ({ update }) => {
  const { setError, navigate, searchUserInfo } = useContext(AuthContext);
  const {
    createNewBill,
    GetBills,
    billData,
    updateBill,
    searchedBill,
    fillUserData,
    generatePdf,
  } = useContext(BillContext);

  const [bill, setBill] = useState({});
  const [billDataChange, setbillDataChange] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPrintPdf, setOpenPrintPdf] = useState(false);

  const [form] = Form.useForm();

  const { userPatients, findPatients } = useContext(DatesContext);

  const findAllBills = async () => {
    const response = await GetBills();
    // console.log (response)
    form.setFieldsValue({ billNumber: response?.length + 1 });
  };

  useEffect(() => {
    findPatients();
    findAllBills();
  }, []);

  const patientIdField = Form.useWatch("Patient", form);
  useEffect(() => {
    patientIdField !== undefined && fillUserPersonalData(patientIdField);
  }, [patientIdField]);

  const fillUserPersonalData = async (id) => {
    const response = await searchUserInfo(id);
    // console.log(response);
    form.setFieldsValue({
      dni: response?.dni,
      adress: response?.address,
      tel: response?.phone,
    });
  };

  const handleTotal = (_, values) => {
    const treatmentsCopy = [...values.treatments];
    let totalSum = 0;

    values.treatments.forEach((fieldGroup, index) => {
      if (
        fieldGroup &&
        fieldGroup.qty != null &&
        fieldGroup.iva != null &&
        fieldGroup.price != null
      ) {
        // console.log(fieldGroup);
        fieldGroup.total =
          fieldGroup.qty * fieldGroup.price * (fieldGroup.iva + 1);
        treatmentsCopy.splice(index, 1, fieldGroup);
        // console.log("fieldGroup", fieldGroup);
        // console.log("treatmentsCopy", treatmentsCopy);
        fieldGroup.total = Number(fieldGroup.total.toFixed(2));

        totalSum += fieldGroup.total;

        form.setFieldsValue({ treatments: treatmentsCopy, totalSum });
      }
    });
    update && setbillDataChange(true);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onFinish = (value) => {
    // !update && createNewBill(value) && setBill(value) && showModal;
    // update && !billDataChange && setError("No changes were made");
    // update &&
    //   billDataChange &&
    //   updateBill(value) &&
    setBill(value);
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const saveBillFn = async () => {
    // console.log(bill);
    !update && createNewBill(bill) && setOpenPrintPdf(true);
    update && !billDataChange && setError("No changes were made");
    update && billDataChange && updateBill(bill) && setOpenPrintPdf(true);
    // generatePdf();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePrintPdf = () => {
    bill !== undefined && generatePdf(bill);
    setOpenPrintPdf(false);
    navigate("/FinancialReport");
  };

  const handleCancelComfirmPdf = () => {
    setOpenPrintPdf(false);
    navigate("/FinancialReport");
  };

  // const confirmModal = () => {
  //   Modal.confirm({
  //     title: "Print in pdf",
  //     content: "Do you want to print this bill in pdf?",
  //     footer: (_, { OkBtn, CancelBtn }) => (
  //       <>
  //         <CancelBtn onClick={() => handleCancelComfirmPdf()} />
  //         <Button
  //           onClick={() => {
  //             handlePrintPdf();
  //           }}
  //           type="primary"
  //         >
  //           Print in PDF
  //         </Button>
  //       </>
  //     ),
  //   });
  // };

  useEffect(() => {
    if (update === true) {
      form.setFieldsValue({
        id: searchedBill?._id,
        date: dayjs(searchedBill?.date),
        billNumber: searchedBill?.billNumber,
        Patient: searchedBill?.Patient[0]._id,
        description: searchedBill?.description,
        treatments: searchedBill?.treatments,
        totalSum: searchedBill?.totalSum,
      });
    }
  }, []);

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

  return (
    <>
      <div style={{ height: "100%" }}>
        <Form
          form={form}
          name="newBill"
          onFinish={onFinish}
          onFinishFailed={() => setError("You must fill the form")}
          onValuesChange={handleTotal}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item name="id" label="id" hidden>
            <Input readOnly />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="billNumber"
            label="Bill Number"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label="Patient"
            name="Patient"
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

          <Form.Item name="dni" label="DNI">
            <Input readOnly />
          </Form.Item>

          <Form.Item name="adress" label="Adress">
            <Input readOnly />
          </Form.Item>

          <Form.Item name="tel" label="Tel">
            <Input readOnly />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.List
            name="treatments"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
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
                      initialValue={1}
                    >
                      <InputNumber placeholder="Qty" min={1} />
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
                      <InputNumber placeholder="PRICE" min={1} suffix="€" />
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
                      <InputNumber readOnly placeholder="TOTAL" />
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

          <Form.Item name="totalSum">
            <Input readOnly placeholder="Total Sum" />
          </Form.Item>

          <Form.Item label="Status" name="status" initialValue={"pending"}>
            <Select
              size="large"
              options={[
                { label: "Paid", value: "paid" },
                { label: "Pending", value: "pending" },
                { label: "Removed", value: "removed" },
              ]}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            {/* {!update ? "Save" : "Update"} */}
            Preview
          </Button>
        </Form>
      </div>
      <Modal
        title=" Bill"
        width={550}
        centered
        open={isModalOpen}
        onOk={saveBillFn}
        onCancel={handleCancel}
      >
        <Bill bill={bill} />
      </Modal>
      <Modal
        title="Modal"
        open={openPrintPdf}
        onOk={() => handlePrintPdf()}
        onCancel={() => handleCancelComfirmPdf()}
        okText="Print PDF"
        cancelText="Cancel"
      >
        <p>Do you want to print this bill in pdf?</p>
      </Modal>
      {/* <Button onClick={() => generatePdf(bill)}>X</Button> */}
    </>
  );
};
