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
    var li = $("<li>");
    li.text(`${message.from}: ${message.text}`);
    $("#messages").append(li);
});

socket.on("newLocationMessage", function(message) {
    var li = $("<li>");
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr("href", message.url);
    li.append(a);
    $("#messages").append(li);
});

$("#message-form").on("submit", function(e) {
    e.preventDefault();

    var nameMessage = $("[name=message]");

    socket.emit("createMessage", {
        from: "Frank",
        text: nameMessage.val()
    }, function(data) {
        console.log("got it", data);
    });
    nameMessage.val("");
});

var sendLocation = $("#send-location");

sendLocation.on("click", function() {
    if(!navigator.geolocation) return alert("Geolation not supported by browser");

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    });
});