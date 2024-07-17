import React, { useContext, useEffect, useState } from "react";
import { socket } from "./Socket";
import { AuthContext } from "../../contexts/authContext";

export const TypingComponent = () => {
  const { userData } = useContext(AuthContext);
  const [userTyping, setUserTyping] = useState();

  useEffect(() => {
    socket.on("typingMessage", (user) => {
      //   console.log(user);
      setUserTyping(user);
    });
    socket.on("stopTypingMessage", () => {
      setUserTyping("");
    });

    return () => {
      socket.off("typingMessage");
      socket.off("stopTypingMessage");
    };
  }, []);

  return <div>{userTyping ? `Typing ${userTyping} ...` : ""}</div>;
};
