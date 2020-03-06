class Hex {
    constructor() {
        console.log("Konstruktor klasy hex.")

        this.level =
            {
                "size": 3,
                "level": []
            }

        this.id = 0

        this.selectedLevel = 0

        this.size = 3

        this.type = "wall"

        this.clearLevel()

        this.changeLevel()

        this.createElements(3)

        this.saveLevel()

        this.loadLevel()

        this.changeType()

        this.addLevel()
    }

    clearLevel() {
        $("#size").on("change", function () {
            hex.size = parseInt($(this).val())
            hex.level.level = []
            hex.level.size = hex.size
            $("#showLevel").html(" ")
            hex.createElements(hex.size)
        })
    }

    changeLevel() {
        $("#levels").on("change", function (event) {
            var value = $(this).val()
            net.checkIfSaved(function (saved) {
                if (saved) {
                    value = parseInt(value)
                    console.log("Numer poziomu: ", value)
                    hex.selectedLevel = value
                    net.changeCurrentLevel(hex.selectedLevel)
                    net.loadLevel(hex.selectedLevel)
                } else {
                    event.preventDefault()
                    alert("Nie zapisano na serwerze.")
                }
            })
        })
    }

    saveLevel() {
        $("#save").on("click", function () {
            var save = confirm("Zapisać level?", save)
            if (save) {
                if (hex.level.level == []) {
                    alert("Nie można zapisać pustego poziomu.")
                } else {
                    net.checkIfSaved(function (saved) {
                        if (!saved) {
                            net.saveLevel(hex.level)
                        } else {
                            console.log("Ten sam.")
                            net.updateLevel(hex.selectedLevel, hex.level)
                            alert("Zaktualizowano level.")
                        }
                    })
                }
            }
        })
    }

    loadLevel() {
        $("#load").on("click", function () {
            net.checkIfSaved(function (saved) {
                if (saved) {
                    net.loadLevel(hex.selectedLevel)
                }
                else
                    alert("Nie zapisano na serwerze.")
            })
        })
    }

    changeType() {
        $("#wall").on("click", function () {
            hex.type = "wall"
        })
        $("#enemy").on("click", function () {
            hex.type = "enemy"
        })
        $("#treasure").on("click", function () {
            hex.type = "treasure"
        })
        $("#light").on("click", function () {
            hex.type = "light"
        })
    }

    addLevel() {
        $("#add").on("click", function () {
            net.checkIfSaved(function (saved) {
                console.log(saved)
                if (saved) {
                    hex.level = {
                        "size": hex.size,
                        "level": []
                    }
                    console.log("Dodano level.")
                    net.checkLevelsQuantity(function (selectedLevel) {
                        if (selectedLevel != 0) {
                            $("#levels").append(
                                $("<option>").attr("value", selectedLevel).html("Level " + (selectedLevel + 1))
                            )
                            $("#levels").val(selectedLevel)
                        } else {
                            $("#levels").append(
                                $("<option>").attr("value", 1).html("Level 2")
                            )
                            $("#levels").val(1)
                        }
                    })
                    hex.id = 0//wyzerowanie id dla przyszłych tworzonych hexów
                    hex.createElements(hex.size)
                    net.addedLevel()
                    console.log(hex.selectedLevel)
                    hex.selectedLevel += 1
                    console.log(hex.selectedLevel)
                } else {
                    alert("Najpierw zapisz level.")
                }
            });
        })
    }

    createElements(size) {
        $("#area").html(" ")
        var leftOf = 340
        var topOf = 25
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                var element = $("<div>")
                element.addClass("hex")

                element.css({
                    "top": topOf + "px",
                    "left": leftOf + "px",
                })

                element.attr("id", j + " " + i)

                this.clickElement(element)

                $("#area").append(element)

                leftOf += 95

                if (j % 2 == 0) {
                    topOf += 55
                } else {
                    topOf -= 55
                }
            }
            leftOf = 340

            if (size % 2 == 0) {
                topOf += 110
            } else {
                topOf += 55
            }
        }
    }

    clickElement(element) {
        $(element).on("click", function () {
            if ($(this).children().length == 0) {
                var level = {}
                var elId = $(this).attr("id")
                var x = elId.split(" ")[0]
                var z = elId.split(" ")[1]
                level.id = hex.id
                level.x = x
                level.z = z
                level.dirOut = 0
                level.dirIn = 3
                level.type = hex.type
                hex.level.level.push(level)
                var dirp = $("<p>")
                dirp.addClass("dirp")
                dirp.html(0)
                $(this).append(dirp)
                var arrow = $("<div>")
                arrow.addClass("arrow")
                $(this).append(arrow)
                hex.id++
                $("#showLevel").html(JSON.stringify(hex.level, null, 5))
            } else {
                var elId = $(this).attr("id")
                var x = elId.split(" ")[0]
                var z = elId.split(" ")[1]
                for (let i = 0; i < hex.level.level.length; i++) {
                    if (hex.level.level[i].x == x && hex.level.level[i].z == z) {
                        if (hex.level.level[i].dirOut != 5)
                            hex.level.level[i].dirOut++
                        else
                            hex.level.level[i].dirOut = 0
                        if (hex.level.level[i].dirIn != 5)
                            hex.level.level[i].dirIn++
                        else
                            hex.level.level[i].dirIn = 0

                        var angle = hex.level.level[i].dirOut * 60
                        hex.level.level[i].type = hex.type
                        $(this).find("div").css({
                            "transform": "rotate(" + angle + "deg)",
                            "-webkit-transform": "rotate(" + angle + "deg)",
                            "-moz-transform": "rotate(" + angle + "deg)",
                            "-ms-transform": "rotate(" + angle + "deg)",
                            "-o-transform": "rotate(" + angle + "deg)"
                        })
                        $(this).find("p").html(hex.level.level[i].dirOut)
                        $("#showLevel").html(JSON.stringify(hex.level, null, 5))
                    }
                }
            }
        })
    }

    updateHexes(level) {
        console.log("Wczytano z serwera.")
        console.log(level)
        hex.level = level
        hex.createElements(parseInt(level.size))
        $("#showLevel").html(JSON.stringify(level, null, 5))
        for (let i = 0; i < $("#area").children().length; i++) {
            var element = $("#area").children().eq(i)
            element.html(" ")
            for (let j = 0; j < level.level.length; j++) {
                var angle = level.level[j].dirOut * 60
                if (element.attr("id") == (level.level[j].x + " " + level.level[j].z)) {
                    // console.log("Znalazłem podanego diva i jest to div: ", element)
                    if (element.children().length == 0) {
                        var dirp = $("<p>")
                        dirp.addClass("dirp")
                        dirp.html(level.level[j].dirOut)
                        $(element).append(dirp)
                        var arrow = $("<div>")
                        arrow.addClass("arrow")
                        $(arrow).css({
                            "transform": "rotate(" + angle + "deg)",
                            "-webkit-transform": "rotate(" + angle + "deg)",
                            "-moz-transform": "rotate(" + angle + "deg)",
                            "-ms-transform": "rotate(" + angle + "deg)",
                            "-o-transform": "rotate(" + angle + "deg)"
                        })
                        var x = $(element).attr("id").split(" ")[0]
                        var z = $(element).attr("id").split(" ")[1]
                        $(element).append(arrow)
                    } else {
                        $(element).find(".dirp").html(level.level[j].dirOut)
                        $(element).find(".arrow").css({
                            "transform": "rotate(" + angle + "deg)",
                            "-webkit-transform": "rotate(" + angle + "deg)",
                            "-moz-transform": "rotate(" + angle + "deg)",
                            "-ms-transform": "rotate(" + angle + "deg)",
                            "-o-transform": "rotate(" + angle + "deg)"
                        })
                    }
                }
            }
        }
    }
}