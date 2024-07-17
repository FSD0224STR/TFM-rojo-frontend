import React, { useState, useEffect, useContext } from "react";
import { socket } from "../../components/SimpleChatComponents/Socket";
import { ConnectionManager } from "../../components/SimpleChatComponents/ConnectionManager";
import { Events } from "../../components/SimpleChatComponents/Events";
import { MyForm } from "../../components/SimpleChatComponents/MyForm";
import { AuthContext } from "../../contexts/authContext";
import { ChatConsole } from "../../components/SimpleChatComponents/ChatConsole";
import { TypingComponent } from "../../components/SimpleChatComponents/TypingComponent";

export const SimpleChat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const { setMessage, userData } = useContext(AuthContext);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  useEffect(() => {
    socket.on("connect", (msg) => {
      // console.log(msg);
      // setMessage(`User , has been connected`);
    });

    socket.on("disconnect", (msg) => {
      // console.log(msg);
      // setMessage(`User , has been disconnected`);
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#47a3bc73",
        height: "100%",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ChatConsole />
      <TypingComponent />
      {/* <Events events={fooEvents} /> */}
      {/* <ConnectionManager /> */}
      <MyForm />
    </div>
  );
};
