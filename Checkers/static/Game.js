class Game {
  constructor() {
    console.log("Konstruktor klasy Game.");
    this.checkerboard = [
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1]
    ];
    this.checkers = [
      [0, 2, 0, 2, 0, 2, 0, 2],
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0]
    ];
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.color = null;
    this.selectedChecker = null;
    this.createScene();
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      $(window).width() / $(window).height(),
      0.1,
      10000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize($(window).width(), $(window).height());
    $("#root").append(this.renderer.domElement);
    var axes = new THREE.AxesHelper(1000);
    this.scene.add(axes);
    this.camera.position.set(0, 100, 200);
    this.camera.lookAt(this.scene.position);

    var orbitControl = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    orbitControl.addEventListener("change", function() {
      game.renderer.render(game.scene, game.camera);
    });

    $(window).on("resize", function() {
      game.camera.aspect = window.innerWidth / window.innerHeight;
      game.camera.updateProjectionMatrix();
      game.renderer.setSize(window.innerWidth, window.innerHeight);
    });
    this.createBoard();
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }

  createBoard() {
    var x = -70;
    var y = 0;
    var z = -60;
    var name;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        var fieldGeometry = new THREE.BoxGeometry(20, 10, 20);
        if (this.checkerboard[i][j] == 0) {
          var fieldMaterial = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("gfx/black.jpg"),
            side: THREE.DoubleSide
          });
          name = "blackField";
        } else {
          var fieldMaterial = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("gfx/white.jpg"),
            side: THREE.DoubleSide
          });
          name = "whiteField";
        }
        var field = new THREE.Mesh(fieldGeometry, fieldMaterial);
        field.position.set(x, y, z);
        field.name = name;
        this.scene.add(field);
        x += 20;
      }
      x = -70;
      z += 20;
    }
  }

  disposeCheckers() {
    var x = -70;
    var y = 5;
    var z = -60;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        var checker = new Checker();
        if (this.checkers[i][j] == 2) {
          checker.checkerMaterial = "gfx/black2.jpg";
          checker.position.set(x, y, z);
          checker.name = "black";
          this.scene.add(checker);
        }
        if (this.checkers[i][j] == 1) {
          checker.checkerMaterial = "gfx/white2.jpg";
          checker.position.set(x, y, z);
          checker.name = "white";
          this.scene.add(checker);
        }
        x += 20;
      }
      x = -70;
      z += 20;
    }
  }

  checkersMoveable() {
    var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2(); // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D
    $(document).mousedown(function(event) {
      mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
      mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
      raycaster.setFromCamera(mouseVector, game.camera);
      var intersects = raycaster.intersectObjects(game.scene.children);
      if (intersects.length > 0) {
        if (intersects[0].object.name == game.color) {
          console.log("Właściwy pionek");
          if (game.selectedChecker != null)
            game.selectedChecker.material.color.setHex(0xffffff);
          game.selectedChecker = intersects[0].object;
          if (game.selectedChecker.name == "white")
            game.selectedChecker.material.color.setHex(0xffff00);
          else game.selectedChecker.material.color.setHex(0x808080);
          console.log(game.selectedChecker.name);
        } else if (intersects[0].object.name == "blackField") {
          if (game.selectedChecker != null) {
            game.selectedChecker.position.x = intersects[0].object.position.x;
            game.selectedChecker.position.z = intersects[0].object.position.z;
          }
        }
      }
    });
  }
}
