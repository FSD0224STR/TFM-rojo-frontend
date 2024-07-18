import { useContext, useEffect, useState } from "react";

import {
  Avatar,
  Button,
  List,
  Space,
  Input,
  Radio,
  Popconfirm,
  Empty,
  Drawer,
} from "antd";

import { DeleteOutlined, EditOutlined, DiffOutlined } from "@ant-design/icons";
import { AuthContext } from "../../contexts/authContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { filterBy, onSearch, sortBy } from "./SortAndFilterUsers.jsx";
import { DatesContext } from "../../contexts/DatesContext.jsx";
import { CreateNewDate } from "../CreateNewDate/CreateNewDate.jsx";
const { Search } = Input;

export const Users = () => {
  const { data, roleData, searchUserInfo, GetUsers, getMyProfile, setLoading } =
    useContext(AuthContext);
  const {
    setDoctor,
    setDateSelected,
    setDoctorId,
    userSelected,
    setUserSelected,
  } = useContext(DatesContext);

  const [listData, setListData] = useState(data);
  const [orderItem, setOrderItem] = useState("dni");
  const [orderSort, setOrderSort] = useState("ascending");
  const [openCreateNewDate, setOpenCreateNewDate] = useState(false);

  const onOpenCreateNewDate = (id) => {
    setUserSelected(id);
    setTimeout(() => {
      setOpenCreateNewDate(true);
    }, 500);
  };

  const onCloseCreateNewDate = () => {
    setOpenCreateNewDate(false);

    // console.log(userSelected);
  };

  const navigate = useNavigate();

  // const findAllUsers = await () => {

  const findUsersComponent = async () => {
    // await getMyProfile();
    const response = await GetUsers();
    // console.log(response);
    response !== undefined && setListData(response);
    setLoading(false);
  };

  useEffect(() => {
    findUsersComponent();
    // setListData(data);
  }, []);

  return (
    <>
      <div
        style={{
          height: "90vh",
          width: "70vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        }}
        id="listContainer"
      >
        {roleData !== "patient" && (
          <div>
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
                        setListData(response);
                        navigate("/userdata");
                      }}
                    >
                      <Radio.Button value="admin">Admin</Radio.Button>
                      <Radio.Button value="doctor">Doctor</Radio.Button>
                      <Radio.Button value="patient">Patient</Radio.Button>
                      <Radio.Button value="all">All</Radio.Button>
                    </Radio.Group>
                  </div>
                )}
              </div>
            </Space>
          </div>
        )}
        <div>
          {listData !== undefined ? (
            <>
              <div>
                <List
                  itemLayout="Horizontal"
                  dataSource={listData}
                  pagination={{
                    total: listData?.length,
                    pageSize: 4,
                    showLessItems: true,
                  }}
                  renderItem={(item, index) => (
                    <List.Item
                      actions={[
                        item.roles.includes("patient") && (
                          <Link
                            key="createNewDate"
                            onClick={() => {
                              // setUserSelected(item._id);
                              setOpenCreateNewDate(true);
                              onOpenCreateNewDate(item._id, openCreateNewDate);
                            }}
                          >
                            <DiffOutlined />
                          </Link>
                        ),

                        <Link
                          key="editUser"
                          onClick={async () => {
                            await searchUserInfo(item._id);
                            setTimeout(() => {
                              navigate(`/updateuser/`);
                            }, 500);
                          }}
                        >
                          <EditOutlined />
                        </Link>,
                        // roleData !== "patient" && (
                        //   <Popconfirm
                        //     title="Are you sure to delete this user?"
                        //     onConfirm={() =>
                        //       alert(`You deleted ${item.name} ${item.lastName}`)
                        //     }
                        //     // onCancel={cancel}
                        //     okText="Yes"
                        //     cancelText="No"
                        //     key="deleteUser"
                        //   >
                        //     <Link>
                        //       <DeleteOutlined />
                        //     </Link>
                        //   </Popconfirm>
                        // ),
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Link>
                            <Avatar
                              src={
                                item?.fileUrlLink !== undefined
                                  ? `${item.fileUrlLink}`
                                  : `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`
                              }
                              style={{
                                width: "50px",
                                height: "50px",
                                marginTop: "20px",
                              }}
                            />
                          </Link>
                        }
                        key={item._id}
                        onClick={() => {
                          searchUserInfo(item._id);
                          setTimeout(() => {
                            navigate(`/user`);
                          }, 500);
                        }}
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
      {userSelected && (
        <Drawer
          title="Basic Drawer"
          onClose={onCloseCreateNewDate}
          open={openCreateNewDate}
        >
          <CreateNewDate id={userSelected} />
        </Drawer>
      )}
    </>
  );
};
