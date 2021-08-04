// https://developer.mozilla.org/ko/docs/Web/API/WebSocket/WebSocket

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to server!");
});
socket.addEventListener("message", (message) => {
  console.log(message.data);
});
socket.addEventListener("close", () => {
  console.log("Disconnected from server!");
});

setTimeout(() => {
  socket.send("hello from the browser!");
}, 3000);
