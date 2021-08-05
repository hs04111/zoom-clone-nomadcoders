const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#msg");
const nickeForm = document.querySelector("#nick");
// https://developer.mozilla.org/ko/docs/Web/API/WebSocket/WebSocket

const socket = new WebSocket(`ws://${window.location.host}`);

const makeMessage = (type, payload) => JSON.stringify({ type, payload });

socket.addEventListener("open", () => {
  console.log("Connected to server!");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from server!");
});

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
};

const handleNickSubmit = (event) => {
  event.preventDefault();
  const input = nickeForm.querySelector("input");
  socket.send(makeMessage("nick", input.value));
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
nickeForm.addEventListener("submit", handleNickSubmit);
