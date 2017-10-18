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

    socket.on("createMessage", (message) => {
        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
    });
});

server.listen(PORT, () => {
    console.log("server is watching", PORT);
});