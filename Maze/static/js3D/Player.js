class Player {
  constructor() {
    this.container = new THREE.Object3D();

    this.player = new THREE.Mesh(
      settings.playerGeometry,
      settings.playerMaterial
    ); // player sześcian

    this.container.add(this.player); // kontener w którym jest player

    // this.axes = new THREE.AxesHelper(100); // osie konieczne do kontroli kierunku ruchu

    //this.player.add(this.axes);
  }

  //funkcja zwracająca kontener

  getPlayerCont() {
    return this.container;
  }

  //funkcja zwracająca playera

  getPlayerMesh() {
    return this.player;
  }
}
