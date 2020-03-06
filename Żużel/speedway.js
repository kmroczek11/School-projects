class Speedway {
  constructor(id, up, down, color, x1, y1, graphics) {
    this.id = id;
    this.alfa = 0;
    this.up = up;
    this.down = down;
    this.color = color;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = null;
    this.y2 = null;
    this.dx = null;
    this.dy = null;
    this.speedwayTrack = new Path2D();
    this.crashed = false;
    this.graphics = graphics;
    this.laps = 0;
    this.imageCanvas = document.createElement("canvas");
    this.imageCtx = this.imageCanvas.getContext("2d");
    this.imageCanvas.setAttribute("id", "imageCanvas");
    this.imageCanvas.setAttribute("width", "1000");
    this.imageCanvas.setAttribute("height", "600");
    document.body.append(this.imageCanvas);
    this.init();
  }

  init() {
    this.speedwayTrack.moveTo(this.x1, this.y1);
    document.body.append(this.imageCanvas);
  }

  drive() {
    this.dx = settings.R * Math.cos(this.convert(this.alfa)); //wspórzędna x po przesunięciu
    this.dy = settings.R * Math.sin(this.convert(this.alfa)); //wspórzędna y po przesunięciu
    this.x2 = this.x1 + this.dx;
    this.y2 = this.y1 + this.dy;
    this.speedwayTrack.lineTo(this.x2, this.y2);
    this.x1 = this.x2;
    this.y1 = this.y2;
    this.speedwayTrack.arcTo(this.x1, this.y1, this.x2, this.y2, this.alfa);
    this.imageCtx.clearRect(
      0,
      0,
      this.imageCanvas.width,
      this.imageCanvas.height
    );
    this.imageCtx.drawImage(this.graphics, this.x2 - 20, this.y2 - 20, 40, 40);
    this.graphics.style.transform = "rotate(" + this.alfa + "deg)";
    console.log(this.graphics);
    game.lineCtx.stroke(this.speedwayTrack);
    if (
      game.lineCtx.isPointInPath(settings.audiencePath, this.x2, this.y2) ||
      !game.lineCtx.isPointInPath(settings.bandsPath, this.x2, this.y2)
    ) {
      this.crashed = true;
    }
    if (game.lineCtx.isPointInPath(settings.finishLine, this.x2, this.y2)) {
      this.laps++;
      var lapsLeft = settings.laps - this.laps;
      document.getElementById(this.id).children[1].innerHTML =
        "Pozostało " + lapsLeft + " okrążeń";
      if (lapsLeft == 0) {
        this.displayAlert(this.color);
      }
    }
  }

  remove() {
    console.log("Speedwaye przed usunięciem: ", game.speedways);
    for (let i = 0; i < game.speedways.length; i++) {
      console.log(game.speedways[i]);
      if (game.speedways[i].id == this.id) {
        game.speedways.splice(i, 1);
        console.log("Speedwaye pozostałe w grze: ", game.speedways);
        if (game.speedways.length == 1) {
          clearInterval(game.rally);
          this.displayAlert(game.speedways[0].color);
        }
      }
    }
  }

  displayAlert(color) {
    var alert = document.createElement("div");
    alert.setAttribute("id", "alert");
    alert.innerHTML =
      "<p>Wygrywa</p><div style='background:" +
      color +
      ";width:50px;height:25px;margin:20px'></div>";
    document.body.appendChild(alert);
    clearInterval(game.rally);
    game.resetAll();
  }

  convert(degrees) {
    return (Math.PI / 180) * degrees;
  }
}
