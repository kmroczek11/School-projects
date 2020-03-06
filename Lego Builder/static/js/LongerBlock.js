class LongerBlock extends THREE.Object3D {
  constructor(currentBlock, name, color) {
    super();
    this.currentRotation = 0; //rotacja klocka
    var length = currentBlock.children.length;
    var amount = length + 1;

    if (name == "blockCont") {
      var x = 0;
      for (let i = 0; i < amount; i++) {
        var block = new Block();
        block.materialColor = color; //setter do zmiany koloru wszystkich bloczków
        block.position.x = x;
        block.position.y = 0;
        block.position.z = 0;
        x += 100;
        block.singleMesh.name = "block_" + i;
        this.add(block);
      }
      this.position.x = currentBlock.position.x;
      this.position.z = currentBlock.position.z;
      this.position.y = currentBlock.position.y;
      console.log("Pozycja dłuższego klocka", this.position);
    } else {
      var x = 0;
      for (let i = 0; i < amount; i++) {
        var block = new Block();
        block.materialColor = color; //setter do zmiany koloru wszystkich bloczków
        block.position.x = x;
        block.position.y = 0;
        block.position.z = 0;
        x += 100;
        block.singleMesh.name = "block_" + i;
        this.add(block);
      }
      this.position.x = currentBlock.position.x;
      this.position.z = currentBlock.position.z;
      this.position.y = currentBlock.position.y;
      // console.log("Pozycja dłuższego klocka", this.position);
    }
    this.name = "longerBlock";
  }
}
