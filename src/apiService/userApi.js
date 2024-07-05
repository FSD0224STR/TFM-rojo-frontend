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
  // console.log("new user Api", newUser);
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

export const searchUserUpdate = async (idUser) => {
  const response = await fetch(`${baseUrl}/user/searchUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: idUser }),
  });
  // console.log(response);
  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  return { data: await response.json() };
};

export const updateUserApi = async (userData) => {
  const response = await fetch(`${baseUrl}/user/updateUser`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  // console.log(response.status);
  if (!response.ok) {
    return response.status;
  }
  return response.status;
};

export const sendEmailToUser = async (emailData) => {
  console.log("email data: ", emailData)
  try {
    const response = await fetch(`${baseUrl}/user/sendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData), // Correctly stringifying the JSON object
    });

    console.log("Response Status:", response.status); // Debugging: Log the response status

    if (!response.ok) {
      const responseBody = await response.text();
      console.log("Response Body:", responseBody); // Debugging: Log the response body
      return response.status;
    }
    return response.status;
  } catch (error) {
    console.error("Error sending the email:", error);
    throw error;
  }
};