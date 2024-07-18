import React, { useContext, useEffect, useState } from "react";
import {
  createBill,
  getAllBills,
  updateBillApi,
  searchBill,
} from "../apiService/billApi";
import { AuthContext } from "../contexts/authContext";
import jsPDF from "jspdf";
import dayjs from "dayjs";
import 'jspdf-autotable'
import autoTable from "jspdf-autotable";
export const BillContext = React.createContext();

export const BillProvider = ({ children }) => {
  const { setError, setSuccess, setLoading, ResetMessages, searchUserInfo } =
    useContext(AuthContext);
  const { searchedUser, updateUser } = useContext(AuthContext);
  const [searchedBill, setSearchedBill] = useState();

  const GetBills = async () => {
    const response = await getAllBills();

    if (response.data.length) {
      return response.data;
    } else {
      setError("No bills found");
    }
  };

  // Create new bill
  const createNewBill = async (newBill) => {
    setError("");
    setSuccess("");
    setLoading(true);
    // console.log(newBill);
    const response = await createBill(newBill);

    if (response === 200) {
      setSuccess("Bill created successfully");
    } else {
      setError("Problem creating bill");
    }

    setLoading(false);
  };

  const searchBillInfo = async (idBill) => {
    const response = await searchBill(idBill);
    // console.log(response);
    setSearchedBill(response.data);
    return response.data;
  };

  const updateBill = async (billData) => {
    setLoading(true);
    // console.log(billData);
    const response = await updateBillApi(billData);
    if (response === 200)
      return (
        setSuccess("Successfully updated"), setLoading(false), ResetMessages()
      );

    return setError("The update was not successful"), ResetMessages();
  };

  const deleteBill = async (billData) => {
    const data = {
      billNumber: billData.billNumber,
      id: billData._id,
      Patient: billData.Patient,
      date: "",
      description: "",
      treatments: {
        price: "",
        iva: "",
        qty: "",
        total: "",
        treatment: "",
      },
      totalSum: "",
      status: "removed",
    };

    const response = await updateBillApi(data);
    if (response === 200) {
      setSuccess("Deleted successfully");
    } else {
      setError("Could not deleted ");
    }
  };

  const fillUserData = async (id) => {
    const response = await searchUserInfo(id);
    // console.log(response);
    return response?.name + " " + response?.lastName;
  };

  const generatePdf = async (bill) => {
    const dataEmpresa = {
      name: "Clínica Odontodalia",
      cif: "B09485939",
      adress: "Calle San Marcos, 13. Madrid 28012",
      telefono: "633654782",
    };
    // encabezado

    const patientName = await fillUserData(bill?.Patient);
    console.log(patientName);
    const doc = new jsPDF();
    
    
    doc.text(`BILL Nº : ${bill?.billNumber}`, 10, 20);
    doc.text(`Fecha: ${dayjs(bill?.date).format("DD-MM-YYYY")}`, 10, 30);
    doc.text(`${dataEmpresa.name}`,100,40);
    doc.text(`${dataEmpresa.cif}`,100,50);
    doc.text(`${dataEmpresa.adress}`, 100,60);
    doc.text(`${dataEmpresa.telefono}`,100,70);
    doc.text(`${patientName}`, 10, 80);
    doc.text(`${bill?.adress }`, 10,90);
    doc.text(`${bill?.dni }`, 10,100);
    doc.text(`${bill?.tel}`, 10,110);
    doc.text( `Description:

    ${bill?.description}`,10,140);
  

    const columns = ['QTY', 'TREATMENT', 'PRICE', 'IVA', 'TOTAL'];
const startX = 30; // Coordenada X inicial
const startY = 170; // Coordenada Y inicial
const lineHeight = 10; // Altura de la línea entre filas
let currentY = startY;

// Función para agregar una fila de texto
const addRow = (rowData, startY) => {
  let currentX = startX;
  const columnWidths = [20, 60, 30, 20, 30]; // Anchos para cada columna

  rowData.forEach((text, index) => {
    doc.text(text, currentX, startY);
    currentX += columnWidths[index];
  });
};
 
// Agregar las columnas al PDF
addRow(columns, currentY);
currentY += lineHeight; // Mover a la siguiente línea

// Verificar si bill y bill.treatments existen
if (bill && bill.treatments) {
  bill.treatments.forEach((dato) => {
    const data = [`${dato.qty}`, `${dato.treatment}`, `${dato.price}`, `${dato.iva}`, `${dato.total}`];
    addRow(data, currentY);
    currentY += lineHeight; // Mover a la siguiente línea
  });
}
   
doc.text(`TOTAL: ${bill?.totalSum}`, 140, 210);
 //  //crear tabla
 //  const columns= [`QTY`,`TREATMENT`,`PRICE`,`IVA`, `TOTAL`];
 ///   const data= [`${bill?.treatments}`];
 //  bill?.treatments?.map((dato)=>{
 //   const data= [`${dato.qty}`, `${dato.treatment}`,`${dato.price}`,`${dato.iva}`,`${dato.total}`]
 //   doc.text(`${dato.iva}`, 10, 130)
  //  })

 //   doc.autoTable({
 //     startY:30,
 //     head: [columns],
 //     body: data
 //   }
 //   )

    // guardar el pdf con un nombre especifico

    doc.save(`bill_${bill?.billNumber}.pdf`);
  };

  const BillContextValue = {
    createNewBill,
    GetBills,
    updateBill,
    searchBillInfo,
    deleteBill,
    searchedBill,
    generatePdf,
    fillUserData,
  };

  return (
    <BillContext.Provider value={BillContextValue}>
      {children}
    </BillContext.Provider>
  );
};
