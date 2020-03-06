function findItem(id) {
    console.log(id)
    for (let i = 0; i < items.length; i++) {
        if (items[i][0] == id) {
            return items[i]
        }
    }
}

function addItemToLocation(y, x, id) {
    var item = this.findItem(id)
    game.board[y][x].items.push(item)
    console.log("Dodano przedmiot!")
}

function disperseItems() {
    this.addItemToLocation(0, 2, 31)
    this.addItemToLocation(0, 4, 27)
    this.addItemToLocation(0, 6, 14)
    this.addItemToLocation(1, 2, 10)
    this.addItemToLocation(1, 6, 18)
    this.addItemToLocation(2, 1, 32)
    this.addItemToLocation(3, 3, 21)
    this.addItemToLocation(4, 4, 33)
    this.addItemToLocation(5, 3, 24)

    // this.addItemToLocation(3, 2, 13)
    // this.addItemToLocation(3, 2, 17)
    // this.addItemToLocation(3, 2, 20)
    // this.addItemToLocation(3, 2, 23)
    // this.addItemToLocation(3, 2, 26)

    // var craftedItem = findItem(28)
    // game.hand.push(craftedItem)
}