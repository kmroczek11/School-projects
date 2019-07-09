class Game {
  constructor() {
    console.log("Konstruktor klasy Game");
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.raycaster = null;
    this.mouseVector = null;
    this.stats = null;
    this.angle = 0;
    this.colors = [0xff0000, 0x00ff00, 0x0000ff];
    this.selectedColor = 0;
    this.yourBlock = null;
    this.longerBlock = new THREE.Object3D();
    this.map = {};
    this.playerId = null;
    this.players = null;
    this.createScene();
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      0, // minimalny zasięg musi być >= 0
      10000
    );
    this.camera.position.set(1000, 1000, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0xffffff);
    this.renderer.setSize($(window).width(), $(window).height());
    $("#root").append(this.renderer.domElement);
    // var axes = new THREE.AxesHelper(1000);
    // this.scene.add(axes);
    this.camera.lookAt(this.scene.position);

    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);

    this.render();

    // var orbitControl = new THREE.OrbitControls(
    //   this.camera,
    //   this.renderer.domElement
    // );
    // orbitControl.addEventListener("change", function() {
    //   game.renderer.render(game.scene, game.camera);
    // });

    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector2();

    $(window).on("resize", function() {
      game.camera.aspect = window.innerWidth / window.innerHeight;
      game.camera.updateProjectionMatrix();
      game.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    $(document).mousedown(function(event) {
      console.log(
        "Na tym na który kliknąłem x i y",
        event.clientX,
        event.clientY
      );
      game.createBlock(event.clientX, event.clientY, true);
    });

    onkeydown = onkeyup = function(e) {
      game.action(e);
    };

    var upDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    upDirectionalLight.position.set(0, 1, 0);
    this.scene.add(upDirectionalLight);
    var leftDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    leftDirectionalLight.position.set(1, 0, 0);
    this.scene.add(leftDirectionalLight);
    var rightDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rightDirectionalLight.position.set(0, 0, 1);
    this.scene.add(rightDirectionalLight);
    var mRightDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mRightDirectionalLight.position.set(0, 0, -1);
    this.scene.add(mRightDirectionalLight);
    var mLeftDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    mLeftDirectionalLight.position.set(-1, 0, 0);
    this.scene.add(mLeftDirectionalLight);
    this.createPlane(16);
  }

  render() {
    this.stats.begin();
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.render.bind(this));
    this.stats.end();
  }

  action(e) {
    e = e || event;
    game.map[e.keyCode] = e.type == "keydown";
    if (game.map[87]) {
      game.camera.position.y += 20;
    } else if (game.map[83]) {
      game.camera.position.y -= 20;
    } else if (game.map[65]) {
      game.angle -= 5;
      game.camera.position.z = 200 * Math.cos(game.angle);
      game.camera.position.x = 200 * Math.sin(game.angle);
      game.camera.lookAt(game.scene.position);
    } else if (game.map[68]) {
      game.angle += 5;
      game.camera.position.z = 200 * Math.cos(game.angle);
      game.camera.position.x = 200 * Math.sin(game.angle);
      game.camera.lookAt(game.scene.position);
    } else if (game.map[27]) {
      this.changeColor(true, null, null);
    } else if (game.map[37]) {
      this.moveLeft(true, null);
    } else if (game.map[38]) {
      this.moveUp(true, null);
    } else if (game.map[39]) {
      this.moveRight(true, null);
    } else if (game.map[40]) {
      this.moveDown(true, null);
    } else if (game.map[17] && game.map[32]) {
      this.createLongerBlock(true, null, null);
    } else if (game.map[32]) {
      this.rotateBlock(true, null);
    }
  }

  moveLeft(calledByPlayer, playerVector) {
    if (calledByPlayer) {
      console.log("Rusz w lewo");
      this.yourBlock.position.x -= 100;
      net.moveLeft(this.playerId);
      let blockVector = this.getBlockVector(this.yourBlock);
      net.setBlock(this.playerId, blockVector);
      net.getPlayers();
    } else {
      game.raycaster.setFromCamera(playerVector, game.camera);
      var intersects = game.raycaster.intersectObjects(
        this.scene.children,
        true
      );
      if (intersects.length > 0) {
        var anotherPlayersBlock = intersects[0].object;

        if (anotherPlayersBlock.parent.parent.name == "longerBlock") {
          anotherPlayersBlock = anotherPlayersBlock.parent.parent;
        } else if (anotherPlayersBlock.parent.name == "blockCont") {
          anotherPlayersBlock = anotherPlayersBlock.parent;
        }

        anotherPlayersBlock.position.x -= 100;
      }
    }
  }

  moveUp(calledByPlayer, playerVector) {
    if (calledByPlayer) {
      console.log("Rusz w górę");
      this.yourBlock.position.z -= 100;
      net.moveUp(this.playerId);
      let blockVector = this.getBlockVector(this.yourBlock);
      net.setBlock(this.playerId, blockVector);
      net.getPlayers();
    } else {
      game.raycaster.setFromCamera(playerVector, game.camera);
      var intersects = game.raycaster.intersectObjects(
        this.scene.children,
        true
      );
      if (intersects.length > 0) {
        var anotherPlayersBlock = intersects[0].object;

        if (anotherPlayersBlock.parent.parent.name == "longerBlock") {
          anotherPlayersBlock = anotherPlayersBlock.parent.parent;
        } else if (anotherPlayersBlock.parent.name == "blockCont") {
          anotherPlayersBlock = anotherPlayersBlock.parent;
        }

        anotherPlayersBlock.position.z -= 100;
      }
    }
  }

  moveRight(calledByPlayer, playerVector) {
    if (calledByPlayer) {
      console.log("Rusz w prawo");
      this.yourBlock.position.x += 100;
      net.moveRight(this.playerId);
      let blockVector = this.getBlockVector(this.yourBlock);
      net.setBlock(this.playerId, blockVector);
      net.getPlayers();
    } else {
      game.raycaster.setFromCamera(playerVector, game.camera);
      var intersects = game.raycaster.intersectObjects(
        this.scene.children,
        true
      );
      if (intersects.length > 0) {
        var anotherPlayersBlock = intersects[0].object;

        if (anotherPlayersBlock.parent.parent.name == "longerBlock") {
          anotherPlayersBlock = anotherPlayersBlock.parent.parent;
        } else if (anotherPlayersBlock.parent.name == "blockCont") {
          anotherPlayersBlock = anotherPlayersBlock.parent;
        }

        anotherPlayersBlock.position.x += 100;
      }
    }
  }

  moveDown(calledByPlayer, playerVector) {
    if (calledByPlayer) {
      console.log("Rusz w dół");
      this.yourBlock.position.z += 100;
      net.moveDown(this.playerId);
      let blockVector = this.getBlockVector(this.yourBlock);
      net.setBlock(this.playerId, blockVector);
      net.getPlayers();
    } else {
      game.raycaster.setFromCamera(playerVector, game.camera);
      var intersects = game.raycaster.intersectObjects(
        this.scene.children,
        true
      );
      if (intersects.length > 0) {
        var anotherPlayersBlock = intersects[0].object;

        if (anotherPlayersBlock.parent.parent.name == "longerBlock") {
          anotherPlayersBlock = anotherPlayersBlock.parent.parent;
        } else if (anotherPlayersBlock.parent.name == "blockCont") {
          anotherPlayersBlock = anotherPlayersBlock.parent;
        }

        anotherPlayersBlock.position.z += 100;
      }
    }
  }

  createLongerBlock(calledByPlayer, playerVector, currentColor) {
    console.log("Obecny blok przed zmianą w dłuższy", this.yourBlock);
    if (calledByPlayer) {
      var longerBlock = new LongerBlock(
        this.yourBlock,
        this.yourBlock.name,
        this.colors[this.selectedColor]
      );
      if (this.yourBlock.currentRotation == 0) {
        longerBlock.rotation.y = 0;
      } else {
        for (let i = 0; i < this.yourBlock.currentRotation; i++) {
          longerBlock.rotation.y += Math.PI / 2;
        }
      }

      longerBlock.currentRotation = this.yourBlock.currentRotation;

      game.scene.remove(this.yourBlock);
      this.yourBlock = longerBlock;
      game.scene.add(longerBlock);

      net.createLongerBlock(this.playerId);
    } else {
      console.log("Otrzymany wektor elementu:", playerVector);
      console.log("Otrzymany kolor", currentColor);
      game.raycaster.setFromCamera(playerVector, game.camera);
      var intersects = game.raycaster.intersectObjects(
        this.scene.children,
        true
      );
      if (intersects.length > 0) {
        var anotherPlayersBlock = intersects[0].object;

        if (anotherPlayersBlock.parent.parent.name == "longerBlock") {
          anotherPlayersBlock = anotherPlayersBlock.parent.parent;
        } else if (anotherPlayersBlock.parent.name == "blockCont") {
          anotherPlayersBlock = anotherPlayersBlock.parent;
        }

        console.log("Trafiono po stronie gracza", anotherPlayersBlock);

        //tworzenie dłuższego bloku u innego gracza
        var longerBlock = new LongerBlock(
          anotherPlayersBlock,
          anotherPlayersBlock.name,
          this.colors[currentColor] //tu kolor do zmiany
        );
        if (anotherPlayersBlock.currentRotation == 0) {
          longerBlock.rotation.y = 0;
        } else {
          for (let i = 0; i < anotherPlayersBlock.currentRotation; i++) {
            longerBlock.rotation.y += Math.PI / 2;
          }
        }

        longerBlock.currentRotation = anotherPlayersBlock.currentRotation;
        game.scene.remove(anotherPlayersBlock);
        game.scene.add(longerBlock);
      }
    }
  }

  getBlockVector(block) {
    let objVec = new THREE.Vector3();
    block.getWorldPosition(objVec);
    objVec.project(game.camera);
    console.log("Wektor obecnego bloku", objVec);
    return objVec;
  }

  rotateBlock(calledByPlayer, playerVector) {
    if (calledByPlayer) {
      this.yourBlock.rotation.y += Math.PI / 2;
      console.log("Twój blok:", this.yourBlock);
      if (this.yourBlock.name == "longerBlock") {
        this.yourBlock.currentRotation++;
        if (this.yourBlock.currentRotation % 4 == 0)
          this.yourBlock.currentRotation = 0;
      }
    } else {
      console.log("Otrzymany wektor elementu:", playerVector);
      game.raycaster.setFromCamera(playerVector, game.camera);
      var intersects = game.raycaster.intersectObjects(
        this.scene.children,
        true
      );
      if (intersects.length > 0) {
        var anotherPlayersBlock = intersects[0].object;

        if (anotherPlayersBlock.parent.parent.name == "longerBlock") {
          anotherPlayersBlock = anotherPlayersBlock.parent.parent;
        } else if (anotherPlayersBlock.parent.name == "blockCont") {
          anotherPlayersBlock = anotherPlayersBlock.parent;
        }

        console.log("Ma być takie samo jak twój blok: ", anotherPlayersBlock);

        anotherPlayersBlock.rotation.y += Math.PI / 2;
        if (anotherPlayersBlock.name == "longerBlock") {
          anotherPlayersBlock.currentRotation++;
          if (anotherPlayersBlock.currentRotation % 4 == 0)
            anotherPlayersBlock.currentRotation = 0;
        }
      }
    }

    if (calledByPlayer) net.rotateBlock(this.playerId);
  }

  createPlane(val) {
    var x;
    var y = 1;
    var z;
    for (let i = 0; i < val; i++) {
      for (let j = 0; j < val; j++) {
        x = j * 100 - 50 * val;
        z = i * 100 - 50 * val;
        var gridItem = new GridItem();
        gridItem.position.x = x;
        gridItem.position.y = y;
        gridItem.position.z = z;
        this.scene.add(gridItem);
      }
    }
  }

  createBlock(positionX, positionY, clickedByPlayer) {
    console.log("Otrzymany x i y:", positionX, positionY);
    game.mouseVector.x = (positionX / $(window).width()) * 2 - 1;
    game.mouseVector.y = -(positionY / $(window).height()) * 2 + 1;
    game.raycaster.setFromCamera(game.mouseVector, game.camera);
    var intersects = game.raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length > 0) {
      var element = intersects[0].object;
      console.log("Trafiono w", element);
      if (element.name == "planeMesh") {
        var block = new Block();
        block.position.x = element.parent.position.x;
        block.position.z = element.parent.position.z;
        if (clickedByPlayer) {
          //obecny klocek danego gracza
          this.yourBlock = block;
          let blockVector = this.getBlockVector(this.yourBlock);
          net.setBlock(this.playerId, blockVector);
          net.getPlayers();
          this.selectedColor = 0;
        }
        game.scene.add(block);
        net.createBlock(element);
      } else if (element.name == "block") {
        var block = new Block();
        block.position.x = element.parent.position.x;
        block.position.z = element.parent.position.z;
        block.position.y = element.parent.position.y + 100;
        if (clickedByPlayer) {
          //obecny klocek danego gracza
          this.yourBlock = block;
          let blockVector = this.getBlockVector(this.yourBlock);
          net.setBlock(this.playerId, blockVector);
          net.getPlayers();
          this.selectedColor = 0;
        }
        game.scene.add(block);
      } else {
        var order = parseInt(element.name.split("_")[1]);
        var block = new Block();
        switch (element.parent.parent.currentRotation) {
          case 0:
            var x = element.parent.parent.position.x + order * 100;
            var y = element.parent.parent.position.y + 100;
            var z = element.parent.parent.position.z;
            break;
          case 1:
            var x = element.parent.parent.position.x;
            var y = element.parent.parent.position.y + 100;
            var z = element.parent.parent.position.z - order * 100;
            break;
          case 2:
            var x = element.parent.parent.position.x - order * 100;
            var y = element.parent.parent.position.y + 100;
            var z = element.parent.parent.position.z;
            break;
          case 3:
            var x = element.parent.parent.position.x;
            var y = element.parent.parent.position.y + 100;
            var z = element.parent.parent.position.z + order * 100;
            break;
        }
        block.position.x = x;
        block.position.y = y;
        block.position.z = z;
        if (clickedByPlayer) {
          //obecny klocek danego gracza
          this.yourBlock = block;
          let blockVector = this.getBlockVector(this.yourBlock);
          net.setBlock(this.playerId, blockVector);
          net.getPlayers();
          this.selectedColor = 0;
        }
        game.scene.add(block);
      }
    }
    if (clickedByPlayer) net.createBlock(positionX, positionY);
  }

  changeColor(calledByPlayer, playerVector, currentColor) {
    if (calledByPlayer) {
      console.log("Obecny element do zmiany koloru", this.yourBlock);
      this.selectedColor++;
      if (this.selectedColor > 2) this.selectedColor = 0;
      if (this.yourBlock.name == "blockCont") {
        this.yourBlock.singleMesh.material.color.setHex(
          this.colors[this.selectedColor]
        );
      } else if (this.yourBlock.name == "longerBlock") {
        for (let i = 0; i < this.yourBlock.children.length; i++) {
          this.yourBlock.children[i].singleMesh.material.color.setHex(
            this.colors[this.selectedColor]
          );
        }
      }
    } else {
      console.log("Otrzymany wektor elementu:", playerVector);
      game.raycaster.setFromCamera(playerVector, game.camera);
      var intersects = game.raycaster.intersectObjects(
        this.scene.children,
        true
      );
      if (intersects.length > 0) {
        var anotherPlayersBlock = intersects[0].object;

        if (anotherPlayersBlock.parent.parent.name == "longerBlock") {
          anotherPlayersBlock = anotherPlayersBlock.parent.parent;
        } else if (anotherPlayersBlock.parent.name == "blockCont") {
          anotherPlayersBlock = anotherPlayersBlock.parent;
        }

        console.log("Element do zmiany koloru ", anotherPlayersBlock);
        if (anotherPlayersBlock.name == "blockCont") {
          anotherPlayersBlock.singleMesh.material.color.setHex(
            this.colors[currentColor]
          );
        } else if (anotherPlayersBlock.name == "longerBlock") {
          for (let i = 0; i < anotherPlayersBlock.children.length; i++) {
            anotherPlayersBlock.children[i].singleMesh.material.color.setHex(
              this.colors[currentColor]
            );
          }
        }
      }
    }
    if (calledByPlayer) net.changeColor(this.playerId);
  }
}
