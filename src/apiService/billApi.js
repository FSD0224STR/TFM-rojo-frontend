// const baseUrl = "http://localhost:3000";
const baseUrl = "https://tfm-rojo-backend-1emu.onrender.com";

export const createBill = async (newBill) => {
  const response = await fetch(`${baseUrl}/bill/newBill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBill),
  });
  // console.log(response);

  return response.status;
};

export const getAllBills = async () => {
  const response = await fetch(`${baseUrl}/bill/getBill`);

  // console.log(response.json);
  if (!response.ok) return { error: response.status };
  return await response.json();
};

// export const deleteBillApi = async (id) => {
//   // console.log(id);
//   const response = await fetch(`${baseUrl}/date/deleteBill/${id}`, {
//     method: "DELETE",
//   });
//
//   return response.status;
// };
//

export const searchBill = async (idBill) => {
  const response = await fetch(`${baseUrl}/bill/searchBill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: idBill }),
  });
  // console.log(response);
  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  return { data: await response.json() };
};

export const updateBillApi = async (billData) => {
  const response = await fetch(`${baseUrl}/bill/updateBill`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(billData),
  });
  // console.log(response.status);

  return response.status;
};
