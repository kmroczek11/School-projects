// class GridItem extends THREE.Mesh {
class GridItem extends THREE.Object3D {
  constructor() {
    // super(
    //   settings.planeGeometry,
    //   new THREE.MeshBasicMaterial({ visible: false })
    // );
    super();
    settings.lineGeometry.vertices.push(new THREE.Vector3(-50, 0, -50));
    settings.lineGeometry.vertices.push(new THREE.Vector3(-50, 0, 50));
    settings.lineGeometry.vertices.push(new THREE.Vector3(50, 0, 50));
    settings.lineGeometry.vertices.push(new THREE.Vector3(50, 0, -50));

    this.line = new THREE.Line(settings.lineGeometry, settings.lineMaterial);
    this.plane = new THREE.Mesh(settings.planeGeometry, settings.planeMaterial);

    this.plane.name = "planeMesh";

    this.plane.rotation.x = Math.PI / 2;
    this.line.position.y = 1;

    this.name = "gridObject";
    this.add(this.plane);
    this.add(this.line);
  }
}
