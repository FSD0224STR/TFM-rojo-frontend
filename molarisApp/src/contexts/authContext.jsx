import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginApi, getMyUser } from "../apiService/userApi";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const getMyProfile = async () => {
    const token = localStorage.getItem("access_token");
    // console.log(`Access token: ${token}`);
    if (token) {
      const response = await getMyUser(token);
      console.log("response: " + response);
      if (response) {
        setIsLoggedIn(true);
        navigate("/dashboard");
      }
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  const login = async (email, password) => {
    setLoading(true);

    const user = { email: email, password: password };

    const response = await LoginApi(user);
    console.log("response: " + response.error);
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
      setLoading(false);
      setIsLoggedIn(true);
      localStorage.setItem("access_token", `Bearer ${response}`);
      navigate("/Dashboard");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  const authContextValue = {
    isLoggedIn,
    error,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
