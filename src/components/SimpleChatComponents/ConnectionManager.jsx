import React, { useContext } from "react";
import { socket } from "./Socket";
import { AuthContext } from "../../contexts/authContext";

export function ConnectionManager() {
  const { setMessage } = useContext(AuthContext);
  // function connect() {
  //   socket.connect();
  // }

  // function disconnect() {
  //   socket.disconnect();
  // }

  return (
    <>
      {/* <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button> */}
    </>
  );
}
