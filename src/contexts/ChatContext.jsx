import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { ChatMessages } from "../components/Chat/ChatMessages";
import { socket } from "../components/SimpleChatComponents/Socket";

export const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
  const { userData, setMessage } = useContext(AuthContext);

  //Set logging level
  useEffect(() => {
    // console.log(userData);
    const username = userData?.name;
    // console.log(username);
    if (username) {
      socket.emit("login", { user: username });
    }

    socket.on("toastMessage", (user) => {
      setMessage(`user ${user.user} has logged in`);
    });
    return () => {
      socket.off("toastMessage");
    };
  }, [userData]);

  // Messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, []);

  const ChatContextValue = {
    messages,
    setMessages,
  };

  return (
    <ChatContext.Provider value={ChatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};
