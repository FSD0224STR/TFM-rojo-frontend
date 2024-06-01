import { createContext, useContext, useState } from "react";
import { AuthContext } from "./authContext";

export const DatesContext = createContext();

// import { dates } from "./Dates";
import dayjs from "dayjs";
import { DatesHours } from "../components/AgendaComponents/DatesHours";
import { createDate, getAllDates } from "../apiService/dateApi";
import { searchUser } from "../apiService/userApi";

export const DatesProvider = ({ children }) => {
  const { data, userData, setSuccess, setError, ResetMessages, navigate } =
    useContext(AuthContext);

  const [dates, setDates] = useState([]);
  const [patientsDates, setPatientsDates] = useState();
  const [doctors, setDoctors] = useState();
  const [doctor, setDoctor] = useState(userData?.role === "admin" ? "all" : "");
  const [doctorId, setDoctorId] = useState();
  const [dayDates, setDayDates] = useState(dates);
  const [enableDayHours, setEnableDayHours] = useState();
  const [enableDayHoursList, setEnableDayHoursList] = useState();
  const [userPatients, setUserPatients] = useState();

  const createNewDate = async (newDate) => {
    ResetMessages();
    const response = await createDate(newDate);
    console.log(response);
    if (response === 200) {
      setSuccess("Successfully created");
      navigate("/userData");
    } else {
      setError("Error creating new date");
    }
  };

  const findAllDoctorsDates = async (idDoctor) => {
    const response = await getAllDates(idDoctor);
    const datesInfo = await response.map((date) => {
      // console.log(date);
      return date;
    });
    // console.log(datesInfo);
    return setDates(datesInfo);
  };

  const searchEnabledHours = (datesAssigned) => {
    let hours = [];
    DatesHours.map((hour) => {
      hours.push({ label: hour, value: hour, enable: true });
    });

    if (datesAssigned.length > 0) {
      datesAssigned.map((date) => {
        hours.map((hour) => {
          if (hour.label >= date.time && hour.label < date.timeFinish) {
            hour.enable = false;
          }
        });
      });
    }

    // console.log(hours);
    return (
      setEnableDayHours(hours),
      setEnableDayHoursList(
        hours
          .map((hour) => {
            if (hour?.enable === true) {
              return { label: hour.label, value: hour.value };
            }
          })
          .filter((hour) => hour !== undefined)
      )
    );
  };

  const searchDoctors = async () => {
    if (userData?.role === "admin") {
      const response = await data.filter((user) => user.roles === "doctor");
      setDoctors(
        response.map((user) => {
          return {
            label: `Dr. ${user.name} ${user.lastName}`,
            value: `${user._id}`,
          };
        })
      );
    } else if (userData?.role === "doctor") {
      setDoctors({
        label: `Dr. ${userData.name}`,
        value: `${userData.id}`,
      });
    }
  };

  const searchDoctorInfo = async (id) => {
    // console.log(id);
    const response = await searchUser(id);
    const doctorInfo = response?.data;
    // const doctorName = `Dr. ${doctorInfo?.name} ${doctorInfo?.lastName}`;
    // console.log(doctorName);
    return doctorInfo;
  };

  const searchUserInfo = async (id) => {
    const response = await searchUser(id);
    const userInfo = response?.data;

    // console.log(userInfo);
    return userInfo;
  };

  const searchDoctorDates = async (doctorSelectedId) => {
    // const doctorName = await searchDoctorName(doctorSelectedId);
    setPatientsDates([]);
    ResetMessages();
    if (doctorSelectedId !== undefined) {
      // findAllDoctorsDates();
      setDoctorId(doctorSelectedId);

      const responseDayDates = dates?.filter((date) => {
        // console.log(date);
        if (date.idDoctor === doctorSelectedId) {
          return date;
        }
      });
      // console.log(responseDayDates);
      return setPatientsDates(responseDayDates);
    }
  };

  const searchDayDates = async (date, idDoctor) => {
    // console.log(dates);
    setDayDates([]);
    const day = date !== "" ? date : dayjs().format("YYYY-MM-DD");
    const response = await dates?.filter((userDate) => {
      if (
        userDate.idDoctor === idDoctor &&
        dayjs(userDate.date).format("YYYY-MM-DD") === day
      ) {
        // console.log(userDate);
        return userDate;
      }
    });
    // console.log(response);

    // setDoctor(response[0]?.doctor);
    return setDayDates(response), searchEnabledHours(response);
  };

  const findPatients = async () => {
    const response = await data.map((user) => {
      if (user.roles === "patient")
        return { label: `${user.name} ${user.lastName}`, value: user._id };
    });
    const patients = await response.filter((user) => user !== undefined);
    return setUserPatients(patients);
  };

  const minHeightCard = 60;

  const lookForPosition = async (date) => {
    const dayListHoursId = document.getElementById("listHours");
    const dayListHoursPos = dayListHoursId?.getBoundingClientRect();

    const startHourId = document.getElementById(`${date?.time}`);
    const startHourPos = startHourId?.getBoundingClientRect();

    const finishHourId = document.getElementById(`${date?.timeFinish}`);
    const finishHourPos = finishHourId?.getBoundingClientRect();

    const topReference = Math.abs(
      dayListHoursPos?.y - (startHourPos?.y + startHourPos?.height / 2)
    );

    // console.log(dayListHoursPos, startHourPos);

    const bottomReference = Math.abs(
      dayListHoursPos?.y - finishHourPos?.y - finishHourPos?.height / 2
    );
    const heightCard = Math.abs(bottomReference - topReference);
    if (!isNaN(topReference) && !isNaN(heightCard)) {
      if (date?.duration === "15") {
        return { topRef: topReference, heightRef: minHeightCard };
      } else if (date?.duration !== "15") {
        return { topRef: topReference, heightRef: heightCard };
      } else {
        return null;
      }
    }
  };

  const dateContextValue = {
    createNewDate,
    searchDoctors,
    setDayDates,
    dayDates,
    searchDayDates,
    doctors,
    doctorId,
    doctor,
    setDoctor,
    patientsDates,
    searchDoctorDates,
    enableDayHours,
    findPatients,
    userPatients,
    enableDayHoursList,
    searchUserInfo,
    searchDoctorInfo,
    findAllDoctorsDates,
    minHeightCard,
    lookForPosition,
  };

  return (
    <DatesContext.Provider value={dateContextValue}>
      {children}
    </DatesContext.Provider>
  );
};
