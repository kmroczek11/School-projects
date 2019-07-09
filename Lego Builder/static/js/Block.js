class Block extends THREE.Object3D {
  constructor() {
    super();
    this.currentRotation = 0;
    var firstBlockEnding = new THREE.Mesh(settings.endingGeometry);
    var secondBlockEnding = new THREE.Mesh(settings.endingGeometry);
    var thirdBlockEnding = new THREE.Mesh(settings.endingGeometry);
    var fourthBlockEnding = new THREE.Mesh(settings.endingGeometry);
    var block = new THREE.Mesh(settings.blockGeometry);

    firstBlockEnding.position.set(-25, 50, -25)
    secondBlockEnding.position.set(25, 50, -25);
    thirdBlockEnding.position.set(-25, 50, 25);
    fourthBlockEnding.position.set(25, 50, 25);

    // this.axes = new THREE.AxesHelper(200); // osie konieczne do kontroli kierunku ruchu
    // this.add(this.axes);

    this.singleGeometry = new THREE.Geometry();
    this.blockMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide
    });

    firstBlockEnding.updateMatrix(); // bez tego pozycja geometrii jest zawsze 0,0,0
    this.singleGeometry.merge(
      firstBlockEnding.geometry,
      firstBlockEnding.matrix
    );

    secondBlockEnding.updateMatrix();
    this.singleGeometry.merge(
      secondBlockEnding.geometry,
      secondBlockEnding.matrix
    );

    thirdBlockEnding.updateMatrix();
    this.singleGeometry.merge(
      thirdBlockEnding.geometry,
      thirdBlockEnding.matrix
    );

    fourthBlockEnding.updateMatrix();
    this.singleGeometry.merge(
      fourthBlockEnding.geometry,
      fourthBlockEnding.matrix
    );

    this.singleGeometry.merge(block.geometry, block.matrix);

    this.singleMesh = new THREE.Mesh(this.singleGeometry, this.blockMaterial);

    this.singleMesh.name = "block";
    this.name = "blockCont";
    this.position.y = 51;
    this.add(this.singleMesh);

    return this;
    // budowa elementów klocka (prostopadłościan i odpowiednia ilość cylindrów)
  }

  set materialColor(color) {
    this.singleMesh.material.color.setHex(color);
  }
}
