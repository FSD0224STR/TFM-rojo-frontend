import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { ChatMessages } from "../components/Chat/ChatMessages";
import { socket } from "../components/SimpleChatComponents/Socket";

export const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
  const { userData, setMessage, isLoggedIn } = useContext(AuthContext);

  //Set logging level
  useEffect(() => {
    setMessage("");
    // console.log(userData?.name);
    const username = userData?.name;
    // console.log(username);
    if (username) {
      socket.emit("login", { user: username });
    }

    socket.on("loginMessage", (user) => {
      // console.log(userData);
      // console.log(user.user);
      userData?.name !== user.user &&
        setMessage(`user ${user.user} has logged in`);
    });

    socket.on("logoutMessage", (user) => {
      isLoggedIn &&
        userData?.name !== user.user &&
        setMessage(`user ${user.user} has logged out`);
    });

    return () => {
      socket.off("loginMessage");
      socket.off("logoutMessage");
    };
  }, [isLoggedIn]);

  // Messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      // setMessages("message");
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
