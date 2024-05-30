import React from 'react';
import { Badge, Descriptions } from 'antd';
import { useContext, useState } from 'react';
import {AuthContext } from '../../contexts/authContext.jsx';

function userDetails() {
  
  const { searchedUser } = useContext(AuthContext);

  const items = [
    {
      key: '1',
      label: 'Nombre',
      children: searchedUser?.name,
    },
    {
      key: '2',
      label: 'Apellido',
      children: searchedUser?.lastName,
    },
    {
      key: '3',
      label: 'Email',
      children: searchedUser?.email,
    },
    {
      key: '4',
      label: 'Country',
      children: searchedUser?.country,
    },
    {
      key: '5',
      label: 'Province',
      children: searchedUser?.province,
      span: 2,
    },
    {
      key: '6',
      label: 'Es cliente',
      children: <Badge status="processing" text="Sí" />,
      span: 3,
    },
    {
      key: '7',
      label: 'Fecha de nacimiento',
      children: searchedUser?.birthDay,
    },
    {
      key: '8',
      label: 'Rol',
      children: searchedUser?.role,
      span: 2,
    },
    {
      key: '9',
      label: 'Dni',
      children: searchedUser?.dni,
    },
    {
      key: '10',
      label: 'Billing',
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
        <img src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${searchedUser?._id}`} alt='avatar' style={{ width: '250px', height: '250px', borderRadius: '50%', marginBottom: '5em', marginTop: '1em', border: '2px solid #fff', boxShadow: '0 0 10px #fff', translate: '-50%', position: 'absolute', top: '0', left: '20%', marginBottom: '40px' }} />
        <br />
      </div>
      <div>
        <Descriptions column={3} size="big" style={{ width: '100%', marginTop: '5em'}}>
          {items.map((item) => (
            <Descriptions.Item label={item.label}>
              {item.children}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </div>
    </>
    
  );
}


export default userDetails;