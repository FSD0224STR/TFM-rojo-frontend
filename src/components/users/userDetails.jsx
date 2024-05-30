import { Card } from 'antd';
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext.jsx";

function UserDetails() {
  const { id } = useParams();

  const { searchUser, updateUser, setError } = useContext(AuthContext);

  const [dni, setDni] = useState(`${searchUser?.dni}`);
  const [name, setName] = useState(`${searchUser?.name}`);
  const [lastName, setLastName] = useState(`${searchUser?.lastName}`);
  const [email, setEmail] = useState(`${searchUser?.email}`);
  const [country, setCountry] = useState(`${searchUser?.country}`);
  const [province, setProvince] = useState(`${searchUser?.province}`);
  const [birthDay, setBirthDay] = useState(`${searchUser?.birthDay}`);
  const [role, setRole] = useState(`${searchUser?.roles}`);
  const [userDataChange, setUserDataChange] = useState(false);
  if (!id) {
    return <div>User Detail not found</div>;
  }

  return (
    <>
      <Card title={`User Detail for user ${id}`} style={{ width: 300 }}>
        <div>
          <img src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${id}`} alt="" />
        </div>
        <div>
          <h3>User Data</h3>
          <div>
            <p>Dni: {dni}</p>
            <p>Name: {name}</p>
            <p>Last Name: {lastName}</p>
            <p>Email: {email}</p>
            <p>Country: {country}</p>
            <p>Province: {province}</p>
            <p>Birth Day: {birthDay}</p>
            <p>Role: {role}</p>
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