var doors3d;
class Hex3D {
  constructor(doors1, doors2, type) {
    // console.log("Konstruktor klasy Hex.");

    var container = new THREE.Object3D(); // kontener na obiekty 3D

    var floorGeometry = new THREE.CylinderGeometry(
      (2 * Math.sqrt(3) * radius) / 3,
      (2 * Math.sqrt(3) * radius) / 3,
      5,
      6
    );

    var x = null;
    var y = null;
    var z = null;
    var wall;
    var floor;

    if (type == "wall" || type == "treasure") {
      wall = new THREE.Mesh(settings.wallGeometry, settings.wallMaterial);
      floor = new THREE.Mesh(floorGeometry, settings.wallMaterial);
    } else if (type == "light") {
      wall = new THREE.Mesh(settings.wallGeometry, settings.lightWallMaterial);
      floor = new THREE.Mesh(floorGeometry, settings.lightWallMaterial);
    }
    for (var i = 0; i < 6; i++) {
      var angle = (-i * Math.PI) / 3;
      x = Math.sin(angle) * radius;
      y = radius / 2 + 0.5;
      z = Math.cos(angle) * radius;
      if (i != doors1 && i != doors2) {
        var side = wall.clone();
        side.position.x = x;
        side.position.y = y;
        side.position.z = z;
        side.rotation.y = angle;
        container.add(side);
      } else {
        doors3d = new Doors3D(type);
        doors3d.position.x = x;
        doors3d.position.y = y;
        doors3d.position.z = z;
        doors3d.rotation.y = angle;
        container.add(doors3d);
      }
    }
    floor.position.y = 3;
    floor.rotation.y = Math.PI / 6;
    container.add(floor);
    return container;
  }
}
