import React, { useState, useEffect, useContext } from "react";
import { Card, Space, Table } from "antd";
import { Empresa } from "./Empresa";
import dayjs from "dayjs";
import "./Bill.css";
import { DatesContext } from "../../contexts/DatesContext";
import { jsPDF } from "jspdf";



export const Bill = ({ bill }) => {
  const { searchUserInfo } = useContext(DatesContext);

  const [patientName, setPatientName] = useState();

  useEffect(() => {
    bill.Patient !== undefined && fillUserData(bill?.Patient);
  }, [bill?.Patient]);

  const fillUserData = async (id) => {
    const response = await searchUserInfo(id);
    setPatientName(response?.name + " " + response?.lastName);
  };

  const generarPdf = () => {
    const doc = new jsPDF();
    console.log (dayjs(bill?.date).format("DD-MM-YYYY"))
    doc.text( `Nº : ${bill?.billNumber}`, 10, 20);
    doc.text( `Fecha: ${(dayjs(bill?.date).format("DD-MM-YYYY"))}`,10,30 );
    doc.text ( `Cliente: ${patientName}`, 10,40);
    doc.text (`${bill?.totalSum}`, 10,50);

    // guardar el pdf con un nombre especifico
  
    doc.save(`bill_${bill?.billNumber}.pdf`)
  };

  const dataEmpresa = {
    name: "Clínica Odontodalia",
    cif: "B09485939",
    adress: "Calle San Marcos, 13. Madrid 28012",
    telefono: "633654782",
  };

  const columns = [
    {
      title: "QTY",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "TREATMENT",
      dataIndex: "treatment",
      key: "treatment",
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "IVA",
      dataIndex: "iva",
      key: "iva",
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
    },
  ];

  return (
    <>
      <Space direction="vertical" size={30}>
        <Card
          title="Factura"
          style={{
            width: 500,
          }}
        
        >
          <div>
            <p>Nº {bill?.billNumber} </p>
          </div>

          <div>{dayjs(bill?.date).format("DD-MM-YYYY")}</div>
          <div className="empresa">
            <Empresa data={dataEmpresa} />
          </div>

          <div>
            <strong>Datos paciente:</strong>
            <p>{patientName} </p>
            <p> {bill?.idPatient} </p>
            <p>
              {" "}
              {bill?.adress}
              {bill?.tel}
            </p>
          </div>

          <div>
            <strong>Description:</strong>{" "}
            <p className="description">{bill?.description}</p>
          </div>

          <div>
            <Table columns={columns} dataSource={bill?.treatments} />
          </div>
          <div>TOTAL: {bill?.totalSum} €</div>
        <button onClick={generarPdf}>imprimir</button>
        </Card>
            
      </Space>
    </>
  );
};
  