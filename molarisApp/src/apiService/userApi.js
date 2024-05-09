const baseUrl = "http://localhost:3000";

// Login
export const LoginApi = async (user) => {
  const response = await fetch(`${baseUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  // console.log(response);
  if (!response.ok) return { error: response.status };
  return await response.json();
};

// Get users
export const getAllUsers = async (token) => {
  const response = await fetch(`${baseUrl}/user/getUsers`, {
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

export const getMyUser = async (token) => {
  const response = await fetch(`${baseUrl}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `${token}`,
    },
  });
  console.log("Esta es la respuesta userApi:", response.json().data());
  if (!response.ok) return { error: response.status };
  return await response;
};
