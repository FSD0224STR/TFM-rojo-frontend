import { Button, Divider, Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DatesContext } from "../../contexts/DatesContext";
import { CreateNewDate } from "../../components/CreateNewDate/CreateNewDate";
import { AuthContext } from "../../contexts/authContext";

export const AgendaDayPointer = (hour) => {
  const { setLoading } = useContext(AuthContext);
  const { minHeightCard, setHourAvailable } = useContext(DatesContext);
  const [openCreateNewDate, setOpenCreateNewDate] = useState(false);

  const onCloseCreateNewDate = () => {
    setOpenCreateNewDate(false);
  };

  return (
    <>
      <Divider
        orientation="left"
        id={hour.hour?.label}
        style={{ height: minHeightCard }}
      >
        {hour?.hour.enable === true ? (
          <Button
            onClick={() => {
              setOpenCreateNewDate(true);
              setHourAvailable(hour);
            }}
          >
            {hour?.hour.label}
          </Button>
        ) : (
          hour?.hour.label
        )}
      </Divider>
      <Drawer
        title="Basic Drawer"
        onClose={onCloseCreateNewDate}
        open={openCreateNewDate}
      >
        <CreateNewDate />
      </Drawer>
    </>
  );
};
