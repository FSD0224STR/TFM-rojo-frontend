import React from 'react';
import { Card, Space, Table } from 'antd';
import { Empresa} from './Empresa';
import dayjs from 'dayjs';
import './Bill.css';


export const Bill = ({ bill }) => {

  const dataEmpresa = {
    name: "Clínica Odontodalia",
    cif: "B09485939",
    adress: "Calle San Marcos, 13. Madrid 28012",
    telefono: "633654782",
   };

   const columns = [
    {
      title: 'QTY',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'TREATMENT',
      dataIndex: 'treatment',
      key: 'treatment',
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'IVA',
      dataIndex: 'iva',
      key: 'iva',
    },
    {
      title: 'TOTAL',
      dataIndex: 'total',
      key: 'total',
    },

  ];

 
    //     
  return ( 
  <>
    <Space direction="vertical" size={30}>
    <Card
      title="Factura"
      extra={<a href="#">Edit</a>}
      style={{
        width: 500,
      }}
    >
      <div>
      {dayjs(bill.date).format("DD-MM-YYYY") }
      </div>
      <div className='empresa'>
       <Empresa   data= {dataEmpresa}/>   
      </div>
     
      <div>
        <strong>Datos paciente:</strong>
        <p>{bill.pacient}
        <p> {bill.DNI} </p>
        <p> {bill.adress}
        {bill.tel}</p>
        </p>
      </div>

      <div>
          <strong>Description:</strong> <p className='description' >{bill.description}</p>
      </div>

      <div>
        <Table 
          columns={columns}
          dataSource={bill.treatments}
        />

      
      </div>
      <div>
         TOTAL: 
      </div>
    </Card>
 
  </Space>
  </>
);
}

