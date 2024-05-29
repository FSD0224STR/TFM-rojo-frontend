import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  List,
  Popconfirm,
  Popover,
  Select,
} from "antd";
import { DatesContext } from "../../contexts/DatesContext";
import { DatesHours } from "./DatesHours";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { DeleteOutlined, FileDoneOutlined } from "@ant-design/icons";
const { Option } = Select;

export const AgendaList = () => {
  const { dayDates, doctor, searchDayDates } = useContext(DatesContext);
  useEffect(() => {
    // console.log("dayjs", dayjs().format("YYYY-MM-DD"));
    searchDayDates(dayjs().format("YYYY-MM-DD"), "all");
  }, []);

  return (
    <div>
      <div
        style={{
          width: "80vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Selected Date: {dayDates[0]?.date}</h1>
        <h1>Doctor: {doctor}</h1>
      </div>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={dayDates}
        renderItem={(item, i) =>
          item.user !== undefined ? (
            <List.Item
              style={{
                display: "Flex",
                flexDirection: "column",
              }}
            >
              <Divider orientation="left">Hour: {item.time}</Divider>
              <Badge.Ribbon
                text={item.state}
                status={item.state}
                color={item.color}
              >
                <Card
                  title={
                    <>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`}
                          style={{ marginRight: "1em" }}
                        />
                        <p>
                          user: {item.user} Phone: <Link>{item.phone}</Link>
                        </p>
                      </div>
                    </>
                  }
                  extra={
                    <>
                      <div
                        style={{
                          marginRight: "3.5em",
                          display: "flex",
                          gap: "1em",
                          fontSize: "1.2em",
                          // backgroundColor: "red",
                          // height: "3em",
                        }}
                      >
                        <Popover
                          content="Create new bill"
                          trigger="hover"
                          placement="bottom"
                        >
                          <Link>
                            <FileDoneOutlined />
                          </Link>
                        </Popover>
                        <Popconfirm
                          title="Delete the date"
                          description="Are you sure to delete this date?"
                          // onConfirm={confirm}
                          // onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Popover
                            content="Delete date"
                            trigger="hover"
                            placement="bottom"
                          >
                            <Link>
                              <DeleteOutlined />
                            </Link>
                          </Popover>
                        </Popconfirm>
                      </div>
                    </>
                  }
                  style={{ width: "80vw" }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>{item.reason}</div>
                    <Select
                      size="large"
                      defaultValue={item.state}
                      style={{ width: "20%" }}
                    >
                      <Option value="confirmed">Confirmed</Option>
                      <Option value="pending">Pending</Option>
                      <Option value="canceled">Canceled</Option>
                    </Select>
                  </div>
                </Card>
              </Badge.Ribbon>
            </List.Item>
          ) : (
            <Divider orientation="left">
              <Link onClick={() => console.log(item.time, item.date, doctor)}>
                Hour: {item.time}
              </Link>
            </Divider>
          )
        }
      />
    </div>
  );
};
