import React from "react";
import { UserForm } from "../../components/UserForm/UserForm";

export const CreatePatientForm = () => {
  return (
    <div style={{ height: "100%" }}>
      <UserForm type="patient" />
    </div>
  );
};
