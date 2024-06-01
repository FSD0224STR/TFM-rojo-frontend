import {
  Avatar,
  Badge,
  Card,
  Collapse,
  ConfigProvider,
  Divider,
  Popconfirm,
  Popover,
  Radio,
  Select,
  Slider,
  Timeline,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { DatesHours } from "./DatesHours";
import { dates } from "../../contexts/Dates";
import { Await, Link } from "react-router-dom";
import { calc } from "antd/es/theme/internal";
import { DatesContext } from "../../contexts/DatesContext";
import {
  DeleteOutlined,
  FileDoneOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { DateCard } from "./DateCard";

export const AgendaTimeLine = () => {
  <ConfigProvider
    theme={{
      components: {
        Card: {
          headerBg: "blue",
        },
      },
    }}
  />;

  const {
    dayDates,
    doctor,
    enableDayHours,
    searchUserInfo,
    minHeightCard,
    lookForPosition,
  } = useContext(DatesContext);

  useEffect(() => {
    lookForPosition();
  }, []);

  return (
    <>
      <div
        id="listHours"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1em",
        }}
      >
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 2em",
            position: "sticky",
            top: "0px",
            borderRadius: "2em",
            backgroundColor: "white",
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            zIndex: "3",
          }}
        >
          <h2>{doctor ? doctor : "No doctor selected"}</h2>
          <h2>
            {dayDates
              ? dayjs(dayDates[0]?.date).format("YYYY-MM-DD")
              : "No date selected"}
          </h2>
        </div>
        {enableDayHours?.map((hour, i) => (
          <Divider
            orientation="left"
            key={i}
            id={hour?.label}
            style={{ height: minHeightCard }}
          >
            {hour?.enable === true ? <Link>{hour?.label}</Link> : hour?.label}
          </Divider>
        ))}
        {dayDates.map((date, i) => {
          return <DateCard date={date} i={i} key={i} />;
        })}
      </div>
    </>
  );
};
