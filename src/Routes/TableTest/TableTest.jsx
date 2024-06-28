import React, { useState } from "react";
import { TableResume } from "../../components/TableResume/TableResume";

export const TableTest = () => {
  const [userId, setuserId] = useState("663bd24c7dfd3e530bff8870");
  return (
    <div>
      <TableResume searchid={userId} type="dates"></TableResume>
      <TableResume searchid={userId} type="bill"></TableResume>
    </div>
  );
};
