import {
  Avatar,
  Badge,
  Button,
  Card,
  Collapse,
  ConfigProvider,
  Modal,
  Popconfirm,
  Popover,
  Select,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { DatesContext } from "../../contexts/DatesContext";
import { Form, Link } from "react-router-dom";
import { DeleteOutlined, FileDoneOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { HeaderDateCard } from "./HeaderDateCard";
import { AuthContext } from "../../contexts/authContext";
const { Option } = Select;

export const DateCard = ({ date, i }) => {
  const { setLoading, loading } = useContext(AuthContext);

  const {
    searchUserInfo,
    minHeightCard,
    lookForPosition,
    deleteDate,
    changeStatusDate,
  } = useContext(DatesContext);

  const [userInfo, setUserInfo] = useState();
  const [responseRef, setResponseRef] = useState();

  const findPosition = async () => {
    const response = await lookForPosition(date);
    setResponseRef(response);
  };

  const findInfo = async () => {
    // const user = await searchUserInfo(date?.idPatient);
    // setUserInfo(user);
  };

  useEffect(() => {
    findInfo();
    findPosition();
    // console.log(date.date._id);
  }, []);

  const headerHeight = 85;

  return (
    <>
      {responseRef?.heightRef > minHeightCard ? (
        <div
          style={{
            position: "absolute",
            width: "60vw",
            top: `${responseRef?.topRef}px`,
            right: "2em",
            height: `${responseRef?.heightRef}px`,
          }}
        >
          <ConfigProvider
            theme={{
              components: {
                Card: {
                  headerBg: `${date?.color}`,
                  headerHeight: headerHeight,
                },
              },
            }}
          >
            <Card
              headerHeight={minHeightCard}
              style={{
                height: "98%",
                border: "1px solid #b3aca4",
              }}
              title={
                <HeaderDateCard date={date} userInfo={date?.idPatient} i={i} />
              }
              headerBg="red"
            >
              {date?.reason}
            </Card>
          </ConfigProvider>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            width: "60vw",
            top: `${responseRef?.topRef}px`,
            right: "2em",
            height: `${headerHeight}px`,
            backgroundColor: `${date?.color}`,
            padding: "0.5em 2em",
            borderRadius: "0.5em",
            border: "1px solid #b3aca4",
            // cursor: "pointer",
          }}
          // onClick={showModal}
        >
          <HeaderDateCard
            date={date}
            userInfo={date?.idPatient}
            // showModal={showModal}
            i={i}
          />
        </div>
      )}
    </>
  );
};
