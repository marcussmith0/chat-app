var socket = io();
socket.on("connect", function(){
    console.log("new user connected to client");

    socket.emit("createMessage", {
        text: "hey how have you been doing"
    });
});

socket.on("disconnect", function(){
    console.log("We disconnected to the server.");
});

socket.on("newMessage", (message) => {
    console.log("You recieved a new message.", message);
});

