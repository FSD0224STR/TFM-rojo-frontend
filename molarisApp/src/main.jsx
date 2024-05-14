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
import { CreateNewDate } from "./Components/CreateNewDate/CreateNewDate.jsx";
import { ForgotPassword } from "./Routes/Login/ForgotPassword.jsx";
import { Agenda } from "./Routes/Agenda/Agenda.jsx";

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
        path: "/app",
        element: <App />,
      },
      {
        path: "/userdata",
        element: <UserData />,
      },
      {
        path: "/createnewdate",
        element: <CreateNewDate />,
      },
      {
        path: "/agenda",
        element: <Agenda />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
