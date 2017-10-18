const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
    console.log("new user connected");

    socket.on("disconnect", () => {
        console.log('We lost the client');
    });

    socket.emit("newMessage", {
        from: "marcus",
        text: "sup everybody",
        createdAt: 234321
    });

    socket.on("createMessage", (message) => {
        console.log(message);
    });
});

server.listen(PORT, () => {
    console.log("server is watching", PORT);
});