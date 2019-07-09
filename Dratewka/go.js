function go(direction) {
    if (currentPosition.y == 3 && currentPosition.x == 1 && !game.died && direction == "WEST") {
        animate = setInterval(function () {
            text = "You can't go that way."
            if (length < text.length) {
                document.getElementById("notifications").innerHTML += text[length]
                length++
            } else {
                length = 0
                animate = clearInterval(animate)
                setTimeout(function () {
                    document.getElementById("notifications").innerHTML = ""
                    text = "The dragon sleeps in a cave!"
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
    } else {
        if (currentPosition.directions.includes(direction)) {
            animate = setInterval(function () {
                animateText2("You are going " + direction + "...",
                    function () {
                        switch (direction) {
                            case "NORTH":
                                game.playerPositionY = game.playerPositionY - 1
                                game.setPosition(game.playerPositionY, game.playerPositionX)
                                break
                            case "SOUTH":
                                game.playerPositionY = game.playerPositionY + 1
                                game.setPosition(game.playerPositionY, game.playerPositionX)
                                break
                            case "EAST":
                                game.playerPositionX = game.playerPositionX + 1
                                game.setPosition(game.playerPositionY, game.playerPositionX)
                                break
                            case "WEST":
                                game.playerPositionX = game.playerPositionX - 1
                                game.setPosition(game.playerPositionY, game.playerPositionX)
                                break
                        }
                    }, 20)
            })
        } else {
            animate = setInterval(function () { animateText1("You can't go that way.") }, 20)
        }
        console.log(animate)
    }
}