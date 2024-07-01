import React from "react";
import { UserForm } from "../../components/UserForm/UserForm";

export const CreateUserForm = () => {
  return (
    <div style={{ height: "100%" }}>
      <UserForm type="notPatient" />
    </div>
  );
};
