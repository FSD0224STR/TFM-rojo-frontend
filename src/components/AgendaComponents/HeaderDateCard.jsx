import {
  Avatar,
  Badge,
  Collapse,
  Flex,
  Modal,
  Popconfirm,
  Popover,
  Select,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { DatesContext } from "../../contexts/DatesContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import {
  DeleteOutlined,
  FileDoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { UserInfoCard } from "./UserInfoCard";
import { ActionsDateCard } from "./ActionsDateCard";
const { Option } = Select;

export const HeaderDateCard = ({ userInfo, date, i }) => {
  const { responseRef, minHeightCard, changeStatusDate, deleteDate } =
    useContext(DatesContext);

  useEffect(() => {
    // console.log(userInfo);
    // console.log(date);
    // console.log(i);
  }, []);

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          minHeight: `${minHeightCard}px`,
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 0,
          // marginRight: "1em",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            alignItems: "center",
            gap: "1em",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={showModal}
        >
          <UserInfoCard userInfo={userInfo} i={i} />
        </div>
        <ActionsDateCard date={date} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        ></div>
      </div>
      <Modal
        open={open}
        title={
          <Badge.Ribbon
            style={{ marginRight: "3em" }}
            text={`${date?.state}`}
            color={`${date?.color}`}
          >
            <UserInfoCard userInfo={userInfo} i={i} />
          </Badge.Ribbon>
        }
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",

              gap: "10px",
              fontSize: "20px",
            }}
          >
            <ActionsDateCard date={date} />
          </div>
        }
      >
        <h2>Reason:</h2>
        <p>{date.reason}</p>
      </Modal>
    </>
  );
};
