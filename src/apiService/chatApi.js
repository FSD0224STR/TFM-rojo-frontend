import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

var socket = io("http://localhost:3000");

//   socket.emit("login", { id: userData?.id, name: userData?.name });

const chatForm = document.getElementById(`chatForm`);
const input = document.getElementById(`input`);
const messageList = document.getElementById(`messages`);
const statusMsg = document.getElementById(`status`);

const nickname = userData?.name;

chatForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  // alert("Please enter");
  socket.emit("msg", { nickname: nickname, msg: input.value });
  // console.log("msg", { nickname: nickname, msg: input.value });
});

input?.addEventListener("keypress", function (e) {
  e.preventDefault();
  // console.log("Usuario está escribiendo");
  socket.emit("status", { nickname: nickname, status: "writting" });
});

socket.on("msg", function (msg) {
  console.log("He recibido un mensaje", msg.msg);
  let item = document.createElement("li");
  item.innerText = "💌 " + msg.nickname + ": " + msg.msg;
  messageList.append(item);
});

socket.off("msg", function (msg) {
  console.log("He recibido un mensaje", msg.msg);
  let item = document.createElement("li");
  item.innerText = "💌 " + msg.nickname + ": " + msg.msg;
  messageList.append(item);
});

socket.on("userConnection", (msg) => {
  let item = document.createElement("li");
  item.innerText = "👨 " + msg.msg;
  messageList.append(item);
});

socket.off("userConnection", (msg) => {
  console.log("");
});

socket.on("msg", function (msg) {
  console.log("He recibido un mensaje", msg.msg);
  let item = document.createElement("li");
  item.innerText = "💌 " + msg.nickname + ": " + msg.msg;
  messageList.append(item);
});

socket.on("status", (status) => {
  console.log("status", status);
  switch (status.status) {
    case "writting":
      statusMsg.innerText = status.nickname + " está escribiendo";
      break;
    default:
  }
});
