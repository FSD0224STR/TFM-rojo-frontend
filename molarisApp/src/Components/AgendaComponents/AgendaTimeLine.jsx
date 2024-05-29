import {
  Avatar,
  Badge,
  Card,
  Collapse,
  ConfigProvider,
  Divider,
  Popconfirm,
  Popover,
  Radio,
  Select,
  Slider,
  Timeline,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { DatesHours } from "./DatesHours";
import { dates } from "../../contexts/Dates";
import { Link } from "react-router-dom";
import { calc } from "antd/es/theme/internal";
import { DatesContext } from "../../contexts/DatesContext";
import { DeleteOutlined, FileDoneOutlined } from "@ant-design/icons";
const { Option } = Select;

export const AgendaTimeLine = () => {
  <ConfigProvider
    theme={{
      components: {
        Card: {
          headerBg: "blue",
        },
      },
    }}
  />;

  const { dayDates, doctor, enableDayHours } = useContext(DatesContext);

  const minHeightCard = 60;

  const lookForPosition = (date) => {
    const dayListHoursId = document.getElementById("listHours");
    const dayListHoursPos = dayListHoursId?.getBoundingClientRect();

    const startHourId = document.getElementById(`${date?.time}`);
    const startHourPos = startHourId?.getBoundingClientRect();

    const finishHourId = document.getElementById(`${date?.timeFinish}`);
    const finishHourPos = finishHourId?.getBoundingClientRect();

    const topReference = Math.abs(
      dayListHoursPos?.y - (startHourPos?.y + startHourPos?.height / 2)
    );
    const bottomReference = Math.abs(
      dayListHoursPos?.y - (finishHourPos?.y + finishHourPos?.height / 2)
    );
    const heightCard = Math.abs(bottomReference - topReference);

    if (isNaN(heightCard)) {
      return { topRef: topReference, heightRef: minHeightCard };
    } else {
      return { topRef: topReference, heightRef: heightCard };
    }
  };

  return (
    <>
      <div
        id="listHours"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1em",
        }}
      >
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 2em",
            position: "sticky",
            top: "0px",
            borderRadius: "2em",
            backgroundColor: "white",
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            zIndex: "3",
          }}
        >
          <h2>{doctor ? doctor : "No doctor selected"}</h2>
          <h2>{dayDates ? dayDates[0]?.date : "No date selected"}</h2>
        </div>
        {enableDayHours?.map((hour, i) => (
          <Divider
            orientation="left"
            key={i}
            id={hour.label}
            style={{ height: minHeightCard }}
          >
            {hour.enable === true ? <Link>{hour.label}</Link> : hour.label}
          </Divider>
        ))}
        {dayDates?.map((date, i) => {
          const responseRef = lookForPosition(date);
          // console.log(date);
          return (
            <>
              <ConfigProvider
                theme={{
                  components: {
                    Card: {
                      headerBg: `${date.color}`,
                      headerHeight: { minHeightCard },
                    },
                    Collapse: {
                      headerBg: `${date.color}`,
                    },
                  },
                }}
              >
                {responseRef.heightRef > minHeightCard ? (
                  <div
                    style={{
                      position: "absolute",
                      width: "60vw",
                      // top: 0,
                      top: `${responseRef.topRef}px`,
                      right: "2em",
                      height: `${responseRef.heightRef}px`,
                    }}
                    key={i}
                  >
                    <Card
                      headerBg="red"
                      headerHeight={minHeightCard}
                      style={{ height: "100%" }}
                      title={
                        <>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Avatar
                              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`}
                              style={{ marginRight: "1em" }}
                            />
                            <p>
                              user: {date.user} Phone: <Link>{date.phone}</Link>
                            </p>
                          </div>
                        </>
                      }
                      extra={
                        <>
                          <div
                            style={{
                              // marginRight: "3.5em",
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
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>{date.reason}</div>
                        <Select
                          size="large"
                          defaultValue={date.state}
                          style={{ width: "20%" }}
                        >
                          <Option value="confirmed">Confirmed</Option>
                          <Option value="pending">Pending</Option>
                          <Option value="canceled">Canceled</Option>
                        </Select>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      width: "60vw",
                      // top: 0,
                      top: `${responseRef.topRef}px`,
                      right: "2em",
                      minHeight: `${minHeightCard}`,
                      height: `${minHeightCard}`,
                    }}
                  >
                    <Collapse style={{ height: "100%" }}>
                      <Collapse.Panel
                        style={{
                          height: "100%",
                          // backgroundColor: `${date.color}`,
                        }}
                        header={
                          <>
                            <div
                              style={{
                                display: "flex",
                                height: `${minHeightCard}px`,
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 0,
                              }}
                            >
                              <div style={{ display: "flex" }}>
                                <Avatar
                                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`}
                                  style={{ marginRight: "1em" }}
                                />
                                <p>
                                  user: {date.user} Phone:{" "}
                                  <Link>{date.phone}</Link>
                                </p>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "1em",
                                }}
                              >
                                <Select
                                  size="large"
                                  defaultValue={date.state}
                                  style={{ width: "150px" }}
                                >
                                  <Option value="confirmed">Confirmed</Option>
                                  <Option value="pending">Pending</Option>
                                  <Option value="canceled">Canceled</Option>
                                </Select>
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "1em",
                                    fontSize: "1.2em",
                                    // backgroundColor: "red",
                                    // height: `${minHeightCard}`,
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
                              </div>
                            </div>
                          </>
                        }
                      >
                        {date.reason}
                      </Collapse.Panel>
                    </Collapse>
                  </div>
                )}
              </ConfigProvider>
            </>
          );
        })}
      </div>
    </>
  );
};
