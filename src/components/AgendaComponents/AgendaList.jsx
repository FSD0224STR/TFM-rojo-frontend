import React, { useContext, useEffect, useState } from "react";
import { Avatar, Badge, Button, Card, Divider, List } from "antd";
import { DatesContext } from "../../contexts/DatesContext";
import { DatesHours } from "./DatesHours";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

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
        renderItem={(item, i) => (
          <List.Item style={{ display: "Flex", flexDirection: "column" }}>
            <Divider orientation="left">
              {item.user !== undefined || item.state === "canceled" ? (
                `Hour: ${item.time}`
              ) : (
                <Link onClick={() => console.log(item.time, item.date)}>
                  Hour: {item.time}
                </Link>
              )}
            </Divider>
            {item.user !== undefined && (
              <Badge.Ribbon
                text={item.state}
                status={item.state}
                color={item.color}
              >
                <Card title={item.user} style={{ width: "80vw" }}>
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`}
                    style={{ marginRight: "1em" }}
                  />
                  {item.reason} - {item.doctor}
                  <Button>Change</Button>
                </Card>
              </Badge.Ribbon>
            )}
          </List.Item>
        )}
      />
    </div>
  );
};
