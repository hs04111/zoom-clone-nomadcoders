import http from "http";
import express from "express";
import SocketIo from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
app.use("/public", express.static(`${__dirname}/public`));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIo(httpServer);

wsServer.on("connection", (socket) => {
  socket["nickname"] = "Anonymous";
  socket.onAny((event) => console.log(`Socket Event: ${event}`));
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    socket.to(roomName).emit("welcome", socket.nickname);
    done();
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname)
    );
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });

  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

// const wss = new WebSocket.Server({ server });
// const sockets = [];
// wss.on("connection", (socket) => {
//   console.log("Connected to browser!");
//   sockets.push(socket);
//   socket["nick"] = "Anonymous";
//   socket.on("close", () => {
//     console.log("Disconnected from the browser");
//   });
//   socket.on("message", (message) => {
//     const parsedMessage = JSON.parse(message.toString("utf8"));
//     switch (parsedMessage.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nick}: ${parsedMessage.payload}`)
//         );
//         break;
//       case "nick":
//         socket["nick"] = parsedMessage.payload;
//         break;
//     }
//   });
//   socket.send("Hello!");
// });

const handleListen = () => {
  console.log("✔Server running on http://localhost:3000");
};

httpServer.listen(3000, handleListen);
