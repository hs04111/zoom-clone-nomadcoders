import http from "http";
import express from "express";
import SocketIo from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
app.use("/public", express.static(`${__dirname}/public`));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => {
  console.log("✔Server running on http://localhost:3000");
};

const httpServer = http.createServer(app);
const wsServer = SocketIo(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (msg, done) => {
    console.log(msg);
    done("We are Done!");
  });
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

httpServer.listen(3000, handleListen);
