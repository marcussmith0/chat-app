const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

const { generateMessage, generateLocationMessage } = require("./utils/message");

app.use(express.static(path.join(__dirname, "../public")));



io.on("connection", (socket) => {
    console.log("new user connected");

    socket.emit("newMessage", generateMessage("Admin", "hey new connecter"));
    
    socket.broadcast.emit("newMessage", generateMessage("Admin", "A new user connected"));

    socket.on("disconnect", () => {
        console.log('We lost the client');
    });

    socket.on("createMessage", (message, callback) => {
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback("this is from the server");
    });

    socket.on("createLocationMessage", (coords) => {
        io.emit("newLocationMessage", generateLocationMessage("Mike", coords.latitude, coords.longitude));
    });
});

server.listen(PORT, () => {
    console.log("server is watching", PORT);
});