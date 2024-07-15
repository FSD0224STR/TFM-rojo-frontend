import React, { useContext, useEffect, useState } from "react";
import {
  createBill,
  getAllBills,
  updateBillApi,
  searchBill,
} from "../apiService/billApi";
import { AuthContext } from "../contexts/authContext";

export const BillContext = React.createContext();

export const BillProvider = ({ children }) => {
  const { setError, setSuccess, setLoading } = useContext(AuthContext);
  const { searchedUser, updateUser } = useContext(AuthContext);
  const [searchedBill, setSearchedBill] = useState ()

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
    console.log(newBill);
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
    return setSearchedBill(response.data);
  };

  const updateBill = async (billData) => {
    setLoading(true);

    const response = await updateBillApi(billData);
    if (response === 200)
      return (
        setSuccess("Successfully updated"), setLoading(false), ResetMessages()
      );

    return setError("The update was not successful"), ResetMessages();
  };

  const deleteBill = async (idBill) => {
    const data = {
      billNumber: billNumber,
      Patient: "",
      date: "",
      description: "",
      treatments:{
          price: "",
          iva: "",
          qty: "",
          total: "", 
          treatment:"", },
      totalSum: "",
      status: "Delete",
    }

    const response= await updateBillApi (data);
    return response.data;
  }

  const BillContextValue = {
    createNewBill,
    GetBills,
    updateBill,
    searchBillInfo,
    deleteBill
  };

  return (
    <BillContext.Provider value={BillContextValue}>
      {children}
    </BillContext.Provider>
  );
};
