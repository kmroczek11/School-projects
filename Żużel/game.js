var game;
document.addEventListener("DOMContentLoaded", function(event) {
  game = new Game();
});

class Game {
  constructor() {
    this.rally = null;
    this.speedways = [];
    this.map = {};
    this.spdGrp = null;
    this.lineCtx = null;
    this.lineCtx = null;
    this.createPanel();
    this.init();
    this.initialized = false;
  }

  init() {
    this.lineCanvas = document.createElement("canvas");
    this.lineCanvas.setAttribute("id", "lineCanvas");
    this.lineCanvas.setAttribute("width", "1000");
    this.lineCanvas.setAttribute("height", "600");
    document.body.append(this.lineCanvas);
    this.lineCtx = this.lineCanvas.getContext("2d");
    settings.speedwayGrp.src = "gbt.png";
    settings.speedwayGrp.onload = function() {
      game.spdGrp = settings.speedwayGrp;
      settings.grass.src = "grass.jpg";
      settings.grass.onload = function() {
        game.createBands(settings.grass);
      };
    };
  }

  createFinishLine() {
    this.lineCtx.strokeStyle = "#ffffff";
    this.lineCtx.lineWidth = 1;
    settings.finishLine.moveTo(500, 400);
    settings.finishLine.rect(500, 400, 1, 196);
    settings.finishLine.closePath();
    this.lineCtx.stroke(settings.finishLine);
    settings.audience.src = "audience.jpg";
    settings.audience.onload = function() {
      game.createAudience(settings.audience);
    };
  }

  createBands(grass) {
    let pattern = this.lineCtx.createPattern(grass, "repeat");
    this.lineCtx.fillStyle = pattern;
    this.lineCtx.fillRect(0, 0, this.lineCanvas.width, this.lineCanvas.height);
    this.lineCtx.lineWidth = 5;
    settings.bandsPath.moveTo(300, 0);
    settings.bandsPath.lineTo(700, 0);
    settings.bandsPath.arc(700, 300, 300, 1.5 * Math.PI, 0.5 * Math.PI);
    settings.bandsPath.lineTo(300, 600);
    settings.bandsPath.arc(300, 300, 300, 0.5 * Math.PI, 1.5 * Math.PI);
    settings.bandsPath.closePath();
    this.lineCtx.fillStyle = "rgb(144,108,63)";
    this.lineCtx.fill(settings.bandsPath);
    this.lineCtx.stroke(settings.bandsPath);
    this.createFinishLine();
  }

  createAudience(audience) {
    this.lineCtx.strokeStyle = "#000000";
    this.lineCtx.beginPath();
    this.lineCtx.lineWidth = 5;
    settings.audiencePath.moveTo(300, 200);
    settings.audiencePath.lineTo(700, 200);
    settings.audiencePath.arc(700, 300, 100, 1.5 * Math.PI, 0.5 * Math.PI);
    settings.audiencePath.lineTo(300, 400);
    settings.audiencePath.arc(300, 300, 100, 0.5 * Math.PI, 1.5 * Math.PI);
    settings.audiencePath.closePath();
    let pattern = this.lineCtx.createPattern(audience, "repeat");
    this.lineCtx.fillStyle = pattern;
    this.lineCtx.fill(settings.audiencePath);
    this.lineCtx.stroke(settings.audiencePath);
    this.createControlButtons();
  }

  startRace() {
    this.lineCtx.lineWidth = 5;
    this.rally = setInterval(() => {
      for (let i = 0; i < this.speedways.length; i++) {
        this.lineCtx.strokeStyle = this.speedways[i].color;
        if (!this.speedways[i].crashed) this.speedways[i].drive();
        else this.speedways[i].remove();
      }
    }, 0.05);

    onkeydown = onkeyup = function(e) {
      e = e || event;
      game.map[e.keyCode] = e.type == "keydown";
      for (let i = 0; i < game.speedways.length; i++) {
        let upCode = game.getKeyCode(game.speedways[i].up);
        let downCode = game.getKeyCode(game.speedways[i].down);
        console.log("Kod ustawionego buttona w górę", upCode);
        if (game.map[upCode]) {
          game.speedways[i].alfa -= 2;
          if (game.speedways[i].alfa < 0) {
            game.speedways[i].alfa += 360;
          }
        }
        if (game.map[downCode]) {
          game.speedways[i].alfa += 2;
        }
      }
    };
  }

