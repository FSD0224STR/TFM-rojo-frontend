import { Avatar } from "antd";
import React from "react";

export const UserInfoCard = ({ userInfo, i }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        gap: "1em",
        fontSize: "15px",
        fontWeight: "bold",
        // backgroundColor: `${date?.color}`,
      }}
    >
      <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`} />
      <h3>
        {userInfo?.name} {userInfo?.lastName}
      </h3>
      {/* <p>
                <Link>{userInfo?.phone}</Link>
              </p> */}
    </div>
  );
};
