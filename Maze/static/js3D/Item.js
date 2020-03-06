class Item {
  constructor() {
    var item = new THREE.Mesh(settings.itemGeometry, settings.itemMaterial);
    item.position.y = 18;
    return item;
  }
}
