// const baseUrl = "http://localhost:3000";
const baseUrl = "https://tfm-rojo-backend-1emu.onrender.com";

export const createBill = async (newBill) => {
  alert("hola");
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

  // console.log(response);
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
// export const changeStatusBillApi = async (idBill, newStatus, color) => {
//   const response = await fetch(`${baseUrl}/bill/changeStatus`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id: idBill, status: newStatus, color: color }),
//   });
//   // console.log(response);
//   return response.status;
// };

// knlĺmm
