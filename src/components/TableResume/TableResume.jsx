import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DatesContext } from "../../contexts/DatesContext";
import { BillContext } from "../../contexts/BillsContext";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Link } from "react-router-dom";
dayjs.extend(isBetween);

export const TableResume = ({ searchid, type, fullData, datesRange }) => {
  const [update, setUpdate] = useState(true);
  const {
    userData,
    searchUserInfoTable,
    GetUsers,
    data,
    navigate,
    setError,
    setLoading,
  } = useContext(AuthContext);
  const { dates, findAllDoctorsDates } = useContext(DatesContext);
  const { GetBills, searchBillInfo, searchedBill, deleteBill } =
    useContext(BillContext);
  const [datesById, setDatesById] = useState();
  const [billsById, setBillsById] = useState();

  const find_dates = (text) => {
    const day = dayjs(text).format("YYYY-MM-DD");
    return day;
  };

  const columnDates = [
    {
      title: "Date",
      dataIndex: "date",
      key: "Date",
      render: (text) => find_dates(text),
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
    {
      title: "Delete",
      dataIndex: "",
      key: "delete",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => console.log(record._id)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        );
      },
      hidden: type !== "dates" ? true : false,
    },
  ];

  const columnBills = [
    {
      title: "Bill",
      dataIndex: "billNumber",
      key: "billNumber",
    },
    {
      title: "Patient",
      dataIndex: "Patient",
      key: "idPatient",
      hidden: false,
      render: (_, record) => {
        return record?.Patient?.name + " " + record?.Patient?.lastName;
      },
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
    // {
    //   title: "state",
    //   key: "state",
    //   dataIndex: "state",
    //   render: (_, data) => (
    //     <Tag color={data.color} key={data.key}>
    //       {data.state}
    //     </Tag>
    //   ),
    // },
    {
      title: "Delete",
      dataIndex: "",
      key: "delete",
      render: (_, record) => {
        return (
          record.status !== "paid" && (
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => {
                deleteBill(record);
                findBills();
              }}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          )
        );
      },
    },
    {
      title: "Edit",
      dataIndex: "",
      key: "Edit",
      render: (_, record) => {
        return (
          record.status !== "paid" && (
            <Button type="link" onClick={() => findBillToEdit(record)}>
              <EditOutlined />
            </Button>
          )
        );
      },
    },
  ];

  const findBillToEdit = async (record) => {
    console.log(record._id);
    const response =
      record.status !== "paid" && (await searchBillInfo(record._id));

    console.log(response);
    !response && setError("Couldn't find");
    response && navigate("/UpdateBills");
  };

  const findDates = async () => {
    const response = await findAllDoctorsDates();
    if (response.length > 0) {
      var datesArray;
      if (searchid) {
        datesArray = response.filter(
          (date) => date?.idPatient?._id === searchid
        );
      } else {
        datesArray = response;
      }
      // if (datesRange?.length > 0) {
      //   return setDatesById(
      //     datesArray.filter((date) =>
      //       dayjs(date?.date).isBetween(datesRange[0], datesRange[1])
      //     )
      //   );
      // }
      // return setDatesById(datesArray);
    }
  };

  const findBills = async () => {
    const response = await GetBills();
    // console.log(response);
    const billsArrayNoRemoved = response.filter(
      (bill) => bill.status !== "removed"
    );

    if (billsArrayNoRemoved.length > 0) {
      var billsArray;
      // console.log(searchid);

      if (searchid) {
        billsArray = billsArrayNoRemoved.filter((bill) => {
          if (bill?.Patient?._id === searchid) {
            return bill;
          }
        });
        // console.log("billsArray", billsArray);
        setBillsById(billsArray);
      } else {
        // console.log(billsArrayNoRemoved);
        setBillsById(billsArrayNoRemoved);
      }

      return billsArray;
    }
  };

  // const billFilterRange = () => {

  // useEffect(() => {
  //   console.log(datesRange);
  //   if (datesRange?.length > 0) {
  //     return setBillsById(
  //       billsById.filter((bill) =>
  //         dayjs(bill?.bill).isBetween(datesRange[0], datesRange[1])
  //       )
  //     );
  //   }
  // }, [datesRange]);

  useEffect(() => {
    if (type == "dates") {
      findDates();
    } else {
      findBills();
    }
  }, []);

  const findBillsByRange = async () => {
    setLoading(true);
    const bills = await GetBills();
    // alert("Bills");
    console.log(bills);
    if (datesRange?.length > 0) {
      const response = bills?.filter((bill) =>
        dayjs(bill?.date).isBetween(dayjs(datesRange[0]), dayjs(datesRange[1]))
      );
      console.log(response);
      setBillsById(response);
    }
    setLoading(false);
  };

  useEffect(() => {
    // findDates();
    findBillsByRange();
  }, [datesRange]);

  return (
    <>
      <div style={{ height: "100%" }}>
        <Table
          columns={type === "dates" ? columnDates : columnBills}
          dataSource={type === "dates" ? datesById : billsById}
          pagination={{
            pageSize: 5,
            responsive: false,
          }}
          responsive={false}
          size="large"
        />
      </div>
    </>
  );
};
