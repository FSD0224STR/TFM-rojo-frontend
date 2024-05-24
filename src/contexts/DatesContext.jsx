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
  const [userPacientes, setUserPacientes] = useState([]);

  const searchDoctorDates = async (doctor) => {
    // If the user role is admin, should show all the doctors and all the dates
    if (userData?.role === "admin") {
      // console.log(doctor);
      if (doctor === "" || doctor === undefined || doctor === "all") {
        // If Doctor is undefined, should show all the dates
        const doctorsResponse = await data.filter(
          (user) => user.roles === "doctor"
        );
        // console.log(doctorsResponse);
        const response = await doctorsResponse.map((doc) => {
          return {
            label: `Dr. ${doc.name} ${doc.lastName}`,
            value: `${doc._id}`,
          };
        });
        // console.log(response);
        return (
          setPatientsDates(dates),
          setDoctors([...response, { label: "All", value: "all" }]),
          setDayDates([])
        );
      } else {
        // If Doctor is defined, should show only the dates of that doctor
        return (
          setPatientsDates(dates.filter((date) => doctor === date.doctor)),
          setDayDates([])
        );
      }
    } else {
      // if the user is a doctor he can only see his dates
      const doctorLogin = [
        {
          label: `Dr. ${userData.name}`,
          value: `Dr. ${userData.name}`,
        },
      ];
      return (
        setDoctors(doctorLogin),
        setPatientsDates(dates.filter((date) => doctor === date.doctor))
      );
    }
  };

  const searchDayDates = async (date, doctor) => {
    // console.log(date);
    // console.log(doctor);
    const day = date !== "" ? date : dayjs().format("YYYY-MM-DD");
    const response = await dates.filter((userDate) => {
      if (
        (userDate.doctor === doctor || doctor === "all") &&
        userDate.date === day
      ) {
        return userDate;
      }
    });
    console.log("response", response);

    // Concat the dates with the schedule
    // console.log("response length", response.length);
    const datesList = DatesHours.map((hour) => {
      if (response.length > 0) {
        for (var i = 0; i < 2; i++) {
          // console.log(i, response[i].time);
          if (response[i]?.time === hour) {
            // alert(hour);
            // console.log(response[i]);
            return response[i];
          }
        }
        return { date: date, time: hour };
      } else {
        return { date: date, time: hour };
      }
    });

    console.log("dates list", datesList);

    return setDayDates(datesList);
    // console.log(response);
  };
  
  const findPacientes = async () => {
    const response = await data.map((user) => {
      if (user.roles === "paciente")
        return { label: `${user.name} ${user.lastName}`, value: user._id };
    });
    const pacientes = await response.filter((user) => user!==undefined)
    return setUserPacientes(pacientes);
  };

  const dateContextValue = {
    dayDates,
    searchDayDates,
    doctors,
    doctor,
    setDoctor,
    patientsDates,
    searchDoctorDates,
    userPacientes,
    findPacientes
  };

  return (
    <DatesContext.Provider value={dateContextValue}>
      {children}
    </DatesContext.Provider>
  );
};
