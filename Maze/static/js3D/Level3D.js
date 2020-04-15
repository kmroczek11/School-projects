var level3d;
var hex3d;
var ui;
$(document).ready(function() {
  level3d = new Level3D();
  ui = new Ui();
});

class Level3D {
  constructor() {
    console.log("Konstruktor klasy Level3D.");
    $.ajax({
      url: "/getSelectedLevel",
      type: "GET",
      success: function(data) {
        data = parseInt(data);
        level3d.getData(data);
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.lights = [];
    // this.player = null;
    this.model = null;
    this.bait = null;
    this.directionVect = null;
    this.clickedVect = null;
    this.clock = null;
    this.modelReady = false;
    this.createScene();
  }

  getData(id) {
    // pobranie danych levelu ajaxem z serwera
    // i uruchomienie generowania levelu (makeLevel)
    $.ajax({
      url: "/level",
      data: { id: id },
      type: "POST",
      success: function(data) {
        level3d.makeLevel(data);
      },
      error: function(xhr, status, error) {
        console.log(xhr);
      }
    });
  }

  makeLevel(levels) {
    var x;
    var z;
    var type;
    for (let i = 0; i < levels.level.length; i++) {
      type = levels.level[i].type;
      if (levels.level[i].id == 0) {
        var dirOut = levels.level[i].dirIn;
        hex3d = new Hex3D(dirOut, dirOut, type);
      } else if (levels.level[i].id == levels.level.length - 1) {
        var dirIn = levels.level[i - 1].dirOut;
        var dirOut = levels.level[i].dirIn;
        hex3d = new Hex3D(dirIn, dirOut, type);
      } else {
        var dirIn = levels.level[i - 1].dirOut;
        var dirOut = levels.level[i].dirIn;
        hex3d = new Hex3D(dirIn, dirOut, type);
      }
      x = levels.level[i].x * Math.sqrt(3) * radius;
      z = levels.level[i].z * 2 * radius;
      if (levels.level[i].x % 2 == 1) z += radius;
      hex3d.position.x = x;
      hex3d.position.z = z;
      switch (levels.level[i].type) {
        case "light":
          var light = new Light(hex3d).getLight();
          this.scene.add(light);
          this.lights.push(light);
          break;
        case "treasure":
          hex3d.add(new Item());
      }
      this.scene.add(hex3d);
    }
    // tu wygeneruj level (ściany, światła, itemy) na podstawie danych zwracanych z serwera
    // i albo zwróć je do sceny w kontenerze
    // albo wstaw bezpośrednio do sceny, przekazanej w konstruktorze klasy
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
    this.renderer.setClearColor(0x007fff);
    this.renderer.setSize($(window).width(), $(window).height());
    $("#root").append(this.renderer.domElement);
    // var axes = new THREE.AxesHelper(1000);
    // this.scene.add(axes);
    this.camera.position.set(0, 300, 150);
    this.camera.lookAt(this.scene.position);
    this.render();
    var orbitControl = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    orbitControl.addEventListener("change", function() {
      level3d.renderer.render(level3d.scene, level3d.camera);
    });

    //stworzenie podłogi
    var platform = new THREE.Mesh(
      settings.platformGeometry,
      settings.platformMaterial
    );
    platform.rotation.x = Math.PI / 2;
    this.scene.add(platform);

    //stworzenie playera
    // this.player = new Player();
    // this.player.getPlayerCont().position.y = 10;
    // this.scene.add(this.player.getPlayerCont());

    //stworzenie modelu
    this.model = new Model();
    this.model.loadModel("../mats/tris.js", function(modeldata) {
      // console.log("model został załadowany", modeldata);
      level3d.scene.add(modeldata); // data to obiekt kontenera zwrócony z Model.js
      level3d.modelReady = true;
    });

    //wstawiamy kulkę za którą podąża player
    this.bait = new THREE.Mesh(settings.baitGeometry, settings.baitMaterial);
    this.bait.visible = false;
    this.scene.add(this.bait);

    this.clock = new THREE.Clock();

    function playerMovement(event) {
      //stworzenie raycastera
      var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
      level3d.clickedVect = new THREE.Vector3(0, 0, 0); // wektor określający PUNKT kliknięcia
      level3d.directionVect = new THREE.Vector3(0, 0, 0); // wektor określający KIERUNEK ruchu playera
      level3d.clickedVect.x = (event.clientX / $(window).width()) * 2 - 1;
      level3d.clickedVect.y = -(event.clientY / $(window).height()) * 2 + 1;
      raycaster.setFromCamera(level3d.clickedVect, level3d.camera);
      var intersects = raycaster.intersectObjects(level3d.scene.children);

      // console.log("Elementów na scenie:", intersects.length);
      if (intersects.length > 0) {
        level3d.clickedVect = intersects[0].point;

        //obrót playera
        // var angle = Math.atan2(
        //   level3d.player.getPlayerCont().position.clone().x -
        //     level3d.clickedVect.x,
        //   level3d.player.getPlayerCont().position.clone().z -
        //     level3d.clickedVect.z
        // );

        var angle = Math.atan2(
          level3d.model.getPlayerCont().position.clone().x -
            level3d.clickedVect.x,
          level3d.model.getPlayerCont().position.clone().z -
            level3d.clickedVect.z
        );

        // level3d.player.getPlayerMesh().rotation.y = angle + Math.PI;
        level3d.model.getPlayerMesh().rotation.y = angle + (Math.PI / 2) * 3;
        // level3d.directionVect = level3d.clickedVect
        //   .clone()
        //   .sub(level3d.player.getPlayerCont().position)
        //   .normalize();

        level3d.directionVect = level3d.clickedVect
          .clone()
          .sub(level3d.model.getPlayerCont().position)
          .normalize();
        // console.log("Kierunkowy wektor:", level3d.directionVect);
        //funkcja normalize() przelicza współrzędne x,y,z wektora na zakres 0-1
        //jest to wymagane przez kolejne funkcje

        //ruch do kulki
        level3d.bait.position.set(
          level3d.clickedVect.x,
          10,
          level3d.clickedVect.z
        );
      }
    }

    $(document).mousedown(function(event) {
      playerMovement(event);
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    // if (this.directionVect != null) {
    //   var distanceToBait = this.player
    //     .getPlayerCont()
    //     .position.clone()
    //     .distanceTo(this.clickedVect);
    //   // console.log("Odległość playera od kulki", distanceToBait);
    //   var distanceToPlayer = this.clickedVect
    //     .clone()
    //     .distanceTo(this.bait.position);
    //   // console.log("Odległość kulki od playera", distanceToPlayer);
    //   if (distanceToBait >= distanceToPlayer) {
    //     this.player.getPlayerCont().translateOnAxis(this.directionVect, 5); // 5 - przewidywany speed
    //   }
    //   this.camera.position.x = this.player.getPlayerCont().position.x;
    //   this.camera.position.z = this.player.getPlayerCont().position.z + 200;
    //   this.camera.position.y = this.player.getPlayerCont().position.y + 200;
    //   this.camera.lookAt(this.player.getPlayerCont().position);
    // }
    if (this.modelReady) {
      this.model.stand();
      var delta = this.clock.getDelta();
      this.model.updateModel(delta);
    }

    if (this.directionVect != null) {
      var distanceToBait = this.model
        .getPlayerCont()
        .position.clone()
        .distanceTo(this.clickedVect);
      // console.log("Odległość playera od kulki", distanceToBait);
      var distanceToPlayer = this.clickedVect
        .clone()
        .distanceTo(this.bait.position);
      // console.log("Odległość kulki od playera", distanceToPlayer);
      if (distanceToBait >= distanceToPlayer) {
        this.model.getPlayerCont().translateOnAxis(this.directionVect, 2); // 5 - przewidywany speed
        this.model.run();
        var delta = this.clock.getDelta();
        // console.log(delta); // zobacz czy widać zmieniającą się liczbę w konsoli
        this.model.updateModel(delta);
      } else {
        this.model.halt();
        this.model.stand();
        var delta = this.clock.getDelta();
        if (this.model.mixer) this.model.mixer.update(delta);
      }
      this.camera.position.x = this.model.getPlayerCont().position.x;
      this.camera.position.z = this.model.getPlayerCont().position.z + 200;
      this.camera.position.y = this.model.getPlayerCont().position.y + 200;
      this.camera.lookAt(this.model.getPlayerCont().position);
    }
    requestAnimationFrame(this.render.bind(this));
  }
}
