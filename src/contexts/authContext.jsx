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
  sendEmailToUserApi,
  loadProfilePhotoApi,
} from "../apiService/userApi";
import { socket } from "../components/SimpleChatComponents/Socket";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState();
  const [data, setData] = useState([]);
  const [roleData, setDataRole] = useState("");
  const [userData, setUserData] = useState();
  const [userName, setUserName] = useState("");
  const [searchedUser, setSearchedUser] = useState();

  const navigate = useNavigate();

  const ResetMessages = () => {
    setError("");
    setSuccess("");
    // setMessage("");
  };

  const login = async (user) => {
    setLoading(true);
    if (user.email) {
      const response = await LoginApi(user);
      if (response.error === 403) {
        setError("The password is invalid");
        setLoading(false);
      } else if (response.error === 404) {
        setError("The user does not exist");

        setLoading(false);
      } else {
        navigate("/userdata");
        setIsLoggedIn(true);
        ResetMessages();
        localStorage.setItem("access_token", `Bearer ${response}`);
        await getMyProfile();
        setLoading(false);
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
        await GetUsers(userRole, response.data.email);
        if (isLoggedIn === false) setIsLoggedIn(true), navigate("/userdata");
      }
    } else {
      navigate("/");
    }
  };

  const sendEmailToUser = async (email) => {
    setLoading(true);
    const response = await sendEmailToUserApi(email);
    if (response === 200) {
      setSuccess("Email sent successfully");
    } else {
      setError("The email was not sent");
    }
    setLoading(false);
  };

  const findUsers = async () => {
    const token = localStorage.getItem("access_token");
    const response = await getAllUsers(token);
    return response;
  };

  const GetUsers = async (role, email) => {
    setLoading(true);
    const response = await findUsers();
    // console.log(response);

    if (response.error === 400) {
      localStorage.removeItem("access_token");
      navigate("/");
    } else if (response.error === 403) {
      setData([]);
    } else {
      if (response.length && role !== "") {
        if (role === "admin") {
          setData(response);
          setLoading(false);
          // return response;
        } else if (role === "doctor") {
          const users = await response.filter((user) => {
            if (user.roles === "patient" || user.roles === "doctor")
              return user;
          });
          setData(users);
          setLoading(false);
          // return users;
        } else if (role === "patient") {
          const users = await response.filter((user) => {
            if (user.email === email) return user;
          });
          setData(users);
          setLoading(false);
          // return users;
        }
        if (
          localStorage.getItem("access_token") !== null &&
          localStorage.getItem("access_token") !== undefined &&
          localStorage.getItem("access_token") !== "" &&
          window.location.href.split("/")[3] === ""
        ) {
          setLoading(false);
        }
      }

      // navigate("/userdata");
    }
  };

  const logout = () => {
    setMessage("");
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
    setTimeout(() => {
      setSuccess("You have logged out successfully");
      if (userData) {
        socket.emit("logout", { user: userData.name });
      }
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

      await getMyProfile();

      // await GetUsers();
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
    setLoading(true);
    const response = await searchUser(idUser);
    // console.log(response);
    setLoading(false);
    setSearchedUser(response.data);
    return response.data;
  };

  const searchUserInfoTable = async (idUser) => {
    const response = await searchUser(idUser);
    // console.log(response);
    return response.data;
  };

  const updateUser = async (dataUser) => {
    ResetMessages();
    setLoading(true);
    setData([]);
    // console.log("dataUser", dataUser);
    const response = await updateUserApi(dataUser);
    if (response === 200)
      return (
        setSuccess("Successfully updated"),
        await getMyProfile(),
        setLoading(false),
        navigate("/userdata")
      );

    return setError("The update was not successful"), ResetMessages();
  };

  const authContextValue = {
    isLoggedIn,
    success,
    error,
    message,
    loading,
    loadingPhoto,
    data,
    userData,
    roleData,
    userName,
    searchedUser,
    getMyProfile,
    setSuccess,
    setError,
    setMessage,
    setLoading,
    login,
    logout,
    setData,
    GetUsers,
    createNewUser,
    updatePasswordApi,
    searchUserInfo,
    updateUser,
    navigate,
    ResetMessages,
    loadProfilePhoto,
    searchUserInfoTable,
    findUsers,
    sendEmailToUser,
  };

  useEffect(() => {
    ResetMessages();
    setLoading(false);
    getMyProfile();
    if (
      localStorage.getItem("access_token") !== null &&
      localStorage.getItem("access_token") !== undefined &&
      localStorage.getItem("access_token") !== "" &&
      window.location.href.split("/")[3] === ""
    ) {
      setLoading(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
