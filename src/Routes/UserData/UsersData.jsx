import React, { useContext, useEffect } from "react";
import { Users } from "../../components/users/users";
import { AuthContext } from "../../contexts/authContext";

export const UserData = () => {
  const { setListData, data, GetUsers } = useContext(AuthContext);
  useEffect(() => {
    GetUsers();
  }, []);
  return (
    <div>
      <Users></Users>
    </div>
  );
};
