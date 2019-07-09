class Doors3D {
  constructor(type) {
    // console.log("Konstruktor klasy Doors.");
    var container = new THREE.Object3D(); // kontener na obiekty 3D
    for (let i = 0; i < 2; i++) {
      if (type == "wall" || type == "treasure")
        var door = new THREE.Mesh(settings.doorGeometry, settings.wallMaterial);
      else if (type == "light")
        var door = new THREE.Mesh(
          settings.doorGeometry,
          settings.lightWallMaterial
        );
      door.position.x = (2 * Math.sqrt(3) * radius) / 9;
      if (i > 0) door.position.x *= -1;
      container.add(door);
    }
    return container;
  }
}
