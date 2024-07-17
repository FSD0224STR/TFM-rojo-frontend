import { Button, Divider, Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DatesContext } from "../../contexts/DatesContext";
import { CreateNewDate } from "../../components/CreateNewDate/CreateNewDate";
import { AuthContext } from "../../contexts/authContext";

export const AgendaDayPointer = ({ hour }) => {
  const { setLoading } = useContext(AuthContext);
  const {
    minHeightCard,
    setHourAvailable,
    doctorId,
    setUserSelected,
    hourAvailable,
    dateSelected,
  } = useContext(DatesContext);
  const [openCreateNewDate, setOpenCreateNewDate] = useState(false);

  const onCloseCreateNewDate = () => {
    setOpenCreateNewDate(false);
  };

  return (
    <>
      <Divider
        orientation="left"
        id={hour?.label}
        style={{ height: minHeightCard }}
      >
        {hour?.enable === true ? (
          <Button
            onClick={() => {
              setUserSelected("");
              setOpenCreateNewDate(true);
              setHourAvailable(hour);
            }}
          >
            {hour?.label}
          </Button>
        ) : (
          hour?.label
        )}
      </Divider>
      {doctorId && (
        <Drawer
          title="New Date"
          onClose={onCloseCreateNewDate}
          open={openCreateNewDate}
        >
          <CreateNewDate />
        </Drawer>
      )}
    </>
  );
};
