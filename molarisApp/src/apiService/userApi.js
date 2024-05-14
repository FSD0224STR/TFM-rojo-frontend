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
  // console.log("userApiToken", token);
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
  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  return { data: await response.json() };
};

export const createUser = async (newUser) => {
  console.log("new user Api", newUser);
  const response = await fetch(`${baseUrl}/user/newUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  console.log(response);
  if (!response.ok) {
    const error = await response;
    return error.status;
  }

  return response.status;
};

export const updateUserPassword = async (user) => {
  const response = await fetch(`${baseUrl}/user/updatePassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
  // console.log(response);
  // if (!response.ok) {
  //   const error = await response;
  //   return error.status;
  // }
  return response.status;
};
