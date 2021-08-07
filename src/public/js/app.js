const socket = io();

const welcome = document.querySelector("#welcome");
const room = document.getElementById("room");
const enterForm = welcome.querySelector("form");

let roomName;

room.hidden = true;

const addMessage = (message) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.append(li);
};

const showRoom = () => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  room.hidden = false;
  welcome.hidden = true;
};

const handleRoomSubmit = (event) => {
  const input = enterForm.querySelector("input");
  event.preventDefault();
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
};

enterForm.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
  addMessage("Someone joined the room");
});
