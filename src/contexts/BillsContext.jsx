import React, { useContext, useEffect, useState } from "react";
import { createBill, getAllBills } from "../apiService/billApi";
import { AuthContext } from "../contexts/authContext";


export const BillContext = React.createContext();

export const BillProvider = ({ children }) => {
    const {setError, setSuccess, setLoading}= useContext(AuthContext)

    const [billData, setBillData]= useState()


  const GetBills = async () => {
    const response= await getAllBills ()
  
      if (response.data.length) {
    
        setBillData(response.data);
    return response.data
      } else {
        setError("No bills found")
      }
     
  };

  

  // Crate new user
  const createNewBill = async (newBill) => {
    setError("");
    setSuccess("");
    setLoading(true);
    console.log(newBill)
    const response = await createBill(newBill);

    if (response === 200) {
      setSuccess("Bill created successfully");
    
    } else {
      setError("Problem creating bill");
    }

    setLoading(false);
  };

 
// const updateUser = async (dataUser) => {
//     setLoading(true);
// 
//     const response = await updateUserApi(dataUser);
//     if (response === 200)
//       return (
//         setSuccess("Successfully updated"),
//         getMyProfile(),
//         setLoading(false),
//         ResetMessages()
//       );
// 
//     return setError("The update was not successful"), ResetMessages();
//   };

  const BillContextValue = {
    createNewBill,
    GetBills,
    billData
  };

  return (
    <BillContext.Provider value={BillContextValue}>
      {children}
    </BillContext.Provider>
  );
};
