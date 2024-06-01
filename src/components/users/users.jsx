import { useContext, useEffect, useLayoutEffect, useState } from "react";

import {
  Avatar,
  Button,
  List,
  Pagination,
  Space,
  Input,
  Table,
  Radio,
  Popconfirm,
  Empty,
} from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  DiffOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../contexts/authContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { filterBy, onSearch, sortBy } from "./SortAndFilterUsers.jsx";
const { Search } = Input;

export const Users = () => {
  const { data, roleData, searchUserInfo, GetUsers } = useContext(AuthContext);
  const [listData, setListData] = useState(data);
  const [orderItem, setOrderItem] = useState("dni");
  const [orderSort, setOrderSort] = useState("ascending");

  const navigate = useNavigate();

  useEffect(() => {
    GetUsers();
    setListData(data);
  }, []);

  return (
    <>
      <div
        style={{
          height: "90vh",
          width: "70vw",
          // backgroundColor: "red",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        }}
        id="listContainer"
      >
        {roleData !== "patient" && (
          <div>
            {/* {console.log(data)} */}
            {/* <h1 style={{ textAlign: "center" }}>Users Info</h1> */}
            <Space direction="vertical">
              <div
                style={{
                  width: "70vw",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Search
                  placeholder="input search text"
                  onChange={(e) => {
                    const response = onSearch(e.target.value, data);
                    setListData(response);
                  }}
                  style={{
                    width: 200,
                  }}
                />
                <Link to={"/createuser"}>
                  <Button type="primary">Create new user</Button>
                </Link>
              </div>

              <div
                style={{
                  width: "70vw",
                  // backgroundColor: "red",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3>Sort by:</h3>
                  <div style={{ display: "flex", gap: "1em" }}>
                    <Radio.Group
                      onChange={(e) => {
                        sortBy(e.target.value, listData, orderSort);
                        setOrderItem(e.target.value);
                        navigate("/userdata");
                      }}
                    >
                      <Radio.Button value="dni">Dni</Radio.Button>
                      <Radio.Button value="name">Name</Radio.Button>
                      <Radio.Button value="email">E-mail</Radio.Button>
                      <Radio.Button value="role">Role</Radio.Button>
                    </Radio.Group>
                    <Radio.Group
                      onChange={(e) => {
                        setOrderSort(e.target.value);
                        sortBy(orderItem, listData, e.target.value);
                        navigate("/userdata");
                      }}
                    >
                      <Radio.Button value="ascending">Ascending</Radio.Button>
                      <Radio.Button value="descending">Descending</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>

                {roleData === "admin" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "end",
                    }}
                  >
                    <h3>Filter by:</h3>
                    <Radio.Group
                      onChange={async (e) => {
                        const response = await filterBy(e.target.value, data);
                        // console.log(response);
                        setListData(response);
                        navigate("/userdata");
                      }}
                    >
                      <Radio.Button value="admin">Admin</Radio.Button>
                      <Radio.Button value="doctor">Doctor</Radio.Button>
                      <Radio.Button value="patient">Patient</Radio.Button>
                      <Radio.Button value="all">All</Radio.Button>

                      {/* <Radio.Button
              value="original"
            >
              Original
            </Radio.Button> */}
                    </Radio.Group>
                  </div>
                )}
              </div>
            </Space>
          </div>
        )}
        <div>
          {listData?.length ? (
            <>
              <div
                style={
                  {
                    // backgroundColor: "red",
                    // maxHeight: "70vh",
                    // height: "100%",
                    // overflow: "auto",
                    // padding: "1em",
                  }
                }
              >
                <List
                  itemLayout="Horizontal"
                  dataSource={listData}
                  pagination={{
                    total: listData.length,
                    pageSize: 4,
                    showLessItems: true,
                  }}
                  renderItem={(item, index) => (
                    <List.Item
                      actions={[
                        item.roles.includes("patient") && (
                          <Link key="createNewDate" to={"/createnewdate"}>
                            <DiffOutlined />
                          </Link>
                        ),

                        <Link
                          key="editUser"
                          onClick={() => {
                            searchUserInfo(item._id);
                            setTimeout(() => {
                              navigate(`/updateuser/`);
                            }, 500);
                          }}
                        >
                          <EditOutlined />
                        </Link>,
                        roleData !== "patient" && (
                          <Popconfirm
                            title="Are you sure to delete this user?"
                            onConfirm={() =>
                              alert(`You deleted ${item.name} ${item.lastName}`)
                            }
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                            key="deleteUser"
                          >
                            <Link>
                              <DeleteOutlined />
                            </Link>
                          </Popconfirm>
                        ),
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                          />
                        }
                        title={`${item.name} ${item.lastName}`}
                        description={
                          <div>
                            <h3 style={{ marginRight: "2em", margin: 0 }}>
                              {item.roles}
                            </h3>
                            <p style={{ margin: 0 }}>
                              {item.email ? item.email : "No register email"}
                            </p>
                            <p style={{ margin: 0 }}>
                              {item.dni ? item.dni : "No register dni"}
                            </p>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                  style={{ width: "70vw" }}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <Empty />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
