import { ConfigProvider, Divider } from "antd";
import { useContext, useEffect } from "react";

import { Link } from "react-router-dom";

import { DatesContext } from "../../contexts/DatesContext";
import dayjs from "dayjs";
import { DateCard } from "./DateCard";
import { AgendaDayPointer } from "./AgendaDayPointer";

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

  const { dayDates, doctor, enableDayHours, dates } = useContext(DatesContext);

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
        {enableDayHours?.map((hour, i) => {
          return <AgendaDayPointer hour={hour} key={i} />;
        })}
        {dayDates?.map((date, i) => {
          return <DateCard date={date} i={i} key={i} />;
        })}
      </div>
    </>
  );
};
