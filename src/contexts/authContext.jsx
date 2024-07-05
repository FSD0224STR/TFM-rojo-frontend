import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginApi,
  getAllUsers,
  getMyUser,
  createUser,
  updateUserPassword,
  searchUser,
  updateUserApi,
  loadProfilePhotoApi,
} from "../apiService/userApi";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [roleData, setDataRole] = useState("");
  const [userData, setUserData] = useState();
  const [userName, setUserName] = useState("");
  const [searchedUser, setSearchedUser] = useState();

  const navigate = useNavigate();

  const ResetMessages = () => {
    setError("");
    setSuccess("");
  };

  const login = async (user) => {
    setLoading(true);
    if (user.email) {
      const response = await LoginApi(user);
      if (response.error === 403) {
        setError("La contraseña es incorrecta");
        setLoading(false);
      } else if (response.error === 404) {
        setError("El usuario no existe");

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
        setDataRole(response.data.role);
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
    const response = await getAllUsers(token);
    if (response.error === 400) {
      localStorage.removeItem("access_token");
      navigate("/");
    } else if (response.error === 403) {
      setData([]);
    } else {
      if (response.length && role !== "") {
        if (role === "admin") {
          setData(response);
        } else if (role === "doctor") {
          const users = await response.filter((user) => {
            if (user.roles === "patient") return user;
          });
          setData(users);
        } else if (role === "patient") {
          const users = await response.filter((user) => {
            if (user.email === email) return user;
          });
          setData(users);
        }
      }
      navigate("/userdata");
      return setIsLoggedIn(true), setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
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
    // console.log("Data Auth Context", newUser);

    const response = await createUser(newUser);
    if (response === 200) {
      setSuccess("User created successfully");
      // setTimeout(() => {
      //   getMyProfile();
      // }, 1000);
      setTimeout(() => {
        navigate("/userdata");
      }, 1000);
    } else if (response === 409) {
      setError("This user already exists");
    } else {
      setError("Problem creating user");
    }

    setLoading(false);
  };

  // Load profile photo
  const loadProfilePhoto = async (image) => {
    // console.log(image);
    setLoadingPhoto(true);
    const response = await loadProfilePhotoApi(image);
    // console.log("respuesta", response);
    if (response === "errorLoading") {
      setError("Problem loading profile photo");
      setLoading(false);
      return null;
    }
    if (response.url !== "" && response !== null) {
      // console.log("Error");
      setSuccess("Profile photo successfully loaded");
      setLoadingPhoto(false);
      return response.url;
    } else {
      setError("Problem loading profile photo");
      setLoadingPhoto(false);
      return null;
    }
  };

  // Update user password
  const updatePasswordApi = async (user) => {
    setError("");
    setSuccess("");
    setLoading(true);
    if (user.oldPassword !== user.newPassword) {
      if (user.newPassword.length >= 6) {
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

  const searchUserInfo = async (idUser) => {
    const response = await searchUser(idUser);
    // console.log(response);
    return setSearchedUser(response.data);
  };

  const updateUser = async (dataUser) => {
    setLoading(true);

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
    setSuccess,
    success,
    setError,
    error,
    loading,
    setLoading,
    login,
    loadingPhoto,
    logout,
    data,
    userData,
    roleData,
    userName,
    setData,
    GetUsers,
    createNewUser,
    updatePasswordApi,
    searchUserInfo,
    searchedUser,
    updateUser,
    navigate,
    ResetMessages,
    loadProfilePhoto,
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
