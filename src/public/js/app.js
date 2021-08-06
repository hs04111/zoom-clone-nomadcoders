const socket = io();

const welcome = document.querySelector("#welcome");
const enterForm = welcome.querySelector("form");

const backendDone = (msg) => console.log(`backend Says: ${msg}`);

const handleRoomSubmit = (event) => {
  const input = enterForm.querySelector("input");
  event.preventDefault();
  socket.emit("enter_room", { payload: input.value }, backendDone);
  input.value = "";
};

enterForm.addEventListener("submit", handleRoomSubmit);
