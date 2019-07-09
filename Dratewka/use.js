function use(name) {
    var canUse = false
    for (let i = 0; i < game.hand.length; i++) {
        if (game.hand[i][3] == name) {
            canUse = true
            var item = game.hand[i]
            var itemID = item[0]
            var position = i
            break
        }
    }

    if (canUse) {
        switch (itemID) {
            case 10:
                if (currentPosition.y == 4 && currentPosition.x == 5) {
                    var craftedItem = findItem(11)
                    game.hand.splice(position, 1)
                    game.hand.push(craftedItem)
                    animate = setInterval(function () { animateText1("You opened a tool shed and took an axe.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 11:
                if (currentPosition.y == 5 && currentPosition.x == 6) {
                    var craftedItem = findItem(12)
                    game.hand.splice(position, 1)
                    game.hand.push(craftedItem)
                    animate = setInterval(function () { animateText1("You cut sticks for sheeplegs.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 12:
                if (currentPosition.y == 3 && currentPosition.x == 2) {
                    var craftedItem = findItem(13)
                    game.hand.splice(position, 1)
                    currentPosition.items.push(craftedItem)
                    game.ok++
                    console.log(game.ok)
                    animate = setInterval(function () { animateText1("You prepared legs for your fake sheep.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 14:
                if (currentPosition.y == 2 && currentPosition.x == 3) {
                    var craftedItem = findItem(15)
                    game.hand.splice(position, 1)
                    game.hand.push(craftedItem)
                    animate = setInterval(function () { animateText1("The tavern owner paid you money.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 15:
                if (currentPosition.y == 2 && currentPosition.x == 6) {
                    var craftedItem = findItem(16)
                    game.hand.splice(position, 1)
                    game.hand.push(craftedItem)
                    animate = setInterval(function () { animateText1("The cooper sold you a new barrel.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 16:
                if (currentPosition.y == 3 && currentPosition.x == 2) {
                    var craftedItem = findItem(17)
                    game.hand.splice(position, 1)
                    currentPosition.items.push(craftedItem)
                    game.ok++
                    console.log(game.ok)
                    animate = setInterval(function () { animateText1("You made a nice sheeptrunk.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 18:
                if (currentPosition.y == 2 && currentPosition.x == 5) {
                    var craftedItem = findItem(19)
                    game.hand.splice(position, 1)
                    game.hand.push(craftedItem)
                    animate = setInterval(function () { animateText1("The butcher gave you wool.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 19:
                if (currentPosition.y == 3 && currentPosition.x == 2) {
                    var craftedItem = findItem(20)
                    game.hand.splice(position, 1)
                    currentPosition.items.push(craftedItem)
                    game.ok++
                    console.log(game.ok)
                    animate = setInterval(function () { animateText1("You prepared skin for your fake sheep.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 21:
                if (currentPosition.y == 4 && currentPosition.x == 6) {
                    var craftedItem = findItem(22)
                    game.hand.splice(position, 1)
                    game.hand.push(craftedItem)
                    animate = setInterval(function () { animateText1("You used your tools to make a rag.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 22:
                if (currentPosition.y == 3 && currentPosition.x == 2) {
                    var craftedItem = findItem(23)
                    game.hand.splice(position, 1)
                    currentPosition.items.push(craftedItem)
                    game.ok++
                    console.log(game.ok)
                    animate = setInterval(function () { animateText1("You made a fake sheephead.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 24:
                if (currentPosition.y == 0 && currentPosition.x == 0) {
                    var craftedItem = findItem(25)
                    game.hand.splice(position, 1)
                    game.hand.push(craftedItem)
                    animate = setInterval(function () {
                        text = "You are digging..."
                        if (length < text.length) {
                            document.getElementById("notifications").innerHTML += text[length]
                            length++
                        } else {
                            length = 0
                            animate = clearInterval(animate)
                            setTimeout(function () {
                                document.getElementById("notifications").innerHTML = ""
                                text = "and digging..."
                                animate = setInterval(function () {
                                    if (length < text.length) {
                                        document.getElementById("notifications").innerHTML += text[length]
                                        length++
                                    } else {
                                        length = 0
                                        animate = clearInterval(animate)
                                        setTimeout(function () {
                                            document.getElementById("notifications").innerHTML = ""
                                            text = "That's enough sulphur for you."
                                            animate = setInterval(function () {
                                                if (length < text.length) {
                                                    document.getElementById("notifications").innerHTML += text[length]
                                                    length++
                                                } else {
                                                    length = 0
                                                    animate = clearInterval(animate)
                                                    setTimeout(function () {
                                                        document.getElementById("notifications").innerHTML = ""
                                                    }, 3000)
                                                }
                                            }, 20)//trzeci tekst
                                        }, 3000)
                                    }
                                }, 20)//drugi tekst
                            }, 3000)
                        }
                    }, 20)//pierwszy tekst
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 25:
                if (currentPosition.y == 3 && currentPosition.x == 2) {
                    var craftedItem = findItem(26)
                    game.hand.splice(position, 1)
                    currentPosition.items.push(craftedItem)
                    game.ok++
                    console.log(game.ok)
                    animate = setInterval(function () { animateText1("You prepared a solid poison.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 27:
                if (currentPosition.y == 1 && currentPosition.x == 0) {
                    var craftedItem = findItem(28)
                    game.hand.splice(position, 1)
                    game.hand.push(craftedItem)
                    animate = setInterval(function () { animateText1("You got a bucket full of tar.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 28:
                if (currentPosition.y == 3 && currentPosition.x == 2) {
                    var craftedItem = findItem(29)
                    game.hand.splice(position, 1)
                    game.hand.push(craftedItem)
                    game.ok++
                    console.log(game.ok)
                    animate = setInterval(function () {
                        animateText2("You prepared a liquid poison.",
                            function () {
                                if (game.ok == 6) {
                                    var craftedItem = findItem(13)
                                    currentPosition.items.splice(position, 1)
                                    var craftedItem = findItem(17)
                                    currentPosition.items.splice(position, 1)
                                    var craftedItem = findItem(20)
                                    currentPosition.items.splice(position, 1)
                                    var craftedItem = findItem(23)
                                    currentPosition.items.splice(position, 1)
                                    var craftedItem = findItem(26)
                                    currentPosition.items.splice(position, 1)
                                    var craftedItem = findItem(28)
                                    currentPosition.items.splice(position, 1)
                                    var craftedItem = findItem(29)
                                    game.hand.splice(position, 1)

                                    var craftedItem = findItem(37)
                                    game.hand.push(craftedItem)

                                    animate = setInterval(function () { animateText1("Your fake sheep is full of poison and ready to be eaten by the dragon.") }, 20)

                                    var itemsBox = document.getElementById("items")
                                    if (game.hand.length == 0) {
                                        itemsBox.innerHTML = "You carry nothing."
                                    }
                                    else {
                                        itemsBox.innerHTML = "You carry "
                                        for (let i = 0; i < game.hand.length; i++) {
                                            itemsBox.innerHTML += game.hand[i][1]
                                            if (i < game.hand.length - 1) {
                                                itemsBox.innerHTML += " ,"
                                            }
                                            else {
                                                itemsBox.innerHTML += "."
                                            }
                                        }
                                    }

                                    if (currentPosition.items.length == 0) {
                                        inSight.innerHTML = "You see nothing."
                                    } else {
                                        console.log("Zmiana tego co widzisz")
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
                        )
                    }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 37:
                if (currentPosition.y == 3 && currentPosition.x == 2) {
                    var craftedItem = findItem(30)
                    game.hand.splice(position, 1)
                    currentPosition.items.push(craftedItem)

                    animate = setInterval(function () {
                        text = "The dragon noticed your gift..."
                        if (length < text.length) {
                            document.getElementById("notifications").innerHTML += text[length]
                            length++
                        } else {
                            length = 0
                            animate = clearInterval(animate)
                            setTimeout(function () {
                                document.getElementById("notifications").innerHTML = ""
                                text = "The dragon ate your sheep and died!"
                                animate = setInterval(function () {
                                    if (length < text.length) {
                                        document.getElementById("notifications").innerHTML += text[length]
                                        length++
                                    } else {
                                        length = 0
                                        animate = clearInterval(animate)
                                        setTimeout(function () {
                                            document.getElementById("notifications").innerHTML = ""
                                        }, 3000)
                                    }
                                }, 20)//drugi tekst
                            }, 3000)
                        }
                    }, 20)//pierwszy tekst
                    document.getElementById("image").src = "Materials/img/DS68.bmp"
                    game.died = true
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 33:
                if (currentPosition.y == 3 && currentPosition.x == 2 && game.died) {
                    var craftedItem = findItem(34)
                    game.hand.splice(position, 1)
                    game.hand.push(craftedItem)
                    animate = setInterval(function () { animateText1("You cut a piece of dragon's skin.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 34:
                if (currentPosition.y == 4 && currentPosition.x == 6) {
                    var craftedItem = findItem(35)
                    game.hand.splice(position, 1)
                    game.hand.push(craftedItem)
                    animate = setInterval(function () { animateText1("You used your tools to make shoes.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 35:
                if (currentPosition.y == 3 && currentPosition.x == 0) {
                    var craftedItem = findItem(36)
                    game.hand.splice(position, 1)
                    game.hand.push(craftedItem)
                    animate = setInterval(function () { animateText1("The King is impressed by your shoes.") }, 20)
                } else {
                    animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
                }
                break
            case 36:
                document.body.innerHTML = ""
                var outro = document.createElement("img")
                var winnerText = document.createElement("p")
                winnerText.innerHTML = "Congratulations!<br/>\
                    You saved the Cracov!"
                winnerText.style.fontFamily = 'Dratewka';
                winnerText.style.fontSize = "30px"
                winnerText.style.color = "rgb(255,191,0)"
                winnerText.style.position = "fixed"
                winnerText.style.left = "32%"
                winnerText.style.top = "10%"
                winnerText.style.textAlign = "center"
                document.body.append(winnerText)
                outro.style.width = "400px"
                outro.style.height = "400px"
                outro.src = "Materials/img/winner.jpg"
                outro.style.position = "fixed"
                outro.style.left = "50%"
                outro.style.top = "50%"
                outro.style.transform = "translate(-50%, -50%)"
                document.body.append(outro)
                outro.style.opacity = "0"
                oOpacity = 0
                increaseOpacity = setInterval(function () {
                    oOpacity += 0.066
                    outro.style.opacity = oOpacity
                }, 1000)
                break
            default:
                animate = setInterval(function () { animateText1("Nothing happened.") }, 20)
        }
    } else {
        animate = setInterval(function () { animateText1("You aren't carrying anything like that.") }, 20)
    }

    var itemsBox = document.getElementById("items")
    if (game.hand.length == 0) {
        itemsBox.innerHTML = "You carry nothing."
    }
    else {
        itemsBox.innerHTML = "You carry "
        for (let i = 0; i < game.hand.length; i++) {
            itemsBox.innerHTML += game.hand[i][1]
            if (i < game.hand.length - 1) {
                itemsBox.innerHTML += " ,"
            }
            else {
                itemsBox.innerHTML += "."
            }
        }
    }

    if (currentPosition.items.length == 0) {
        inSight.innerHTML = "You see nothing."
    } else {
        console.log("Zmiana tego co widzisz")
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