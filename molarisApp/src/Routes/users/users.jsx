import { useContext } from "react";
import { Avatar, Button, List } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AuthContext } from "../../contexts/authContext.jsx";

export const Users = () => {
  const { data } = useContext(AuthContext);

  return (
    <>
      {/* {console.log(data)} */}
      <h1 style={{ textAlign: "center" }}>Users Info</h1>
      {data.length ? (
        <List
          pagination={{
            position: "bottom",
            align: "center",
          }}
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item.name}</a>}
                description={
                  <div>
                    <p style={{ margin: 0 }}>
                      {item.email ? item.email : "No register email"}
                    </p>
                    <p style={{ margin: 0 }}>
                      {item.dni ? item.dni : "No register dni"}
                    </p>
                  </div>
                }
              />
              <h3 style={{ marginRight: "2em" }}>{item.roles}</h3>
              <Button>
                <EditOutlined />
              </Button>
              <Button>
                <DeleteOutlined />
              </Button>
            </List.Item>
          )}
          style={{ width: "70vw" }}
        />
      ) : (
        <h1>No tiene acceso</h1>
      )}
    </>
  );
};
