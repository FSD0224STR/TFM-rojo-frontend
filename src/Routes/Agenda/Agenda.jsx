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
    setDoctorId,
    setDayDates,
    findAllDoctorsDates,
    enableDayHours,
    dates,
    reloadAgenda,
    patientsDates,
    dayDates,
    doctorId,
    setLoading,
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

  const doctorFunc = async (id) => {
    // setLoading(true);
    const doctorInfo = await searchDoctorInfo(id);
    const doctorName = `Dr. ${doctorInfo.name}`;
    setDoctorId(id);
    await reloadAgenda();
    setDoctor(doctorName);
    await searchDoctorDates(id);

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
      {userData?.role === "admin" && (
        <Form style={{ marginTop: "1em" }}>
          <Form.Item name="doctors" label="Doctors">
            <Select
              name="doctors"
              options={doctors}
              showSearch={{ doctor }}
              defaultValue={doctorId}
              onSearch={async (e) => {
                doctorFunc(e);
              }}
              onChange={async (e) => {
                doctorFunc(e);
              }}
              disabled={userData?.role == "doctor" ? true : false}
              placeholder="Select a doctor"
              style={{ width: "20vw" }}
            />
          </Form.Item>
          {/* <Form.Item>
            <Button onClick={() => reloadAgenda()}>Reload</Button>
          </Form.Item> */}
        </Form>
      )}

      <AgendaTimeLine />
    </div>
  );
};
