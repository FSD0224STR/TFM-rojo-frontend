import { Avatar, Badge, Calendar, theme } from "antd";
import dayjs from "dayjs";

import { DatesContext } from "../../contexts/DatesContext";
import { useContext, useEffect } from "react";
import { CalendarItem } from "./CalendarItem";
import { AuthContext } from "../../contexts/authContext";

export const AgendaComponent = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const {
    patientsDates,
    searchDoctorDates,
    doctor,
    doctorId,
    searchDayDates,
    searchDoctors,
    dates,
    setDateSelected,
    setDay,
  } = useContext(DatesContext);

  useEffect(() => {
    console.log("dates", patientsDates);
    // cellRender();
  }, [patientsDates]);

  const cellRender = (current) => {
    // console.log(patientsDates);
    const response = patientsDates?.filter((date) => {
      if (
        dayjs(date?.date).format("YYYY-MM-DD") ===
        dayjs(current).format("YYYY-MM-DD")
      ) {
        return date;
      }
    });
    // console.log(dayjs(current).format("YYYY-MM-DD"), response);
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

  const findDoctors = async () => {
    await searchDoctors();
  };

  useEffect(() => {
    findDoctors();
    // searchDoctorDates();
    // cellRender;
  }, [dates]);

  const findDayDates = async (date) => {
    setLoading(true);
    const selectedDate = date.format("YYYY-MM-DD");
    setDay(selectedDate);
    setDateSelected(selectedDate);
    await searchDayDates(selectedDate, doctorId, dates);
    setLoading(false);
  };

  return (
    <>
      <Calendar
        onSelect={async (date) => {
          await findDayDates(date);
        }}
        cellRender={patientsDates && cellRender}
      />
    </>
  );
};
