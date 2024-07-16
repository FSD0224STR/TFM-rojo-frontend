import React, { useState } from "react";
import { TableResume } from "../../components/TableResume/TableResume";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

export const TableTest = () => {
  const [userId, setuserId] = useState("");
  const [dateRange, setDateRange] = useState([]);

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      // console.log("From: ", dates[0], ", to: ", dates[1]);
      setDateRange(dates);
      // console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      setDateRange([]);
      // console.log("Clear");
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <RangePicker onChange={onRangeChange} />
      <TableResume
        searchid={userId}
        type="dates"
        datesRange={dateRange}
      ></TableResume>
      <TableResume searchid={userId} type="bill"></TableResume>
    </div>
  );
};
