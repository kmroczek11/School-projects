class Net {
  constructor() {
    console.log("Konstruktor klasy Net.");
    this.client = io();
    this.client.on("onconnect", function(data) {
      game.playerId = data.clientName;
      console.log("Twoje ID", game.playerId);
      $("#player").html(game.playerId);
    });

    this.client.on("createBlock", function(data) {
      console.log("Tworzę blok.");
      game.createBlock(data.posX, data.posY, false);
    });

    this.client.on("createLongerBlock", function(data) {
      console.log("Tworzę dłuższy blok.");
      game.createLongerBlock(false, data.playerVector, data.currentColor);
    });

    this.client.on("rotateBlock", function(data) {
      console.log("Rotuję blok.");
      game.rotateBlock(false, data.playerVector);
    });

    this.client.on("changeColor", function(data) {
      console.log("Zmieniam kolor.");
      game.changeColor(false, data.playerVector, data.currentColor);
    });

    this.client.on("getPlayers", function(data) {
      game.players = data.players;
      console.log("Usersi w grze:", game.players);
    });

    this.client.on("setBlock", function(data) {
      game.players = data.players;
      console.log("Bloki w grze:", game.players);
    });

    this.client.on("moveLeft", function(data) {
      game.moveLeft(false, data.playerVector);
    });

    this.client.on("moveUp", function(data) {
      game.moveUp(false, data.playerVector);
    });

    this.client.on("moveRight", function(data) {
      game.moveRight(false, data.playerVector);
    });

    this.client.on("moveDown", function(data) {
      game.moveDown(false, data.playerVector);
    });
  }

  createBlock(x, y) {
    this.client.emit("createBlock", { posX: x, posY: y });
  }

  createLongerBlock(playerId) {
    this.client.emit("createLongerBlock", { playerId: playerId });
  }

  rotateBlock(playerId) {
    this.client.emit("rotateBlock", { playerId: playerId });
  }

  changeColor(playerId) {
    this.client.emit("changeColor", { playerId: playerId });
  }

  getPlayers() {
    this.client.emit("getPlayers");
  }

  setBlock(playerId, blockVector) {
    this.client.emit("setBlock", {
      playerId: playerId,
      blockVector: blockVector
    });
  }

  moveLeft(playerId) {
    this.client.emit("moveLeft", { playerId: playerId });
  }

  moveUp(playerId) {
    this.client.emit("moveUp", { playerId: playerId });
  }

  moveRight(playerId) {
    this.client.emit("moveRight", { playerId: playerId });
  }

  moveDown(playerId) {
    this.client.emit("moveDown", { playerId: playerId });
  }
}
