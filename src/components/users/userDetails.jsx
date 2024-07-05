import React from "react";
import { Badge, Descriptions } from "antd";
import { useContext, useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { AuthContext } from "../../contexts/authContext.jsx";
import FloatingEmailForm from "./emailForm.jsx";
import dayjs from "dayjs";
import { TableResume } from "../TableResume/TableResume.jsx";

function UserDetails() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const { searchedUser } = useContext(AuthContext);

  const items = [
    {
      key: "1",
      label: "Nombre",
      children: searchedUser?.name,
    },
    {
      key: "2",
      label: "Apellido",
      children: searchedUser?.lastName,
    },
    {
      key: "3",
      label: "Email",
      children: searchedUser?.email,
    },
    {
      key: "4",
      label: "Country",
      children: searchedUser?.country,
    },
    {
      key: "5",
      label: "Province",
      children: searchedUser?.province,
      span: 2,
    },
    {
      key: "6",
      label: "Es cliente",
      children: <Badge status="processing" text="Sí" />,
      span: 3,
    },
    {
      key: "7",
      label: "Fecha de nacimiento",
      children: dayjs(searchedUser?.birthDay).format("YYYY-MM-DD"),
    },
    {
      key: "8",
      label: "Rol",
      children: searchedUser?.roles,
      span: 2,
    },
    {
      key: "9",
      label: "Dni",
      children: searchedUser?.dni,
    },
    {
      key: "10",
      label: "Billing",
      children: (
        <>
          Factura 1...
          <br />
          Factura 2...
          <br />
          Factura 3...
          <br />
          Factura 4...
          <br />
          Factura 5...
          <br />
          Factura 6...
          <br />
          Factura 7...
          <br />
          Factura 8...
          <br />
          Factura 9...
          <br />
          Factura 10...
        </>
      ),
    },
  ];

  return (
    <>
      <div>
        <img
          src={
            searchedUser?.fileUrlLink !== undefined
              ? searchedUser?.fileUrlLink
              : `https://api.dicebear.com/7.x/miniavs/svg?seed=${searchedUser?._id}`
          }
          alt="avatar"
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            marginBottom: "40px",
            marginTop: "1em",
            border: "2px solid #fff",
            boxShadow: "0 0 10px #fff",
            position: "absolute",
            top: "0",
            left: "20%",
          }}
        />
        <button
          onClick={() => setShowEmailForm(true)}
          style={{
            position: "absolute",
            top: "100px",
            left: "calc(20% + 250px)",
            cursor: "pointer",
            border: "none",
            background: "transparent",
          }}
        >
          <MailOutlined />
          {/* <MdEmail size="24" style={{ color: "#007bff" }} /> */}
        </button>
      </div>
      <div>
        <Descriptions
          column={3}
          size="big"
          style={{ width: "100%", marginTop: "5em" }}
        >
          {items.map((item, i) => (
            <Descriptions.Item label={item.label} key={i}>
              {item.children}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </div>
      <FloatingEmailForm
        isVisible={showEmailForm}
        onClose={() => setShowEmailForm(false)}
      />
      <TableResume searchid={searchedUser?._id} type="dates"></TableResume>
      <TableResume searchid={searchedUser?._id} type="bill"></TableResume>
    </>
  );
}

export default UserDetails;
