import { Popconfirm, Popover, Select } from "antd";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { DatesContext } from "../../contexts/DatesContext";
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  FileDoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
const { Option } = Select;

export const ActionsDateCard = ({ date }) => {
  const { deleteDate, changeStatusDate } = useContext(DatesContext);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
      <Select
        size="large"
        defaultValue={date?.state}
        disabled={
          dayjs(date?.date).format("YYYY-MM-DD") <
            dayjs().format("YYYY-MM-DD") && true
        }
        style={{ width: "150px" }}
        onChange={(value) => changeStatusDate(date?._id, value)}
      >
        <Option value="confirmed">Confirmed</Option>
        <Option value="pending">Pending</Option>
        <Option value="cancelled">cancelled</Option>
      </Select>

      <div
        style={{
          display: "flex",
          gap: "10px",
          fontSize: "20px",
        }}
      >
        <Popover content="Conctact user" trigger="hover" placement="bottom">
          <Link>
            <WhatsAppOutlined />
          </Link>
        </Popover>
        <Popover content="Create new bill" trigger="hover" placement="bottom">
          <Link to={"/CreateBills"}>
            <FileDoneOutlined />
          </Link>
        </Popover>

        {dayjs(date?.date).format("YYYY-MM-DD") >=
          dayjs().format("YYYY-MM-DD") && (
          <Popconfirm
            title="Delete the date"
            description="Are you sure to delete this date?"
            onConfirm={() => deleteDate(date?._id)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Popover content="Delete date" trigger="hover" placement="bottom">
              <Link>
                <DeleteOutlined />
              </Link>
            </Popover>
          </Popconfirm>
        )}
      </div>
    </div>
  );
};
