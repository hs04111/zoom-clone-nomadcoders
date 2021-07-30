import express from "express";

const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res)=>{return res.render("home")})

const handleListen = () => console.log("✔Server running on http://localhost:3000")

app.listen(3000, handleListen);