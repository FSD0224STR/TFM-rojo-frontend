import React, { useContext, useEffect, useState } from "react";
import { DatesContext } from "../../contexts/DatesContext";
import { Badge } from "antd";

export const CalendarItem = ({ date }) => {
  const { searchUserInfo } = useContext(DatesContext);
  const [user, setUser] = useState();

  useEffect(() => {
    // console.log("date", date);
  }, []);

  return (
    <>
      <li style={{ listStyle: "none" }}>
        <Badge
          color={date?.color}
          text={`${date?.time} ${date?.idPatient?.name} ${date?.idPatient?.lastName}`}
        />
      </li>
    </>
  );
};