  createControlButtons() {
    var startBt = document.createElement("button");
    startBt.setAttribute("id", "startBt");
    startBt.innerHTML = "Rozpocznij grę";
    startBt.onclick = function() {
      game.createSpeedways();
    };
    document.body.append(startBt);

    var lapsBt = document.createElement("button");
    lapsBt.setAttribute("id", "lapsBt");
    lapsBt.innerHTML = "Ilość okrążeń: 1";
    lapsBt.onclick = function() {
      settings.laps++;
      lapsBt.innerHTML = "Ilość okrążeń: " + settings.laps;
    };
    document.body.append(lapsBt);
    this.createLapsCounter();
  }

  createLapsCounter() {
    var lapsTable = document.createElement("table");
    lapsTable.setAttribute("id", "laps");
    lapsTable.setAttribute("border", "2");
    document.body.append(lapsTable);
  }

  getKeyCode(char) {
    var keyCode = char.charCodeAt(0);
    if (keyCode > 90) {
      return keyCode - 32;
    }
    return keyCode;
  }

  createPanel() {
    var panel = document.createElement("table");
    panel.setAttribute("id", "controls");
    for (let i = 0; i < 4; i++) {
      var tr = document.createElement("tr");
      var color = document.createElement("td");
      var colorIn = document.createElement("input");
      colorIn.setAttribute("type", "color");
      color.append(colorIn);
      var upButton = document.createElement("td");
      var upButtonIn = document.createElement("input");
      upButtonIn.setAttribute("type", "text");
      upButtonIn.setAttribute("placeholder", "klawisz w górę");
      upButtonIn.setAttribute("maxlength", "1");
      upButton.append(upButtonIn);
      var downButton = document.createElement("td");
      var downButtonIn = document.createElement("input");
      downButtonIn.setAttribute("type", "text");
      downButtonIn.setAttribute("placeholder", "klawisz w dół");
      downButtonIn.setAttribute("maxlength", "1");
      downButton.append(downButtonIn);
      var isActive = document.createElement("td");
      var isActiveIn = document.createElement("input");
      isActiveIn.setAttribute("type", "checkbox");
      isActiveIn.classList.add("active");
      isActive.append(isActiveIn);
      tr.append(color);
      tr.append(upButton);
      tr.append(downButton);
      tr.append(isActive);
      panel.append(tr);
    }
    document.body.append(panel);
  }

  createSpeedways() {
    var activeSpeedways = document.getElementsByClassName("active");
    var startingX = 501;
    // var startingX = 400;
    var startingY = 450;
    var canPlay = false;
    for (let i = 0; i < activeSpeedways.length; i++) {
      var activeSpeedway = activeSpeedways[i];
      if (activeSpeedway.checked) {
        canPlay = true;
      }
    }

    if (canPlay) {
      for (let i = 0; i < activeSpeedways.length; i++) {
        var activeSpeedway = activeSpeedways[i];
        if (activeSpeedway.checked) {
          var tr = document.getElementsByTagName("tr")[i];
          var color = tr.children[0].firstChild.value;
          var up = tr.children[1].children[0].value;
          var down = tr.children[2].children[0].value;
          var id = i + 1;
          var speedway = new Speedway(
            id,
            up,
            down,
            color,
            startingX,
            startingY,
            game.spdGrp
          );
          game.speedways.push(speedway);
          startingY += 30;
          this.createLapTr(id, color);
        }
      }
      this.startRace();
    } else {
      alert("Najpierw zaznacz aktywnych graczy!");
    }
  }

  createLapTr(id, playerColor) {
    var laps = document.getElementById("laps");
    var tr = document.createElement("tr");
    tr.setAttribute("id", id);
    for (let i = 0; i < 2; i++) {
      var td = document.createElement("td");
      if (i == 0) {
        var color = document.createElement("div");
        color.style.width = "50px";
        color.style.height = "25px";
        color.style.background = playerColor;
        td.appendChild(color);
      } else {
        td.innerHTML = "Pozostało " + settings.laps + " okrążeń";
      }
      tr.appendChild(td);
    }
    laps.appendChild(tr);
  }

  resetAll() {
    var resetBt = document.createElement("button");
    resetBt.setAttribute("id", "resetBt");
    resetBt.innerHTML = "Resetuj";
    game.removeElement("startBt");
    game.removeElement("lapsBt");
    resetBt.onclick = function() {
      game.removeElement("lineCanvas");
      game.removeElement("imageCanvas");
      game.removeElement("alert");
      game.removeElement("laps");
      settings.R = 1.01;
      settings.audiencePath = new Path2D();
      settings.bandsPath = new Path2D();
      settings.finishLine = new Path2D();
      settings.grass = new Image();
      settings.audience = new Image();
      settings.speedwayGrp = new Image();
      settings.laps = 1;
      game.speedways = [];
      game.map = {};
      game.spdGrp = null;
      game.init();
      game.removeElement("resetBt");
    };
    document.body.append(resetBt);
  }

  removeElement(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
  }
}
