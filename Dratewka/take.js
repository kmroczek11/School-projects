function take(name) {
    var thereIs = false
    var ableToTake = false
    if (currentPosition.items.length != 0) {

        for (let i = 0; i < currentPosition.items.length; i++) {
            if (currentPosition.items[i][3] == name) {
                thereIs = true
                console.log("Lokacja ma ten przedmiot.")
                if (currentPosition.items[i][2] == 1) {//sprawdzenie czy przedmiot ma flagę 1, czyli można go podnieść
                    var item = currentPosition.items[i]
                    ableToTake = true
                    var position = i
                    break
                } else {
                    console.log("Przedmiot z flagą 0.")
                    ableToTake = false
                    break
                }
            }
        }

        if (!thereIs) {
            console.log("Brak przedmiotu.")
            animate = setInterval(function () { animateText1("There isn't anything like that here.") }, 20)//brak przedmiotu na lokacji
        } else {
            if (ableToTake) {
                for (let j = 0; j < game.hand.length; j++) {//sprawdzenie czy w ręce mamy już przedmiot z flagą 1
                    console.log(game.hand[j])
                    if (game.hand[j][2] == 1) {
                        ableToTake = false
                        console.log("Już coś masz.")
                        animate = setInterval(function () { animateText1("You are carrying something.") }, 20)//masz już w ręce przedmiot z flagą 1
                        break
                    }
                }
                if (ableToTake) {
                    var itemName = item[1]
                    animate = setInterval(function () { animateText1("You are taking " + itemName + ".") }, 20)
                    game.hand.push(item)
                    currentPosition.items.splice(position, 1)
                    console.log("Przedmioty pozostałe na lokacji:")
                    console.log(currentPosition.items)
                }
            } else {
                animate = setInterval(function () { animateText1("You can't carry it.") }, 20)//przedmiot na lokacji ma flagę 0
            }
        }
    } else {
        animate = setInterval(function () { animateText1("There is nothing to take here.") }, 20)//brak przedmiotu na lokacji
    }

    console.log("Masz w ręce:")
    console.log(game.hand)

    ///////////////wszystkie przedmioty w ręce////////////////////
    document.getElementById("items").innerHTML = "You carry "

    if (game.hand.length == 0) {
        document.getElementById("items").innerHTML = "You carry nothing."
    } else {
        for (let i = 0; i < game.hand.length; i++) {
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