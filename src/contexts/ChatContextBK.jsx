import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { ChatMessages } from "../components/Chat/ChatMessages";

export const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
  const { setError, setSuccess, setLoading } = useContext(AuthContext);
  const { findUsers, userData } = useContext(AuthContext);

  const [usersInChat, setUsersInChat] = useState([]);
  const [usersToChat, setUsersToChat] = useState();
  const [tabs, setTabs] = useState([]);
  const [usersNoPatientList, setUsersNoPatientList] = useState();

  const AddUserToChat = (user) => {
    const userAdd = [user, ...usersInChat];
    setUsersInChat(userAdd);

    // console.log(userAdd);
  };

  const findUsersToChat = async () => {
    setLoading(true);
    if (usersToChat === undefined || usersToChat.length === 0) {
      const response = await findUsers();
      // console.log("allUsers", response);
      const usersNoPatients = response?.filter(
        (user) => user.roles !== "patient"
      );
      // console.log(usersNoPatients);
      setUsersNoPatientList(
        usersNoPatients.filter((user) => user?._id !== userData?.id)
      );
    }

    const usersNoPatientsLength = usersNoPatientList?.length;
    const usersToChatLength = usersToChat?.length ? usersToChat.length : 0;
    const usersInChatLength = usersInChat?.length ? usersInChat.length : 0;
    // console.log("usersNoPatientsLength", usersNoPatientsLength);
    // console.log("usersToChatLength", usersToChatLength);
    // console.log("usersInChatLength", usersInChatLength + 1);

    if (
      usersNoPatientsLength - usersToChatLength <= usersInChatLength + 1 ||
      usersToChatLength === 0
    ) {
      // alert("entró");
      const usersToList = usersNoPatientList?.filter(
        (user) => !usersInChat.some((userInChat) => userInChat.id === user?._id)
      );
      setTimeout(() => {
        setUsersToChat(usersToList);
        // console.log("users to chat", usersToList);
        setLoading(false);
      }, 1500);
    }
  };

  const AddUser = (user) => {
    // console.log("users to add", user);
    AddUserToChat(user);
  };
  useEffect(() => {
    findUsersToChat();
    findItems();
  }, [usersInChat]);

  const removeUser = (userToRemove) => {
    // console.log("users to remove", userToRemove);
    if (usersInChat.length > 1) {
      setUsersInChat(usersInChat.filter((user) => user.id !== userToRemove));
    } else {
      setUsersInChat([]);
    }
  };

  const findItems = () => {
    // console.log(usersInChat);
    const tabsContent = usersInChat.map((user) => ({
      key: user.id,
      label: user.user,
      children: (
        // <div style={{ width: "100%", height: "100%", backgroundColor: "red" }}>
        // </div>
        <ChatMessages key={user.id} />
      ),
    }));
    // console.log(tabsContent);
    setTabs(tabsContent);
    // console.log("tabs: ", tabs);
  };

  // Chat Messages

  const [userToChat, setUserToChat] = useState();

  useEffect(() => {
    findItems();
  }, []);

  const ChatContextValue = {
    usersInChat,
    usersToChat,
    tabs,
    findItems,
    AddUserToChat,
    findUsersToChat,
    AddUser,
    removeUser,
    userToChat,
    setUserToChat,
  };

  return (
    <ChatContext.Provider value={ChatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};
