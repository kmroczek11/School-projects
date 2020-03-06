class Ui {
  constructor() {
    console.log("Konstruktor klasy Ui.");
    this.layout();
    this.clicks();
  }

  layout() {
    var overlay = $("<div>");
    overlay.addClass("overlay");
    overlay.appendTo("body");

    var statusBar = $("<div>");
    statusBar.addClass("statusBar");
    $("body").append(statusBar);

    var status = $("<p>");
    status.addClass("status");
    status.html("STATUS");
    statusBar.append(status);

    var boxToLogin = $("<div>");
    boxToLogin.addClass("boxToLogin");
    overlay.append(boxToLogin);

    var loginP = $("<p>");
    loginP.addClass("loginP");
    loginP.html("LOGOWANIE");
    boxToLogin.append(loginP);

    var nickname = $("<input>");
    nickname.addClass("nickname");
    boxToLogin.append(nickname);

    var login = $("<button>");
    login.addClass("login");
    login.html("LOGUJ");
    boxToLogin.append(login);

    var reset = $("<button>");
    reset.addClass("reset");
    reset.html("RESET");
    boxToLogin.append(reset);

    var waitProgress = $("<div>");
    waitProgress.addClass("wait");
    waitProgress.html("Czekaj na drugiego gracza...");
    var loading = $("<img>");
    loading.addClass("loading");
    loading.attr("src", "../gfx/loading.gif");
    waitProgress.append(loading);

    overlay.append(waitProgress);
  }

  clicks() {
    $(".login").click(function() {
      var login = $(".nickname").val();
      net.action("ADD_USER", login);
    });

    $(".reset").click(function() {
      net.action("RESET", "");
    });
  }

  changeStatus(data) {
    if (data.user != "") {
      var color;
      $(".boxToLogin").remove();
      if (data.color == "white") {
        game.disposeCheckers();
        color = "białymi";
        game.color = "white";
        const wait = setInterval(function() {
          net.waitForPlayer(function(saved) {
            if (saved) {
              $(".overlay").remove();
              game.checkersMoveable();
              clearInterval(wait);
            } else {
              $(".wait").css("display", "flex");
              // console.log("Oczekiwanie na kliencie...");
            }
          });
        }, 500);
      } else {
        game.disposeCheckers();
        color = "czarnymi";
        game.color = "black";
        game.camera.position.set(0, 100, -160);
        game.camera.lookAt(game.scene.position);
        const wait = setInterval(function() {
          net.waitForPlayer(function(saved) {
            // console.log(saved);
            if (saved) {
              $(".overlay").remove();
              game.checkersMoveable();
              clearInterval(wait);
            } else {
              $(".wait").css("display", "flex");
              // console.log("Oczekiwanie na kliencie...");
            }
          });
        }, 500);
      }
      $(".status").html(
        data.action + "<br/>" + "Witaj " + data.user + "! Grasz " + color + "."
      );
    } else {
      $(".status").html(data.action);
    }
  }
}
