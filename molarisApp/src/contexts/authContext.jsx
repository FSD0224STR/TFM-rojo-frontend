import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginApi,
  getAllUsers,
  getMyUser,
  createUser,
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
        setTimeout(() => {
          navigate("/CreateUser");
        }, 1000);
        setLoading(false);
      } else {
        setError("");
        setSuccess("");
        setLoading(false);

        localStorage.setItem("access_token", `Bearer ${response}`);
        getMyProfile();
      }
    } else {
      setError("El email es obligatorio");
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
          GetUsers(userRole);
        }, 500);
      }
    }
    // else {
    //   setError("No se ha podido acceder vuelva a intentarlo");
    // }
  };

  const GetUsers = async (role) => {
    const token = localStorage.getItem("access_token");
    // console.log(token);
    const response = await getAllUsers(token);

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
        } else if (role === "doctor") {
          const users = await response.filter((user) => {
            if (user.roles === "paciente") return user;
          });
          setData(users);
        } else if (role === "paciente") {
          // console.log(response);
          const users = await response.filter((user) => {
            if (user.email === response.email) return user;
          });
          setData(users);
        }
        setDataRole(role);
        setIsLoggedIn(true);
        navigate("/dashboard");
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
    console.log(data);
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
    if (password === confirmPassword) {
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
          setSuccess("Usuario creado correctamente");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else if (response === 409) {
          setError("Este usuario ya existe");
        } else {
          setError("Error al crear el usuario");
        }
        // });
      } else {
        setError("Debes aceptar las politicas de privacidad");
      }
    } else {
      setError("Las contraseñas no coinciden");
    }
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
  };

  useEffect(() => {
    setError("");
    setSuccess("");
    getMyProfile();
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};