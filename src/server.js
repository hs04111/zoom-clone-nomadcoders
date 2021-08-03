import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
app.get("/public", express.static(`${__dirname}/public`));

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

server.listen(3000, handleListen);
