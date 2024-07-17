import React, { useState } from "react";
import { TableResume } from "../../components/TableResume/TableResume";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

export const FinancialReport = () => {
  const [userId, setuserId] = useState("");
  const [dateRange, setDateRange] = useState([]);

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      setDateRange(dates);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      setDateRange([]);
      // console.log("Clear");
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        }}
      >
        <h1>Financial Report</h1>
        <RangePicker onChange={onRangeChange} allowClear />
        <TableResume type="bill" datesRange={dateRange}></TableResume>
      </div>
    </>
  );
};
