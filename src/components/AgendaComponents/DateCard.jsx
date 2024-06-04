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
import { Form, Link } from "react-router-dom";
import { DeleteOutlined, FileDoneOutlined } from "@ant-design/icons";
const { Option } = Select;

export const DateCard = (date, i) => {
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
    const response = await lookForPosition(date?.date);
    setResponseRef(response);
  };

  const findInfo = async () => {
    const user = await searchUserInfo(date?.date.idPatient);
    setUserInfo(user);
  };

  useEffect(() => {
    findInfo();
    findPosition();
    // console.log(date.date._id);
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Card: {
              headerBg: `${date?.date.color}`,
              headerHeight: { minHeightCard },
            },
            Collapse: {
              headerBg: `${date?.date.color}`,
            },
          },
        }}
      >
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
                      user: {userInfo?.name} Phone:
                      <Link>{userInfo?.phone}</Link>
                    </p>
                  </div>
                </>
              }
              extra={
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "1em",
                      fontSize: "1.2em",
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
                      onConfirm={() => deleteDate(date?.date._id)}
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
                            onConfirm={() => deleteDate(date?.date._id)}
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
