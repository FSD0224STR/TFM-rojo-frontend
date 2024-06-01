import React, { useContext, useEffect, useState } from "react";
import { DatesContext } from "../../contexts/DatesContext";
import { Badge } from "antd";

export const CalendarItem = (date) => {
  const { searchUserInfo } = useContext(DatesContext);
  const [user, setUser] = useState();

  const findInfo = async () => {
    const userInfo = await searchUserInfo(date.date.idPatient);
    setUser(userInfo);
  };

  useEffect(() => {
    // console.log(date.date.color);
    findInfo();
  }, []);

  return (
    <>
      <li style={{ listStyle: "none" }}>
        <Badge
          color={date.date.color}
          text={`${date.date.time} ${user?.name} ${user?.lastName}`}
        />
      </li>
    </>
  );
};
