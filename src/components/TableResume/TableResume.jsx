import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Space, Table, Tag } from "antd";
import { DatesContext } from "../../contexts/DatesContext";
import dayjs from "dayjs";

export const TableResume = ({ searchid, type, datesRange }) => {
  const { userData } = useContext(AuthContext);
  const { dates, findAllDoctorsDates } = useContext(DatesContext);
  const [datesById, setDatesById] = useState();
  const columnDates = [
    {
      title: "Date",
      dataIndex: "date",
      key: "Date",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "TimeFinish",
      dataIndex: "timeFinish",
      key: "timeFinish",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "Reason",
    },
    // {
    //   title: "state",
    //   dataIndex: "state",
    //   key: "state",
    // },
    {
      title: "state",
      key: "state",
      dataIndex: "state",
      render: (_, data) => (
        <Tag color={data.color} key={data.key}>
          {data.state.toUpperCase()}
        </Tag>
      ),
    },
  ];

  const columnBills = [
    {
      title: "Bill",
      dataIndex: "billNumber",
      key: "billNumber",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Treatments",
      dataIndex: "treatments",
      key: "treatments",
    },
    {
      title: "Total",
      dataIndex: "totalBill",
      key: "totalBill",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const findDates = async () => {
    const response = await findAllDoctorsDates();
    if (searchid) {
      setDatesById(response.filter((date) => date.idPatient === searchid));
    } else {
      setDatesById(response);
    }
  };

  useEffect(() => {
    if (type == "dates") {
      findDates();
    } else {
      console.log(type);
    }
  }, []);

  useEffect(() => {
    if (datesRange?.length > 0) {
      // console.log(
      //   "dates pasado por prop",
      //   dayjs(datesRange[0]).format("YYYY-MM-DD"),
      //   dayjs(datesRange[1]).format("YYYY-MM-DD")
      // );
      setDatesById(
        datesById.filter((date) => {
          dayjs(date?.date).format("YYYY-MM-DD") >=
            dayjs(datesRange[0]).format("YYYY-MM-DD");
        })
      );
    }
  }, [datesRange]);

  return (
    <>
      <div style={{ height: "100%" }}>
        <Table
          columns={type === "dates" ? columnDates : columnBills}
          dataSource={datesById}
          pagination={{
            pageSize: 5,
          }}
        />
      </div>
    </>
  );
};
