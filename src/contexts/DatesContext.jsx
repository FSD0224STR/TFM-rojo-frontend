import { createContext, useContext, useState } from "react";
import { AuthContext } from "./authContext";

export const DatesContext = createContext();

import { dates } from "./Dates";
import dayjs from "dayjs";
import { DatesHours } from "../components/AgendaComponents/DatesHours";

export const DatesProvider = ({ children }) => {
  const { data, userData } = useContext(AuthContext);

  const [patientsDates, setPatientsDates] = useState();
  const [doctors, setDoctors] = useState();
  const [doctor, setDoctor] = useState(userData?.role === "admin" ? "all" : "");
  const [dayDates, setDayDates] = useState(dates);
  const [enableDayHours, setEnableDayHours] = useState();
  const [enableDayHoursList, setEnableDayHoursList] = useState();
  const [userPacientes, setUserPacientes] = useState();

  const searchEnabledHours = (datesAssigned) => {
    const response = DatesHours.map((hour) => {
      for (let i = 0; i < datesAssigned.length; i++) {
        if (
          (hour >= datesAssigned[i].time &&
            hour < datesAssigned[i]?.timeFinish) ||
          hour === datesAssigned[i].time
        ) {
          return { label: hour, value: hour, enable: false };
        } else {
          return { label: hour, value: hour, enable: true };
        }
      }
    });
    setEnableDayHours(response);
    setEnableDayHoursList(
      response
        .map((hour) => {
          if (hour.enable === true) {
            return { label: hour.label, value: hour.value };
          }
        })
        .filter((hour) => hour !== undefined)
    );
  };

  const searchDoctors = async () => {
    if (userData?.role === "admin") {
      const response = await data.filter((user) => user.roles === "doctor");
      setDoctors(
        response.map((user) => {
          return {
            label: `Dr. ${user.name} ${user.lastName}`,
            value: `Dr. ${user.name} ${user.lastName}`,
          };
        })
      );
    } else if (userData?.role === "doctor") {
      setDoctors({
        label: `Dr. ${userData.name}`,
        value: `Dr. ${userData.name}`,
      });
    }
  };

  const searchDoctorDates = async (doctorSelected) => {
    const response = await dates.filter((date) => {
      if (date.doctor === doctorSelected) return date;
    });
    setPatientsDates(response);
  };

  const searchDayDates = async (date, doctor) => {
    const day = date !== "" ? date : dayjs().format("YYYY-MM-DD");
    const response = await dates.filter((userDate) => {
      if (userDate.doctor === doctor && userDate.date === day) {
        return userDate;
      }
    });

    searchEnabledHours(response);
    setDayDates(response);
  };

  const findPacientes = async () => {
    const response = await data.map((user) => {
      if (user.roles === "paciente")
        return { label: `${user.name} ${user.lastName}`, value: user._id };
    });
    const pacientes = await response.filter((user) => user !== undefined);
    return setUserPacientes(pacientes);
  };

  const dateContextValue = {
    searchDoctors,
    setDayDates,
    dayDates,
    searchDayDates,
    doctors,
    doctor,
    setDoctor,
    patientsDates,
    searchDoctorDates,
    enableDayHours,
    findPacientes,
    userPacientes,
    enableDayHoursList,
  };

  return (
    <DatesContext.Provider value={dateContextValue}>
      {children}
    </DatesContext.Provider>
  );
};
