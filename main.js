const express = require("express");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

http.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});

//socket

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("connected..");

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
