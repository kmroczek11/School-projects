var main3d;
var hex3d;
$(document).ready(function() {
  main3d = new Main3D();
});

class Main3D {
  constructor() {
    console.log("Konstruktor klasy Main3D");
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.createScene();
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      $(window).width() / $(window).height(),
      0.1,
      10000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x007fff);
    this.renderer.setSize($(window).width(), $(window).height());
    $("#root").append(this.renderer.domElement);
    //var axes = new THREE.AxesHelper(1000);
    //this.scene.add(axes);
    this.camera.position.set(-150, 150, 0);
    this.camera.lookAt(this.scene.position);
    this.render();
    var orbitControl = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    orbitControl.addEventListener("change", function() {
      main3d.renderer.render(main3d.scene, main3d.camera);
    });

    var platform = new THREE.Mesh(
      settings.platformGeometry,
      settings.platformMaterial
    );
    platform.rotation.x = Math.PI / 2;
    this.scene.add(platform);
    hex3d = new Hex3D(2, 5, "wall");
    this.scene.add(hex3d);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}
