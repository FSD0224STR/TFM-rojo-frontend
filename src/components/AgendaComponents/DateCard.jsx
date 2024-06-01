import {
  Avatar,
  Card,
  Collapse,
  ConfigProvider,
  Popconfirm,
  Popover,
  Select,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { DatesContext } from "../../contexts/DatesContext";
import { Link } from "react-router-dom";
import { DeleteOutlined, FileDoneOutlined } from "@ant-design/icons";
const { Option } = Select;

export const DateCard = (date, i) => {
  const { searchUserInfo, minHeightCard, lookForPosition } =
    useContext(DatesContext);

  const [userInfo, setUserInfo] = useState();
  const [responseRef, setResponseRef] = useState();

  const findPosition = async () => {
    const response = await lookForPosition(date.date);
    setResponseRef(response);
  };

  const findInfo = async () => {
    console.log(date.date.idPatient);
    const user = await searchUserInfo(date.date.idPatient);
    console.log(user);
    setUserInfo(user);
  };

  useEffect(() => {
    findInfo();
    findPosition();
  }, []);

  return (
    <>
      {/* {console.log(date.date.idPatient, responseRef)} */}
      <ConfigProvider
        theme={{
          components: {
            Card: {
              headerBg: `${date.date.color}`,
              headerHeight: { minHeightCard },
            },
            Collapse: {
              headerBg: `${date.date.color}`,
            },
          },
        }}
      >
        {responseRef?.heightRef > minHeightCard ? (
          <div
            style={{
              position: "absolute",
              width: "60vw",
              // top: 0,
              top: `${responseRef?.topRef}px`,
              right: "2em",
              height: `${responseRef?.heightRef}px`,
            }}
          >
            <Card
              headerBg="red"
              headerHeight={minHeightCard}
              style={{ height: "100%" }}
              title={
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`}
                      style={{ marginRight: "1em" }}
                    />
                    <p>
                      user: {userInfo?.name} Phone:{" "}
                      <Link>{userInfo?.phone}</Link>
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
                <div>{date.date.reason}</div>
                <Select
                  size="large"
                  defaultValue={date.date.state}
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
              top: `${responseRef?.topRef}px`,
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
                          user: {userInfo?.name} Phone:
                          <Link>{userInfo?.phone}</Link>
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
                          defaultValue={date.date.state}
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
                {date.date.reason}
              </Collapse.Panel>
            </Collapse>
          </div>
        )}
      </ConfigProvider>
    </>
  );
};
