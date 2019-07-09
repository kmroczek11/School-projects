function drop(name) {
    if (game.hand.length == 0) {
        animate = setInterval(function () { animateText1("You are not carrying anything.") }, 20)//nie masz nic w ręce
    } else {
        var itemsWithFlagOne = 0
        var canDrop = true
        for (let i = 0; i < currentPosition.items.length; i++) {
            if (currentPosition.items[i][2] == 1) {
                itemsWithFlagOne++
                if (itemsWithFlagOne == 3) {
                    animate = setInterval(function () { animateText1("You can't store any more here.") }, 20)//nie masz nic w ręce
                    canDrop = false
                    break
                }
            }
        }

        for (let i = 0; i < game.hand.length; i++) {
            if (game.hand[i][3] == name) {
                console.log("Masz ten przedmiot w ręce.")
                var item = game.hand[i]
                var position = i
                break
            } else {
                canDrop = false
            }
        }

        if (canDrop) {
            console.log(currentPosition.y, currentPosition.x, item[0])
            addItemToLocation(currentPosition.y, currentPosition.x, item[0])
            console.log("Upuszczasz przedmiot.")
            animate = setInterval(function () { animateText1("You are about to drop " + item[1] + ".") }, 20)
            game.hand.splice(position, 1)
        } else {
            animate = setInterval(function () { animateText1("You are not carrying it.") }, 20)
        }

        if (game.hand.length == 0) {
            document.getElementById("items").innerHTML = "You carry nothing."
        } else {
            for (let i = 0; i < game.hand.length; i++) {
                document.getElementById("items").innerHTML = "You carry "
                document.getElementById("items").innerHTML += game.hand[i][1]
                if (i < game.hand.length - 1) {
                    document.getElementById("items").innerHTML += " ,"
                }
                else {
                    document.getElementById("items").innerHTML += "."
                }
            }
        }

        if (currentPosition.items.length == 0) {
            inSight.innerHTML = "You see nothing."
        } else {
            document.getElementById("inSight").innerHTML = "You see "
            for (let i = 0; i < currentPosition.items.length; i++) {
                document.getElementById("inSight").innerHTML += currentPosition.items[i][1]
                if (i < currentPosition.items.length - 1) {
                    document.getElementById("inSight").innerHTML += " ,"
                }
                else {
                    document.getElementById("inSight").innerHTML += "."
                }
            }
        }

    }
}