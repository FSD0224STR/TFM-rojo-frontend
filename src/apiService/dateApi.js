const baseUrl = "http://localhost:3000";

export const createDate = async (newDate) => {
  const response = await fetch(`${baseUrl}/date/newDate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDate),
  });
  console.log(response);
  if (!response.ok) {
    return response.status;
  }

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
