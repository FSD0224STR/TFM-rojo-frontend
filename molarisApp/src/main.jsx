import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Root } from "./Routes/Root.jsx";
import "./App.css";
import "./index.css";

import { App } from "./App.jsx";
import { Login } from "./Routes/Login/Login.jsx";
import { CreateUserForm } from "./Routes/CreateUserForm/CreateUserForm.jsx";

const router = createBrowserRouter([
  {
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/CreateUser",
        element: <CreateUserForm />,
      },
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/Dashboard",
        element: <App />,
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
