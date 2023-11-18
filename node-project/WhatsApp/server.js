const express = require("express");
const app = express();
const http = require("http").createServer(app);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(port, () => {
  console.log(`Listening to PORT ${port}`);
});

// Socket

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
