import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
app.use("/public", express.static(`${__dirname}/public`));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => {
  console.log("✔Server running on http://localhost:3000");
};

// 웹소켓을 올리기 위해, 서버를 코드에서 나타낸다.
const server = http.createServer(app);

// 웹소켓 서버를 http 서버 위에 올린다. 반드시 이렇게만 해야 하는 것은 아니다.
// 현재의 경우, view 등을 함께 사용하기 위해 이렇게 세팅한다.
// 이제 같은 port에서 ws와 http 프로토콜을 모두 사용할 수 있다.
const wss = new WebSocket.Server({ server });

// 웹소켓에서도 마치 addEventListener처럼 콜백 함수를 이벤트에 붙일 수 있다.

const sockets = [];

wss.on("connection", (socket) => {
  console.log("Connected to browser!");
  sockets.push(socket);
  socket["nick"] = "Anonymous";
  socket.on("close", () => {
    console.log("Disconnected from the browser");
  });
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString("utf8"));
    switch (parsedMessage.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nick}: ${parsedMessage.payload}`)
        );
        break;
      case "nick":
        socket["nick"] = parsedMessage.payload;
        break;
    }
  });
  socket.send("Hello!");
});

server.listen(3000, handleListen);
