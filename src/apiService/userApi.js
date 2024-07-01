
// const baseUrl = "https://tfm-rojo-backend-1emu.onrender.com";
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

export const searchUser = async (idUser) => {
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

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      resolve("error");
    };
  });
};

export const loadProfilePhotoApi = async (file) => {
  // console.log(event);
  const base64 = await convertBase64(file);
  // console.log("base64", base64);
  if (base64 === "error") {
    return "errorLoading";
  } else {
    const response = await fetch(`${baseUrl}/user/uploadImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ base64 }),
    });
    // console.log(await response.json());

    return await response.json();
  }
  // console.log(JSON.stringify(base64));
};
