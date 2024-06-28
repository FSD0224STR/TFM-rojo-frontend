import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Space, Table, Tag } from "antd";
import { DatesContext } from "../../contexts/DatesContext";

export const TableResume = ({ searchid }) => {
  const { userData } = useContext(AuthContext);
  const { dates, findAllDoctorsDates } = useContext(DatesContext);
  const [datesById, setDatesById] = useState();
  const columnDates = [
    {
      title: "Date",
      dataIndex: "date",
      key: "Date",
      render: (text) => <a>{text}</a>,
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
      dataIndex: "Bill",
      key: "Bill",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "billNumber",
      dataIndex: "billNumber",
      key: "billNumber",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "treatments",
      dataIndex: "treatments",
      key: "treatments",
    },
    {
      title: "totalBill",
      dataIndex: "totalBill",
      key: "totalBill",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const findDates = async () => {
    // const searchid = "663bd24c7dfd3e530bff8870";
    const response = await findAllDoctorsDates();
    setDatesById(response.filter((date) => date.idPatient === searchid));
  };

  useEffect(() => {
    findDates();
    console.log(datesById);
  }, []);
  return (
    <>
      <div style={{ height: "100%" }}>
        <Table columns={(columnDates, columnBills)} dataSource={datesById} />
      </div>
    </>
  );
};
