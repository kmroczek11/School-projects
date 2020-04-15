class Model {
  constructor() {
    this.container = new THREE.Object3D();
    this.mixer = null;
    this.meshModel = null;
  }

  loadModel(url, callback) {
    var loader = new THREE.JSONLoader();

    loader.load(
      url,
      function(geometry) {
        // ładowanie modelu jak poprzednio
        this.meshModel = new THREE.Mesh(geometry, settings.modelMaterial);
        this.meshModel.name = "commando";
        this.meshModel.rotation.y = Math.PI; // ustaw obrót modelu
        this.meshModel.position.y = 30; // ustaw pozycje modelu
        this.meshModel.scale.set(1 / 2, 1 / 2, 1 / 2); // ustaw skalę modelu

        //utworzenie mixera jak poprzednio
        this.mixer = new THREE.AnimationMixer(this.meshModel);

        //dodanie modelu do kontenera

        this.container.add(this.meshModel);

        // zwrócenie kontenera

        this.axes = new THREE.AxesHelper(100); // osie konieczne do kontroli kierunku ruchu

        this.axes.rotation.y = (Math.PI / 2) * 3;

        this.axes.visible = false

        this.meshModel.add(this.axes);

        // for (var i = 0; i < geometry.animations.length; i++) {
        //   console.log(geometry.animations[i].name);
        // }

        callback(this.container);
      }.bind(this)
    );
  }

  getPlayerCont() {
    return this.container;
  }

  getPlayerMesh() {
    return this.meshModel;
  }

  // update mixera

  updateModel(delta) {
    if (this.mixer) this.mixer.update(delta);
  }

  //animowanie postaci

  run() {
    this.mixer.clipAction("run").play();
  }

  halt() {
    this.mixer.uncacheAction("run");
  }

  stand() {
    this.mixer.clipAction("stand").play();
  }
}
