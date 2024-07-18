import React, { useState, useEffect, useContext } from "react";
import { Card, Space, Table } from "antd";
import { Empresa } from "./Empresa";
import dayjs from "dayjs";
import "./Bill.css";
import { DatesContext } from "../../contexts/DatesContext";
import { jsPDF } from "jspdf";
import { BillContext } from "../../contexts/BillsContext";

export const Bill = ({ bill }) => {
  const { searchUserInfo } = useContext(DatesContext);
  const { fillUserData } = useContext(BillContext);

  const [patientName, setPatientName] = useState();

  const fillUserName = async (id) => {
    const response = await fillUserData(id);
    setPatientName(response);
  };

  useEffect(() => {
    bill.Patient !== undefined && fillUserName(bill?.Patient);
  }, [bill?.Patient]);

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
      {patientName !== undefined && (
        <Space direction="vertical" size={30}>
          <Card
            
            style={{
              width: 500,
            }}
          >
            <div>
              <img
                style={{ width: 70,  }}
                src="MolarisLogo-removebg-preview.png"
                alt="Logo"
              />
              <div>
              <strong>BILL Nº {bill?.billNumber} </strong> <br></br>
              <strong>{dayjs(bill?.date).format("DD-MM-YYYY")}</strong>
              </div>
            </div>
            <div className="empresa">
              <Empresa data={dataEmpresa} />
            </div>

            <div style={{ lineHeight: 0.5 }}>
             <strong>Patient Data:</strong>
              <p>{patientName} </p>
              <p> {bill?.dni} </p>
              <p> {bill?.adress} </p>
              <p>{bill?.tel} </p>
            </div>

            <div>
              <strong>Description:</strong>{" "}
              <p className="description">{bill?.description}</p>
            </div>

            <div>
              <Table columns={columns} dataSource={bill?.treatments} />
            </div>
            <div>TOTAL: {bill?.totalSum} €</div>
          </Card>
        </Space>
      )}
    </>
  );
};
