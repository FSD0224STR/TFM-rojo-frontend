// const baseUrl = "http://localhost:3000";
const baseUrl = "https://tfm-rojo-backend-1emu.onrender.com";

export const createDate = async (newDate) => {
  const response = await fetch(`${baseUrl}/date/newDate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDate),
  });
  // console.log(response);

  return response.status;
};

export const getAllDates = async (token) => {
  const response = await fetch(`${baseUrl}/date/getDates`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `${token}`,
    },
  });
  // console.log(response);
  if (!response.ok) return { error: response.status };
  return await response.json();
};

export const deleteDateApi = async (id) => {
  // console.log(id);
  const response = await fetch(`${baseUrl}/date/deletedate/${id}`, {
    method: "DELETE",
  });

  return response.status;
};

export const changeStatusDateApi = async (idDate, newStatus, color) => {
  const response = await fetch(`${baseUrl}/date/changeStatus`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: idDate, status: newStatus, color: color }),
  });
  // console.log(response);
  return response.status;
};
