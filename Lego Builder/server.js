var express = require("express");
var app = express();
var http = require("http").createServer(app);
var socketio = require("socket.io")(http);

app.use(express.static("static"));

http.listen(3000, function() {
  console.log("Listening on 3000...");
});

players = [];

socketio.on("connection", function(client) {
  console.log("Klient się podłączył " + client.id);
  client.emit("onconnect", {
    clientName: client.id
  });

  client.on("disconnect", function() {
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == client.id) {
        console.log("Disconnect playera o ID ", client.id);
        players.splice(i, 1);
        console.log("Tablica userów po usunięciu: ", players);
      }
    }
  });

  players.push({ id: client.id, currentBlock: null, currentColor: 0 });
  console.log("Tablica userów po dodaniu usera: ", players);

  client.on("createBlock", function(data) {
    console.log("Tworzenie pojedynczego bloku.");
    client.broadcast.emit("createBlock", { posX: data.posX, posY: data.posY });
  });

  client.on("createLongerBlock", function(data) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == data.playerId) {
        console.log("CreateLongerBlock playera o ID ", data.playerId);
        var blockVector = players[i].currentBlock;
        var currentColor = players[i].currentColor;
      }
    }
    console.log("Znaleziony kolor", currentColor);
    client.broadcast.emit("createLongerBlock", {
      playerVector: blockVector,
      currentColor: currentColor
    });
  });

  client.on("rotateBlock", function(data) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == data.playerId) {
        console.log("RotateBlock playera o ID ", data.playerId);
        var blockVector = players[i].currentBlock;
      }
    }
    client.broadcast.emit("rotateBlock", {
      playerVector: blockVector
    });
  });

  client.on("changeColor", function(data) {
    console.log("Zmieniam kolor.");
    console.log("Tablica userów przed zmianą koloru", players);
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == data.playerId) {
        console.log("Znaleziono playera o ID", data.playerId);
        var blockVector = players[i].currentBlock;
        players[i].currentColor += 1;
        if (players[i].currentColor > 2) players[i].currentColor = 0;
        var currentColor = players[i].currentColor;
      }
    }
    console.log(
      "Kolor wybranego bloku",
      currentColor,
      " i jego wektor ",
      blockVector
    );
    client.broadcast.emit("changeColor", {
      playerVector: blockVector,
      currentColor: currentColor
    });
  });

  client.on("getPlayers", function() {
    console.log("Pobrano userów...");
    socketio.sockets.emit("getPlayers", { players: players });
  });

  client.on("moveLeft", function(data) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == data.playerId) {
        console.log("Znaleziono playera o ID", data.playerId);
        var blockVector = players[i].currentBlock;
      }
    }
    client.broadcast.emit("moveLeft", {
      playerVector: blockVector
    });
  });

  client.on("moveUp", function(data) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == data.playerId) {
        console.log("Znaleziono playera o ID", data.playerId);
        var blockVector = players[i].currentBlock;
      }
    }
    client.broadcast.emit("moveUp", {
      playerVector: blockVector
    });
  });

  client.on("moveRight", function(data) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == data.playerId) {
        console.log("Znaleziono playera o ID", data.playerId);
        var blockVector = players[i].currentBlock;
      }
    }
    client.broadcast.emit("moveRight", {
      playerVector: blockVector
    });
  });

  client.on("moveDown", function(data) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].id == data.playerId) {
        console.log("Znaleziono playera o ID", data.playerId);
        var blockVector = players[i].currentBlock;
      }
    }
    client.broadcast.emit("moveDown", {
      playerVector: blockVector
    });
  });

  client.on("setBlock", function(data) {
    console.log("Ustawienie bloku.");
    for (let i = 0; i < players.length; i++) {
      console.log(i + " id gracza " + players[i].id);
      if (players[i].id == data.playerId) {
        console.log("Znaleziono playera o ID", data.playerId);
        players[i].currentBlock = data.blockVector;
        players[i].currentColor = 0;
      }
    }
    socketio.sockets.emit("setBlock", { players: players });
    console.log("Tablica userów po ustawieniu currentBloku", players);
  });
});
