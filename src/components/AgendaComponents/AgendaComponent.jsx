import { Avatar, Badge, Calendar, theme } from "antd";
import dayjs from "dayjs";

import { DatesContext } from "../../contexts/DatesContext";
import { useContext, useEffect } from "react";
import { CalendarItem } from "./CalendarItem";

export const AgendaComponent = () => {
  const {
    patientsDates,
    searchDoctorDates,
    doctor,
    doctorId,
    searchDayDates,
    searchDoctors,
    dates,
    setDateSelected,
  } = useContext(DatesContext);

  const cellRender = (current) => {
    const response = patientsDates?.filter(
      (date) =>
        dayjs(date?.date).format("YYYY-MM-DD") === current.format("YYYY-MM-DD")
    );

    if (response !== undefined) {
      return (
        <>
          <ul style={{ margin: "-3px 0 0 -35px" }}>
            {response?.map((date, i) => {
              return <CalendarItem date={date} key={i} />;
            })}
          </ul>
        </>
      );
    }
  };

  useEffect(() => {
    searchDoctors();
    searchDoctorDates();
    // cellRender;
  }, [dates]);

  return (
    <>
      <Calendar
        onSelect={(date) => {
          const selectedDate = date.format("YYYY-MM-DD");
          setDateSelected(selectedDate);
          searchDayDates(selectedDate, doctorId, dates);
        }}
        cellRender={cellRender}
      />
    </>
  );
};
