import React, { useContext, useEffect } from "react";
import { AgendaComponent } from "../../components/AgendaComponents/AgendaComponent";
import { AgendaList } from "../../components/AgendaComponents/AgendaList";
import { Cascader, Form, Select } from "antd";
import { DatesContext } from "../../contexts/DatesContext";
import { AuthContext } from "../../contexts/authContext";
import { AgendaTimeLine } from "../../components/AgendaComponents/AgendaTimeLine";

export const Agenda = () => {
  const { userData } = useContext(AuthContext);
  const { searchDoctors, doctors, searchDoctorDates, doctor, setDoctor } =
    useContext(DatesContext);

  useEffect(() => {
    if (userData?.role === "doctor") {
      const doctorLoaded = `Dr. ${userData.name}`;
      setDoctor(doctorLoaded);
      searchDoctorDates(doctorLoaded);
    } else {
      setDoctor("");
      searchDoctors();
    }
  }, [userData]);

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
          <Form.Item
            name="doctors"
            label="Doctors"
            // initialValue={{ doctors: doctors[0].initialValue }}
          >
            <Select
              name="doctors"
              options={doctors}
              showSearch={{ doctor }}
              onSearch={(e) => {
                setDoctor(e);
                searchDoctorDates(e);
              }}
              onChange={(e) => {
                setDoctor(e);
                searchDoctorDates(e);
              }}
              // defaultValue={doctors[0]?.value}
              disabled={userData?.role == "doctor" ? true : false}
              placeholder="Select a doctor"
              style={{ width: "20vw" }}
            />
          </Form.Item>
        </Form>
      )}
      {/* <AgendaList /> */}
      <AgendaTimeLine />
    </div>
  );
};
