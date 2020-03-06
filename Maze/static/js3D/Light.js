class Light {
  constructor(hex) {
    this.hex = hex;
    this.light = null;
    this.container = new THREE.Object3D();
    this.init();
  }

  init() {
    // utworzenie i spozycjonowanie światła

    this.light = new THREE.SpotLight(0xffff00, 5, 200, Math.PI / 8);
    this.light.position.set(
      this.hex.position.x,
      this.hex.position.y + 150,
      this.hex.position.z
    );
    // dodanie światła do kontenera
    this.container.add(this.light);

    // nakierowanie na środek hexa
    // this.light.lookAt(this.hex.position);
    console.log(this.hex.position);
    this.light.target.position.set(
      this.hex.position.x,
      this.hex.position.y,
      this.hex.position.z
    );
    this.light.target.updateWorldMatrix();
    // console.log(this.light);

    //utworzenie widzialnego elementu reprezentującego światło (mały sześcian, kula, czworościan foremny, do wyboru)
    this.mesh = new THREE.Mesh(settings.lightGeometry, settings.lightMaterial);

    this.mesh.position.set(
      this.hex.position.x,
      this.hex.position.y + 150,
      this.hex.position.z
    );

    // dodanie go do kontenera
    this.container.add(this.mesh);
    // this.container.add(new THREE.SpotLightHelper(this.light));

    // this.container.position.y = 150;
  }

  // funkcja zwracająca obiekt kontenera
  // czyli nasze światło wraz z bryłą

  getLight() {
    return this.container;
  }
}
