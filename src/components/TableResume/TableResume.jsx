import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Space, Table, Tag } from "antd";
import { DatesContext } from "../../contexts/DatesContext";
import { BillContext } from "../../contexts/BillsContext";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export const TableResume = ({ searchid, type, datesRange }) => {
  const { userData } = useContext(AuthContext);
  const { dates, findAllDoctorsDates } = useContext(DatesContext);
  const { GetBills } = useContext(BillContext);
  const [datesById, setDatesById] = useState();
  const [billsById, setBillsById] = useState();
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
      title: "Total",
      dataIndex: "totalSum",
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
    if (response.length > 0) {
      var datesArray;
      if (searchid) {
        datesArray = response.filter((date) => date.idPatient === searchid);
      } else {
        datesArray = response;
      }
      if (datesRange?.length > 0) {
        return setDatesById(
          datesArray.filter((date) =>
            dayjs(date?.date).isBetween(datesRange[0], datesRange[1])
          )
        );
      }
      return setDatesById(datesArray);
    }
  };

  const findBills = async () => {
    const response = await GetBills();
    console.log(response);
    if (response.length > 0) {
      var billsArray;
      if (searchid) {
        billsArray = response.filter((bill) => bill?.Patient === searchid);
      } else {
        billsArray = response;
      }
      if (datesRange?.length > 0) {
        return setBillsById(
          billsArray.filter((bill) =>
            dayjs(bill?.bill).isBetween(datesRange[0], datesRange[1])
          )
        );
      }
      return setBillsById(billsArray);
    }
  };

  useEffect(() => {
    if (type == "dates") {
      findDates();
    } else {
      findBills();
    }
  }, []);

  useEffect(() => {
    findDates();
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
          dataSource={type === "dates" ? datesById : billsById}
          // dataSource={datesById}
          pagination={{
            pageSize: 5,
          }}
        />
      </div>
    </>
  );
};
