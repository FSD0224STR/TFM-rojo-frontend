import { useContext, useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { AuthContext } from "../../contexts/authContext.jsx";
import FloatingEmailForm from "./emailForm.jsx";
import dayjs from "dayjs";
import { TableResume } from "../TableResume/TableResume.jsx";
import React from 'react';
import { Badge, Descriptions } from 'antd';

function UserDetails() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const { searchedUser } = useContext(AuthContext);

  const items = [
    {
      key: "1",
      label: "Name",
      children: searchedUser?.name,
    },
    {
      key: "2",
      label: "Surname",
      children: searchedUser?.lastName,
    },
    {
      key: "3",
      label: "Email",
      children: searchedUser?.email,
    },
    {
      key: "6",
      label: "Client",
      children: <Badge status="processing" text="Yes" />,
      span: 3,
    },
    {
      key: "7",
      label: "Birth date",
      children: dayjs(searchedUser?.birthDay).format("YYYY-MM-DD"),
    },
    {
      key: "8",
      label: "Role",
      children: searchedUser?.roles,
      span: 2,
    },
    {
      key: "9",
      label: "DNI",
      children: searchedUser?.dni,
    },
  ];

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '20px', height: '100vh' }}>
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
              marginTop: "5em",
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
          </button>
        <div style={{ gridArea: '1 / 1 / 2 / 2' }}>
        </div>
        <div style={{ gridArea: '1 / 2 / 2 / 3', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Descriptions
            bordered={items.length > 3 ? true : false}
            column={3}
            size="big"
            style={{ maxWidth: '1000px', textAlign: 'center' }}
          >
            {items.map((item, i) => (
              <Descriptions.Item label={item.label} key={i}>
                {item.children}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </div>

        {/* Cuadrante 3: Facturas */}
        <div style={{ gridArea: '2 / 1 / 3 / 2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TableResume searchid={searchedUser?._id} type="bill"></TableResume>
        </div>

        {/* Cuadrante 4: Citas */}
        <div style={{ gridArea: '2 / 2 / 3 / 3', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TableResume searchid={searchedUser?._id} type="dates"></TableResume>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
