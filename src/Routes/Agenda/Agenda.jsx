import React, { useContext, useEffect } from "react";
import { AgendaComponent } from "../../components/AgendaComponents/AgendaComponent";
import { Button, Cascader, Form, Select } from "antd";
import { DatesContext } from "../../contexts/DatesContext";
import { AuthContext } from "../../contexts/authContext";
import { AgendaTimeLine } from "../../components/AgendaComponents/AgendaTimeLine";
import { AgendaDayPointer } from "../../components/AgendaComponents/AgendaDayPointer";

export const Agenda = () => {
  const { userData, setLoading } = useContext(AuthContext);
  const {
    searchDoctors,
    doctors,
    searchDoctorInfo,
    searchDoctorDates,
    doctor,
    setDoctor,
    setDoctorId,
    setDayDates,
    findAllDoctorsDates,
    enableDayHours,
    dates,
    reloadAgenda,
    patientsDates,
    dayDates,
    doctorId,
  } = useContext(DatesContext);

  const findAllDates = async (value) => {
    setLoading(true);
    console.log(value);
    // await searchDoctorDates(value.doctor);
    await reloadAgenda(value);
    setLoading(false);
  };

  useEffect(() => {
    if (userData?.role === "doctor") {
      findAllDates();
    }
    // findAllDoctorsDates();

    // console.log("dates agenda ");
    // console.log(dates);
    // console.log("patients dates");
    // console.log(patientsDates);
  }, [dates]);

  const doctorFunc = async (value) => {
    setLoading(true);
    // console.log(value.doctor);
    const doctorInfo = await searchDoctorInfo(value.doctor);
    const doctorName = `Dr. ${doctorInfo.name}`;
    setDoctorId(value.doctor);
    setDoctor(doctorName);
    findAllDates(value.doctor);

    // setLoading(false);
  };

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
      {userData?.role !== "patient" && (
        <Form
          style={{ marginTop: "1em" }}
          onValuesChange={(e) => doctorFunc(e)}
        >
          <Form.Item name="doctor" label="Doctors">
            <Select
              name="doctors"
              options={doctors}
              showSearch={{ doctor }}
              defaultValue={doctorId}
              onSearch={async (e) => {
                doctorFunc(e);
              }}
              // disabled={userData?.role == "doctor" ? true : false}
              placeholder="Select a doctor"
              style={{ width: "20vw" }}
            />
          </Form.Item>
        </Form>
      )}

      <AgendaTimeLine />
    </div>
  );
};
