import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginApi,
  getAllUsers,
  getMyUser,
  createUser,
  updateUserPassword,
  searchUserUpdate,
  updateUserApi,
} from "../apiService/userApi";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [roleData, setDataRole] = useState("");
  const [userData, setUserData] = useState();
  const [userName, setUserName] = useState("");
  const [searchUser, setSearchUser] = useState();

  const navigate = useNavigate();

  const ResetMessages = () => {
    setError("");
    setSuccess("");
  };

  const login = async (email, password) => {
    setLoading(true);
    // console.log("data when login", data);
    // console.log("role when login", role);
    if (email) {
      const user = { email: email, password: password };

      const response = await LoginApi(user);
      if (response.error === 403) {
        setError("La contraseña es incorrecta");
        setLoading(false);
      } else if (response.error === 404) {
        setError("El usuario no existe");
        // setTimeout(() => {
        //   navigate("/CreateUser");
        // }, 1000);
        setLoading(false);
      } else {
        ResetMessages();
        setLoading(false);

        localStorage.setItem("access_token", `Bearer ${response}`);
        getMyProfile();
      }
    } else {
      setError("Write your email address");
      setLoading(false);
    }
  };

  const getMyProfile = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const response = await getMyUser(token);
      if (response.data) {
        const userRole = await response.data.role;
        setUserName(response.data.name);
        setUserData(response.data);
        setTimeout(() => {
          GetUsers(userRole, response.data.email);
        }, 500);
      }
    } else {
      navigate("/");
    }
  };

  const GetUsers = async (role, email) => {
    const token = localStorage.getItem("access_token");
    // console.log(token);
    const response = await getAllUsers(token);
    // console.log(response);
    if (response.error === 400) {
      localStorage.removeItem("access_token");
      navigate("/");
    } else if (response.error === 403) {
      setData([]);
    } else {
      if (response.length && role !== "") {
        // console.log(response);
        if (role === "admin") {
          setData(response);
          // navigate("/userdata");
        } else if (role === "doctor") {
          const users = await response.filter((user) => {
            if (user.roles === "paciente") return user;
          });
          setData(users);
          // navigate("/userdata");
        } else if (role === "paciente") {
          // console.log(response);
          const users = await response.filter((user) => {
            if (user.email === email) return user;
          });
          setData(users);
          // navigate("/userdata");
        }
      }
      navigate("/userdata");
      setDataRole(role);
      setIsLoggedIn(true);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("username");

    // setData([]);
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
    setTimeout(() => {
      setSuccess("You have logged out successfully");
    }, 1000);
  };

  // Crate new user
  const createNewUser = async (newUser) => {
    setError("");
    setSuccess("");
    setLoading(true);
    delete newUser.confirmPassword;
    console.log("Data Auth Context", newUser);

    const response = await createUser(newUser);

    if (response === 200) {
      setSuccess("User created successfully");
      setTimeout(() => {
        getMyProfile();
      }, 1000);
    } else if (response === 409) {
      setError("This user already exists");
    } else {
      setError("Problem creating user");
    }

    setLoading(false);
  };

  // Update user password
  const updatePasswordApi = async (email, oldPassword, newPassword) => {
    setError("");
    setSuccess("");
    setLoading(true);
    if (oldPassword !== newPassword) {
      if (newPassword.length >= 6) {
        const user = {
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword,
        };
        const response = await updateUserPassword(user);
        if (response === 200) {
          setSuccess("Password updated successfully");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (response === 403) {
          setError("The old password is incorrect");
        } else if (response === 404) {
          setError("The user does not exist");
        } else {
          setError("Problem updating password");
        }
      } else {
        setError("The new password must be at least 6 characters");
      }
    } else {
      setError("The new password is the same as the old password");
    }
    setLoading(false);
  };

  const searchUpdateUserInfo = async (idUser) => {
    const response = await searchUserUpdate(idUser);

    return (
      setSearchUser(response.data),
      // console.log(searchUser),
      navigate(`/updateuser/`)
    );
  };

  const updateUser = async (dataUser) => {
    // ResetMessages();
    setLoading(true);
    // console.log(dataUser);

    const response = await updateUserApi(dataUser);
    if (response === 200)
      return (
        setSuccess("Successfully updated"),
        getMyProfile(),
        setLoading(false),
        ResetMessages()
      );

    return setError("The update was not successful"), ResetMessages();
  };

  const authContextValue = {
    isLoggedIn,
    success,
    error,
    loading,
    login,
    logout,
    data,
    userData,
    roleData,
    userName,
    setData,
    createNewUser,
    updatePasswordApi,
    searchUpdateUserInfo,
    searchUser,
    updateUser,
    setError,
  };

  useEffect(() => {
    ResetMessages();
    setLoading(false);
    getMyProfile();

    // console.log("getMyProfile");
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
