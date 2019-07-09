var radius = 50; // zmienna wielkość hexagona, a tym samym całego labiryntu

var settings = {
  platformGeometry: new THREE.PlaneGeometry(1200, 1200, 50, 50),

  platformMaterial: new THREE.MeshBasicMaterial({
    color: 0xd3d3d3,
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load("../gfx/desert.jpg")
  }),

  wallGeometry: new THREE.BoxGeometry(
    (2 * Math.sqrt(3) * radius) / 3,
    radius,
    1
  ),

  wallMaterial: new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load("../gfx/wall.jpg")
  }),

  lightWallMaterial: new THREE.MeshPhongMaterial({
    color: 0xaaaaaa,
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load("../gfx/wall.jpg")
  }),

  lightGeometry: new THREE.BoxGeometry(20, 20, 20),

  lightMaterial: new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
    wireframe: true
  }),

  itemGeometry: new THREE.BoxGeometry(30, 30, 30),

  itemMaterial: new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load("../gfx/item.jpg")
  }),

  doorGeometry: new THREE.BoxGeometry(
    (2 * Math.sqrt(3) * radius) / 9,
    radius,
    1
  ),

  playerMaterial: new THREE.MeshBasicMaterial({
    color: 0xd3d3d3,
    side: THREE.DoubleSide
  }),

  playerGeometry: new THREE.BoxGeometry(20, 20, 20),

  baitMaterial: new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  }),

  baitGeometry: new THREE.SphereGeometry(10, 20, 20),

  modelMaterial: new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../mats/waste.png"),
    morphTargets: true // ta własność odpowiada za animację materiału modelu
  })
};
