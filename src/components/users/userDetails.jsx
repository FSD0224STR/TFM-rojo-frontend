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
      label: "Last name",
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
      <div style={{ display: 'flex', flexDirection: 'row', padding: '20px', justifyContent: 'space-around', width: '100%' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px' }}>
          <h1>{searchedUser?.name + " " + searchedUser?.lastName}</h1>
          <div style={{ marginBottom: '20px' }}>
            <img src={
              searchedUser?.fileUrlLink !== undefined
                ? searchedUser?.fileUrlLink
                : `https://api.dicebear.com/7.x/miniavs/svg?seed=${searchedUser?._id}`
            } alt="User" style={{ width: '300px', height: '300px', borderRadius: '50%' }} />
          </div>
          <div>
            <button
                onClick={() => setShowEmailForm(!showEmailForm)}
                style={{ marginBottom: '20px', backgroundColor: '#1890ff', color: 'white', border: 'none', padding: '10px', borderRadius: '50%', cursor: 'pointer'}}
              >
                <MailOutlined />
              </button>
              <FloatingEmailForm isVisible={showEmailForm} onClose={() => setShowEmailForm(false)} emailDefault={searchedUser.email} />
          </div>
          <Descriptions title={""} layout="vertical" bordered>
            {items.map(item => (
              <Descriptions.Item label={item.label} key={item.key}>
                {item.children}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '20px' }}>
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Bills</h2>
            <TableResume searchid={searchedUser?._id} type="bill" />
          </div>
  
          <div style={{ width: '100%' }}>
            <h2 style={{ textAlign: 'center' }}>Appointments</h2>
            <TableResume searchid={searchedUser?._id} type="dates" />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetails;