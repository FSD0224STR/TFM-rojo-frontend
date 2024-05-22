import React, { useContext, useEffect } from "react";
import { AgendaComponent } from "../../components/AgendaComponents/AgendaComponent";
import { AgendaList } from "../../components/AgendaComponents/AgendaList";
import { Cascader, Form } from "antd";
import { DatesContext } from "../../contexts/DatesContext";
import { AuthContext } from "../../contexts/authContext";

export const Agenda = () => {
  const { userData } = useContext(AuthContext);
  const { doctors, searchDoctorDates, doctor, setDoctor } =
    useContext(DatesContext);

  useEffect(() => {
    // console.log("Doctor", doctors[0].label);
    if (userData.role === "doctor") {
      const doctorLoaded = userData.name;
      // console.log(doctorLoaded);
      searchDoctorDates(doctorLoaded);
    }
  }, [userData]);
  return (
    <div
      style={{
        width: "80vw",
        height: "100%",
        display: "Flex",
        flexDirection: "column",
        // justifyContent: "end",
        // alignItems: "start",
        // gap: "1em",
        // marginTop: "12em",
        // backgroundColor: "red",
      }}
    >
      <AgendaComponent />
      <Form style={{ marginTop: "1em" }}>
        <Form.Item
          name="doctors"
          label="Doctors"
          // initialValue={{ doctors: "" }}
        >
          <Cascader
            name="doctors"
            options={doctors}
            showSearch={{ doctor }}
            onSearch={(e) => setDoctor(e[0])}
            // value={doctor}
            onChange={(e) => setDoctor(e[0])}
            defaultValue={userData.role == "doctor" ? doctors[0].label : "all"}
            disabled={userData.role == "doctor" ? true : false}
            placeholder="Select a doctor"
            style={{ width: "20vw" }}
          />
        </Form.Item>
      </Form>
      <AgendaList />
    </div>
  );
};
