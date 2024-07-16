import { Tabs } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";

import { ChatContext } from "../../contexts/ChatContext";

import { AuthContext } from "../../contexts/authContext";

export const ChatTabs = () => {
  const { userData } = useContext(AuthContext);
  const { tabs, removeUser, setUserToChat } = useContext(ChatContext);

  const onChange = (key) => {
    setUserToChat(key);
  };

  const remove = (targetKey) => {
    // console.log("remove", targetKey);
    removeUser(targetKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      // add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      hideAdd
      onChange={onChange}
      type="editable-card"
      onEdit={onEdit}
      items={tabs}
      id="Room"
    />
  );
};
