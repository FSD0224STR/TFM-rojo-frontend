import { Card } from 'antd';
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext.jsx";

function UserDetails() {
 
  const {searchedUser} = useContext(AuthContext)
 

  return (
    <>
      <Card title={`User Detail for user ${searchedUser?.name}`}>
        <div>
          <img src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${searchedUser?.id}`} alt="" />
        </div>
        <div>
          <h3>User Data</h3>
          <div>
            <p>Dni: {searchedUser?.dni}</p>
            <p>Name: {searchedUser?.name}</p>
            <p>Last Name: {searchedUser?.lastName}</p>
            <p>Email: {searchedUser?.email}</p>
            <p>Country: {searchedUser?.country}</p>
            <p>Province: {searchedUser?.province}</p>
            <p>Birth Day: {searchedUser?.birthDay}</p>
            <p>Role: {searchedUser?.role}</p>
          </div>
        </div>
        <div>
          <h3>Facturas del paciente</h3>
          <div>
            <p>Factura 1</p>
            <p>Factura 2</p>
            <p>Factura 3</p>
          </div>
        </div>
      </Card>
    </>
  );
}

export default UserDetails;