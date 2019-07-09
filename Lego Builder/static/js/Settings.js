var settings = {
  lineGeometry: new THREE.Geometry(),

  lineMaterial: new THREE.LineBasicMaterial({ color: 0x000000 }),

  planeGeometry: new THREE.PlaneGeometry(100, 100),

  planeMaterial: new THREE.MeshBasicMaterial({
    color: 0xd3d3d3,
    side: THREE.DoubleSide
  }),

  blockGeometry: new THREE.BoxGeometry(100, 100, 100),

  // endingMaterial: new THREE.MeshBasicMaterial({
  //   color: 0x0000ff,
  //   side: THREE.DoubleSide
  // }),

  endingGeometry: new THREE.CylinderGeometry(10, 10, 10)
};
