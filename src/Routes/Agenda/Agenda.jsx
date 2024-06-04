import React, { useContext, useEffect } from "react";
import { AgendaComponent } from "../../components/AgendaComponents/AgendaComponent";
import { Button, Cascader, Form, Select } from "antd";
import { DatesContext } from "../../contexts/DatesContext";
import { AuthContext } from "../../contexts/authContext";
import { AgendaTimeLine } from "../../components/AgendaComponents/AgendaTimeLine";
import { AgendaDayPointer } from "../../components/AgendaComponents/AgendaDayPointer";

export const Agenda = () => {
  const { userData } = useContext(AuthContext);
  const {
    searchDoctors,
    doctors,
    searchDoctorInfo,
    searchDoctorDates,
    doctor,
    setDoctor,
    setDayDates,
    findAllDoctorsDates,
    enableDayHours,
    dates,
    reloadAgenda,
    patientsDates,
    dayDates,
  } = useContext(DatesContext);

  useEffect(() => {
    if (userData?.role === "doctor") {
      const doctorLoaded = `Dr. ${userData.name}`;
      setDoctor(doctorLoaded);
      searchDoctorDates(doctorLoaded);
    }
    // findAllDoctorsDates();

    // console.log("dates agenda ");
    // console.log(dates);
    // console.log("patients dates");
    // console.log(patientsDates);
  }, [dates]);

  return (
    <div
      style={{
        width: "80vw",
        height: "100%",
        display: "Flex",
        flexDirection: "column",
      }}
    >
      <AgendaComponent />
      {userData?.role === "admin" && (
        <Form style={{ marginTop: "1em" }}>
          <Form.Item name="doctors" label="Doctors">
            <Select
              name="doctors"
              options={doctors}
              showSearch={{ doctor }}
              onSearch={async (e) => {
                const doctorInfo = await searchDoctorInfo(e);
                const doctorName = `Dr. ${doctorInfo.name}`;
                await reloadAgenda();
                setDoctor(doctorName);
                searchDoctorDates(e);
              }}
              onChange={async (e) => {
                const doctorInfo = await searchDoctorInfo(e);
                const doctorName = `Dr. ${doctorInfo.name}`;
                await reloadAgenda();
                setDoctor(doctorName);
                searchDoctorDates(e);
              }}
              disabled={userData?.role == "doctor" ? true : false}
              placeholder="Select a doctor"
              style={{ width: "20vw" }}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={() => reloadAgenda()}>Reload</Button>
          </Form.Item>
        </Form>
      )}

      <AgendaTimeLine />
    </div>
  );
};
