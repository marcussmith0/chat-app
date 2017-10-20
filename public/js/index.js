var socket = io();
socket.on("connect", function(){
    console.log("new user connected to client");

    socket.on("newMessage", (message) => {
        console.log(message);
    });
    socket.on("newMessge", (message) => {
        console.log(message);
    })
});

socket.on("disconnect", function(){
    console.log("We disconnected to the server.");
});

socket.on("newMessage", (message) => {
    console.log("You recieved a new message.", message);
});

