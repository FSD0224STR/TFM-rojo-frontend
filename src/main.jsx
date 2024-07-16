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
import { ChangePassword } from "./Routes/Login/ChangePassword.jsx";
import { UpdateUserForm } from "./Routes/CreateUserForm/UpdateUserForm.jsx";
import { CreateBills } from "./components/CreateBills/CreateBills.jsx";
import { Agenda } from "./Routes/Agenda/Agenda.jsx";
import UserDetails from "./components/users/userDetails.jsx";
import { MyUser } from "./Routes/MyUser/MyUser.jsx";
import { CreateDate } from "./Routes/CreateDate/CreateDate.jsx";
import { CreatePatientForm } from "./Routes/CreateUserForm/CreatePatientForm.jsx";
import { TableTest } from "./Routes/TableTest/TableTest.jsx";
import { Bill } from "./components/CreateBills/Bill.jsx";
import { ChatLayout } from "./Routes/Chat/ChatLayout.jsx";
import { SimpleChat } from "./components/Chat/SimpleChat.jsx";

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
        path: "/changepassword",
        element: <ChangePassword />,
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
        element: <CreateDate />,
      },
      {
        path: "/agenda",
        element: <Agenda />,
      },
      {
        path: "/user",
        element: <UserDetails />,
      },
      {
        path: "/tabletest",
        element: <TableTest />,
      },
      {
        path: "/CreateBills/",
        element: <CreateBills />,
      },
      {
        path: "/UpdateBills/",
        element: <CreateBills update={true}/>,
      },
      {
        path: "/createuserpatient/",
        element: <CreatePatientForm />,
      },
      {
        path: "/chat/",
        element: <SimpleChat />,
        // element: <ChatLayout />,
      },
      // },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
