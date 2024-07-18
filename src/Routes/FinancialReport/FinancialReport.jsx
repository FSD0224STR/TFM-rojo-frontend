import React, { useState } from "react";
import { TableResume } from "../../components/TableResume/TableResume";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
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

  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];

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
        <RangePicker
          presets={[
            {
              label: (
                <span aria-label="Current Time to End of Day">Now ~ EOD</span>
              ),
              value: () => [dayjs(), dayjs().endOf("day")], // 5.8.0+ support function
            },
            ...rangePresets,
          ]}
          onChange={onRangeChange}
          allowClear
        />
        <TableResume type="bill" datesRange={dateRange}></TableResume>
      </div>
    </>
  );
};
