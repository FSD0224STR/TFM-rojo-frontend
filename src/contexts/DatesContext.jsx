import { createContext, useContext, useState } from "react";
import { AuthContext } from "./authContext";

export const DatesContext = createContext();

// import { dates } from "./Dates";
import dayjs from "dayjs";
import { DatesHours } from "../components/AgendaComponents/DatesHours";
import {
  deleteDateApi,
  createDate,
  getAllDates,
  changeStatusDateApi,
} from "../apiService/dateApi";
import { searchUser } from "../apiService/userApi";

export const DatesProvider = ({ children }) => {
  const {
    data,
    userData,
    setSuccess,
    setError,
    ResetMessages,
    navigate,
    setLoading,
  } = useContext(AuthContext);

  const [dates, setDates] = useState();
  const [patientsDates, setPatientsDates] = useState();
  const [doctors, setDoctors] = useState();
  const [userSelected, setUserSelected] = useState();
  const [doctor, setDoctor] = useState(userData?.role === "admin" ? "all" : "");
  const [doctorId, setDoctorId] = useState();
  const [dateSelected, setDateSelected] = useState();
  const [day, setDay] = useState();
  const [dayDates, setDayDates] = useState(dates);
  const [enableDayHours, setEnableDayHours] = useState();
  const [enableDayHoursList, setEnableDayHoursList] = useState();
  const [userPatients, setUserPatients] = useState();
  const [hourAvailable, setHourAvailable] = useState();
  const [durationDate, setDurationDate] = useState([]);

  const createNewDate = async (newDate) => {
    ResetMessages();
    setLoading(true);
    const response = await createDate(newDate);
    // console.log(response);
    if (response === 200) {
      setSuccess("Successfully created");
      // console.log(doctorId);
      setLoading(true);
      findAllDoctorsDates(doctorId);
      setTimeout(() => {
        reloadAgenda(doctorId);
      }, 1000);
      // navigate("/agenda");
    } else {
      setError("Error creating new date");
    }
    setLoading(false);
  };

  const findAllDoctorsDates = async (idDoctor) => {
    const response = await getAllDates(idDoctor);
    // console.log(response);
    const datesInfo = await response
      ?.map((date) => {
        // console.log(date);
        return date;
      })
      .sort((a, b) => {
        if (a.time > b.time) {
          return 1;
        } else if (b.time > a.time) {
          return -1;
        } else {
          return 0;
        }
      });
    // console.log(datesInfo);
    setDates(datesInfo);
    return datesInfo;
  };

  const searchEnabledHours = (datesAssigned, date) => {
    // console.log(date);
    let hours = [];
    DatesHours.map((hour) => {
      if (date < dayjs().format("YYYY-MM-DD")) {
        hours.push({ label: hour, value: hour, enable: false });
      } else {
        hours.push({ label: hour, value: hour, enable: true });
      }
    });
    // console.log(hours);

    if (datesAssigned?.length > 0) {
      datesAssigned?.map((date) => {
        hours.map((hour) => {
          if (
            (hour.label >= date.time && hour.label < date.timeFinish) ||
            hour.label === hours[hours.length - 1].label
          ) {
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

  const searchDurationDates = (value) => {
    // console.log(value);
    // console.log(enableDayHours);
    let durationEnable = [];
    var counting = true;
    var durationAdd = 0;
    var maxDuration = 75;
    enableDayHours.map((hour) => {
      if (hour.label >= value && hour.enable === true && counting === true) {
        durationAdd = durationAdd + 15;
        if (durationAdd <= maxDuration)
          return durationEnable.push({
            label: `${durationAdd} min`,
            value: durationAdd,
          });
      } else if (hour.label > value && hour.enable === false) {
        counting = false;
      }
    });
    // console.log(durationEnable);
    return setDurationDate(durationEnable);
  };

  const searchDoctors = async () => {
    if (userData?.role === "admin") {
      const response = await data.filter((user) => user.roles === "doctor");
      setDoctors(
        response.map((user) => {
          return {
            label: `Dr. ${user?.name} ${user.lastName}`,
            value: `${user._id}`,
          };
        })
      );
    } else if (userData?.role === "doctor") {
      setDoctors({
        label: `Dr. ${userData?.name}`,
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
    ResetMessages();
    if (doctorSelectedId !== undefined) {
      const response = await findAllDoctorsDates(doctorId);
      console.log(doctorSelectedId);
      // const response = await getAllDates(doctorSelectedId);
      const responseDayDates = await response?.filter((date) => {
        if (date?.idDoctor?._id === doctorSelectedId) {
          return date;
        }
      });
      console.log("responseDayDates", responseDayDates);
      setDoctorId(doctorSelectedId);
      setPatientsDates(responseDayDates);
      return responseDayDates;
    }
  };

  const searchDayDates = async (date, idDoctor, dates) => {
    const daySelect = date !== undefined ? date : dayjs().format("YYYY-MM-DD");
    setDayDates([]);
    // console.log("datesinfo", dates[0].idDoctor._id);
    const response = await dates?.filter((date) => {
      // console.log("doctor id date", date?.idDoctor?._id);
      if (
        date?.idDoctor?._id === idDoctor &&
        dayjs(date.date).format("YYYY-MM-DD") === daySelect
      )
        return date;
    });
    // console.log("datesinfoResponse", response);
    dayDates !== undefined &&
      (setDayDates(response), searchEnabledHours(response, date));
    return response;
  };

  const findPatients = async () => {
    const response = await data.map((user) => {
      if (user.roles === "patient")
        return { label: `${user?.name} ${user?.lastName}`, value: user._id };
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

    const finishHourId = document.getElementById(
      date?.timeFinish <= "17:00" ? `${date?.timeFinish}` : "17:00"
    );
    const finishHourPos = finishHourId?.getBoundingClientRect();

    const topReference = Math.abs(
      dayListHoursPos?.y - (startHourPos?.y + startHourPos?.height / 2)
    );

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

  const deleteDate = async (id) => {
    setLoading(true);
    ResetMessages();
    const response = await deleteDateApi(id);
    if (response === 200) {
      setSuccess("Successfully deleted");
      setLoading(true);
      setTimeout(() => {
        reloadAgenda(doctorId);
      }, 1000);
    } else {
      setError("Error deleting date");
    }
    setLoading(false);
  };

  const reloadAgenda = async (id) => {
    // setLoading(true);
    // setDayDates([]);
    // setPatientsDates([]);
    // console.log("doctor id" + doctorId);
    // console.log("reloadAgenda");
    // console.log(id);
    const datesInfo = await searchDoctorDates(id);
    // console.log(datesInfo);
    console.log("day", dayDates);
    await searchDayDates(day, id, datesInfo);
    setLoading(false);
  };

  const stateColorSelected = (stateSelected) => {
    var color = "";
    switch (stateSelected) {
      case "confirmed":
        color = "#cad5ad";

        break;
      case "cancelled":
        color = "#e77a77";

        break;
      case "pending":
        color = "#f6a570";

        break;
      default:
        color = "#f6a570";
        break;
    }

    return color;
  };

  const changeStatusDate = async (idDate, newStatus) => {
    setLoading(true);
    const color = await stateColorSelected(newStatus);
    // console.log(idDate, newStatus);
    const response = await changeStatusDateApi(idDate, newStatus, color);
    if (response === 200) {
      setSuccess("Successfully changed");
      setLoading(true);
      setTimeout(() => {
        reloadAgenda(doctorId);
        // setLoading(false);
      }, 1000);
    } else {
      setError("Error changing status");
    }
  };

  const dateContextValue = {
    dates,
    createNewDate,
    searchDoctors,
    setDayDates,
    dayDates,
    searchDayDates,
    doctors,
    setDoctorId,
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
    hourAvailable,
    setHourAvailable,
    deleteDate,
    reloadAgenda,
    dateSelected,
    setDateSelected,
    stateColorSelected,
    changeStatusDate,
    setDay,
    userSelected,
    setUserSelected,
    searchDurationDates,
    durationDate,
  };

  return (
    <DatesContext.Provider value={dateContextValue}>
      {children}
    </DatesContext.Provider>
  );
};
