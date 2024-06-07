import React, { useContext, useEffect, useState } from "react";
import { DatesContext } from "../../contexts/DatesContext";
import { Badge } from "antd";

export const CalendarItem = ({ date }) => {
  const { searchUserInfo } = useContext(DatesContext);
  const [user, setUser] = useState();

  const findInfo = async () => {
    const userInfo = await searchUserInfo(date?.idPatient);
    setUser(userInfo);
  };

  useEffect(() => {
    findInfo();
  }, []);

  return (
    <>
      <li style={{ listStyle: "none" }}>
        <Badge
          color={date?.color}
          text={`${date?.time} ${user?.name} ${user?.lastName}`}
        />
      </li>
    </>
  );
};
