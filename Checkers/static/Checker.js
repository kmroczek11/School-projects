class Checker extends THREE.Mesh {
  constructor() {
    super();
    this.geometry = new THREE.CylinderGeometry(8, 8, 5, 32);
  }

  set checkerMaterial(val) {
    this.material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(val),
      side: THREE.DoubleSide
    });
  }
}
