import { Avatar, Badge, Calendar, theme } from "antd";
import dayjs from "dayjs";

import { DatesContext } from "../../contexts/DatesContext";
import { useContext, useEffect } from "react";

export const AgendaComponent = () => {
  const { patientsDates, searchDoctorDates, doctor, searchDayDates } =
    useContext(DatesContext);

  const cellRender = (current) => {
    // console.log("HOLA");
    const response = patientsDates?.filter(
      (date) => date.date === current.format("YYYY-MM-DD")
    );
    if (response !== undefined) {
      return (
        <ul style={{ margin: "-4px 0 0 -35px" }}>
          {response?.map((date, i) => (
            <li key={i} style={{ listStyle: "none" }}>
              <Badge color={date.color} text={`${date.time} ${date.user}`} />
            </li>
          ))}
        </ul>
      );
    }
  };

  useEffect(() => {
    searchDoctorDates();
    // console.log(patientsDates);
  }, []);

  return (
    <Calendar
      onSelect={(date) => {
        const selectedDate = date.format("YYYY-MM-DD");
        // searchDoctorDates();
        searchDayDates(selectedDate, doctor);
      }}
      cellRender={cellRender}
    />
  );
};
