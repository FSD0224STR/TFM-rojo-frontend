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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
