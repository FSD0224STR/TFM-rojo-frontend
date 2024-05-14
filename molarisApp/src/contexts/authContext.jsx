import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginApi,
  getAllUsers,
  getMyUser,
  createUser,
  updateUserPassword,
} from "../apiService/userApi";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [roleData, setDataRole] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

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
        setError("");
        setSuccess("");
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
        setTimeout(() => {
          // console.log("Role getMyProfile", userRole);
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
          navigate("/userdata");
        } else if (role === "doctor") {
          const users = await response.filter((user) => {
            if (user.roles === "paciente") return user;
          });
          setData(users);
          navigate("/userdata");
        } else if (role === "paciente") {
          // console.log(response);
          const users = await response.filter((user) => {
            if (user.email === email) return user;
          });
          setData(users);
          navigate("/userdata");
        }
        setDataRole(role);
        setIsLoggedIn(true);
        setLoading(false);
      }
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

  // Crear usuario
  const createNewUser = async (
    dni,
    name,
    lastName,
    email,
    password,
    confirmPassword,
    country,
    province,
    birthDay,
    role,
    politicsAccepted
  ) => {
    setError("");
    setSuccess("");
    setLoading(true);
    if (password === confirmPassword) {
      if (password.length >= 6) {
        if (politicsAccepted) {
          const newUser = {
            dni: dni,
            name: name,
            lastName: lastName,
            email: email,
            password: password,
            country: country,
            province: province,
            birthDay: new Date(String(birthDay)).toISOString(),
            roles: role,
          };
          // console.log(newUser);

          const response = await createUser(newUser);

          // console.log(response.error);
          // .then((response) => {
          console.log(response);
          if (response === 200) {
            setSuccess("User created successfully");
            // setTimeout(() => {
            //   navigate("/");
            // }, 1000);
          } else if (response === 409) {
            setError("This user already exists");
          } else {
            setError("Problem creating user");
          }
          // });
        } else {
          setError("You should accept privacy policies");
        }
      } else {
        setError("The password must be at least 6 characters");
      }
    } else {
      setError("The password does not match");
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

  const authContextValue = {
    isLoggedIn,
    success,
    error,
    loading,
    login,
    logout,
    data,
    roleData,
    userName,
    setData,
    createNewUser,
    updatePasswordApi,
  };

  useEffect(() => {
    setError("");
    setSuccess("");
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
