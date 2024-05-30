import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Root } from "./Routes/Root.jsx";
import "./App.css";
import "./index.css";

import { App } from "./App.jsx";
import { Login } from "./Routes/Login/Login.jsx";
import { CreateUserForm } from "./Routes/CreateUserForm/CreateUserForm.jsx";
import { UserData } from "./Routes/UserData/UsersData.jsx";
import { CreateNewDate } from "./components/CreateNewDate/CreateNewDate.jsx";
import { ForgotPassword } from "./Routes/Login/ForgotPassword.jsx";
import { UpdateUserForm } from "./Routes/CreateUserForm/UpdateUserForm.jsx";
import { Agenda } from "./Routes/Agenda/Agenda.jsx";
import UserDetails from "./components/users/userDetails.jsx";

import { MyUser } from "./Routes/MyUser/MyUser.jsx";

const router = createBrowserRouter([
  {
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/createuser",
        element: <CreateUserForm />,
      },
      {
        path: "/updateuser/",

        element: <UpdateUserForm />,
      },
      {
        path: "/app",
        element: <App />,
      },
      {
        path: "/userdata",
        element: <UserData />,
      },
      {
        path: "/myuser",
        element: <MyUser />,
      },
      {
        path: "/createnewdate",
        element: <CreateNewDate />,
      },
      {
        path: "/agenda",
        element: <Agenda />,
      },
      {
        path: "/user/:id",
        element: <UserDetails />,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
