class Ui {

    constructor() {
        console.log("Konstruktor klasy Ui")
        this.clicked = false
        this.resume = false
        this.files = []
        this.indexOcf = 0
        this.albumName = null
        this.createdPlaylist = false
        this.lft = 5
        this.selectedId = null
        this.scrolled = 0
        this.firstAddClick = false
        this.song = null
        this.playlistName = null
    }

    sendAlbums(name) {
        for (let i = 0; i < name.dirs.length; i++) {
            var img = $("<img>")
            img.addClass("cover")
            img.attr("id", i)
            img.attr("src", "mp3/" + name.dirs[i] + "/image.jpg")
            $("#images").append(img)
        }
        ui.clicks()
    }

    sendAlbum(name) {
        $("#content").html(" ")
        ui.clicked = false
        ui.albumName = name.dir
        ui.files = []
        ui.indexOcf = 0
        this.createTable(name)
        this.createControls(name.dir + "/" + name.files[0].file)
        $("#trackTitle").html(name.files[0].file)
        this.hovers()
        this.clickToPlay()
        this.clickToAddPlaylist()
    }

    clicks() {
        $(".cover").click(function (event) {
            net.readAlbum(event.target.id)
        })
        $("#showVisualisation").click(function () {
            $("#root").css({
                "display": "block"
            })
            $("#leave").click(function () {
                $("#root").css({
                    "display": "none"
                })
            })
        })
    }

    hovers() {
        $("tr").mouseover(function () {
            if (!$(this).hasClass("actual")) {
                $(this).css({
                    'background': '#66cc66',
                    'cursor': 'pointer'
                })
            }
        })
        $("tr").mouseout(function () {
            if (!$(this).hasClass("actual")) {
                $(this).css({ 'background': '' })
            }
        })
    }


    clickToAddPlaylist() {
        $(".addToPlaylist").click(function () {

            ui.song = $(this).attr("id")

            var overlay = $("<div>")
            overlay.addClass("overlay")
            overlay.appendTo("body")

            $(".overlay").on("click", function () {
                $(".overlay").remove()
                ui.scrolled = 0
                $(".playlistBox").css({
                    "display": "none",
                    "top": "0"
                })
            })

            if (!ui.firstAddClick) {
                console.log("PIERWSZE KLIKNIĘCIE.")
                net.loadPlaylists()
                var playlistBox = $("<div>")
                playlistBox.addClass("playlistBox")

                playlistBox.appendTo("body")
                ui.firstAddClick = true

                var playlistName = $("<input>")
                playlistName.addClass("playlistName")
                playlistBox.append(playlistName)

                var createPlaylistIcon = $("<img>")
                createPlaylistIcon.attr("src", "graphics/createPlaylist.png")
                createPlaylistIcon.addClass("createPlaylistIcon")
                playlistBox.append(createPlaylistIcon)

                if (!this.createdPlaylist) {
                    var addPlaylist = $("<p>")
                    addPlaylist.html("Nie masz jeszcze żadnej playlisty. Stwórz ją wpisując jej nazwę w polu powyżej oraz klikając ikonkę obok.")
                    addPlaylist.addClass("addPlaylist")
                    playlistBox.append(addPlaylist)
                }
                $(".createPlaylistIcon").click(function () {
                    ui.playlistName = $(".playlistName").val()
                    net.createPlaylist(ui.playlistName)
                    $(".addPlaylist").html("Możesz stworzyć nową playlistę lub dodać do istniejącej.")
                })
            } else {
                ui.song = $(this).attr("id")
                $(".playlistBox").css({
                    "display": "block"
                })
            }

            function scrollElement() {
                if (ui.scrolled < 35) {
                    ui.scrolled += 1
                    $(".playlistBox").css("top", ui.scrolled + "%")
                } else {
                    clearInterval(animate)
                }
            }
            var animate = setInterval(scrollElement, 5)
        })
    }

    clickToPlay() {
        $(".playIt").click(function (event) {
            if (!ui.clicked) {
                changeDuration()
                checkStatus()
                console.log("Pierwsze wywołanie.")
                $(this).closest("tr").addClass("clicked")
                $(".actual").removeClass("actual")
                $(this).closest("tr").addClass("actual")
                event.currentTarget.src = "graphics/stop.png"
                $(".playButton").attr("src", "graphics/stop.png")
                $("#trackTitle").html($(this).closest("tr").children(':nth-child(2)').html())
                ui.indexOcf = $(this).closest("tr").attr("id")
                console.log(ui.indexOcf)
                $(".playButton").attr("id", event.target.id)
                music.loadMusic(event.target.id)
                music.playMusic()
                ui.clicked = true
            } else {
                if (!$(this).closest("tr").hasClass("clicked")) {
                    changeDuration()
                    checkStatus()
                    console.log("-----------------------------------------------")
                    console.log("Inny jest już kliknięty ale ten można kliknąć.")
                    $(".clicked").find("img:eq(0)").attr("src", "graphics/play.png")
                    $(".actual").css("background", "")
                    $(".actual").removeClass("clicked")
                    $(".actual").removeClass("actual")
                    music.stopMusic()
                    $(".playButton").attr("src", "graphics/stop.png")
                    $(".playButton").attr("id", event.target.id)
                    $(this).closest("tr").addClass("clicked")
                    $(this).closest("tr").addClass("actual")
                    $(this).attr("src", "graphics/stop.png")
                    ui.resume = false
                    ui.indexOcf = $(this).closest("tr").attr("id")
                    console.log(ui.indexOcf)
                    $("#trackTitle").html($(this).closest("tr").children(':nth-child(2)').html())
                    music.loadMusic(event.target.id)
                    music.playMusic()
                } else {
                    if (!ui.resume) {
                        console.log("-----------------------------------------------")
                        console.log("Jest kliknięty i go pauzujesz.")
                        $(this).attr("src", "graphics/play.png")
                        $(this).closest("tr").removeClass("clicked")
                        $(this).closest("tr").css("background", "#33aa55")
                        $(".playButton").attr("src", "graphics/play.png")
                        ui.resume = !ui.resume
                        music.pauseMusic()
                    } else {
                        console.log("-----------------------------------------------")
                        console.log("Jest kliknięty i go wznawiasz.")
                        $(this).attr("src", "graphics/stop.png")
                        $(".playButton").attr("src", "graphics/stop.png")
                        ui.resume = !ui.resume
                        music.playMusic()
                        checkStatus()
                    }
                }
            }
        })

        $(".playButton").on("click", function (event) {
            if (ui.clicked) {
                ui.resume = !ui.resume
            }
            ui.clicked = true
            if (!ui.resume) {
                console.log("-----------------------------------------------")
                console.log("Przycisk główny włącza muzykę.")
                $(this).attr("src", "graphics/stop.png")
                $(".actual").find("img:eq(0)").attr("src", "graphics/stop.png")
                $(".actual").attr("class", "actual clicked")
                // music.loadMusic(event.target.id)
                music.playMusic()
                changeDuration()
                checkStatus()
            } else {
                console.log("-----------------------------------------------")
                console.log("Przycisk główny pauzuje muzykę.")
                $(".clicked").css("background", "#33aa55")
                $(".clicked").removeClass("clicked")
                $(this).attr("src", "graphics/play.png")
                $(".actual").find("img:eq(0)").attr("src", "graphics/play.png")
                music.pauseMusic()
            }
        })

        $(".prev").on("click", function () {
            if (ui.indexOcf > 0) {
                changeDuration()
                checkStatus()
                console.log("-----------------------------------------------")
                console.log("Wciśnięty prev.")
                music.stopMusic()
                ui.resume = false
                ui.clicked = true
                var tmp = $(".actual")
                tmp.find("img:eq(0)").attr("src", "graphics/play.png")
                tmp.prev().attr("class", "actual clicked")
                tmp.prev().find("img:eq(0)").attr("src", "graphics/stop.png")
                tmp.css("background", "")
                tmp.removeAttr("class", "actual")
                ui.indexOcf--
                console.log("Prev: " + ui.indexOcf)
                $(".playButton").attr("id", ui.albumName + "/" + ui.files[ui.indexOcf])
                $(".playButton").attr("src", "graphics/stop.png")
                $("#trackTitle").html(ui.files[ui.indexOcf])
                music.loadMusic($('.playButton').attr('id'))
                music.playMusic()
            } else {
                console.log("Nie da się w tył.")
            }
        })

        $(".next").on("click", function () {
            if (ui.indexOcf < ui.files.length - 1) {
                changeDuration()
                checkStatus()
                console.log("-----------------------------------------------")
                console.log("Wciśnięty next.")
                music.stopMusic()
                ui.resume = false
                ui.clicked = true
                var tmp = $(".actual")
                tmp.find("img:eq(0)").attr("src", "graphics/play.png")
                tmp.next().attr("class", "actual clicked")
                tmp.next().find("img:eq(0)").attr("src", "graphics/stop.png")
                tmp.css("background", "")
                tmp.removeAttr("class", "actual")
                ui.indexOcf++
                console.log("Next: " + ui.indexOcf)
                $(".playButton").attr("id", ui.albumName + "/" + ui.files[ui.indexOcf])
                $(".playButton").attr("src", "graphics/stop.png")
                $("#trackTitle").html(ui.files[ui.indexOcf])
                music.loadMusic($('.playButton').attr('id'))
                music.playMusic()
            }
        })
    }

    createControls(mp3Source) {
        $(".playButton").remove()
        $(".prev").remove()
        $(".next").remove()
        $("#audio").html(" ")

        var previous = document.createElement("img")
        var play = document.createElement("img")
        var next = document.createElement("img")

        previous.src = "graphics/previous.png"
        play.src = "graphics/play.png"
        next.src = "graphics/next.png"

        play.setAttribute("id", mp3Source)
        play.setAttribute("class", "playButton")
        previous.setAttribute("class", "prev")
        next.setAttribute("class", "next")

        var source = document.createElement("source")
        source.setAttribute("src", "mp3/" + mp3Source)
        source.setAttribute("id", "audio_src")
        source.setAttribute("audio", "audio/mp3")

        $("#audio").append(source)

        music.loadMusic(mp3Source)

        console.log("-----------------------------")
        console.log("Ładowanie nowej piosenki.")
        changeDuration()
        changeProgress()

        $("#downBar").append(previous, play, next)
    }

    createPlaylist(playlists) {
        $(".playlist").remove()
        console.log("Playlista", playlists)
        if (playlists.playlists.length > 1)
            $(".addPlaylist").html("Możesz stworzyć nową playlistę lub dodać do istniejącej.")
        ui.lft = 5
        for (let i = 0; i < playlists.playlists.length; i++) {
            var playlist = $("<div>")
            playlist.addClass("playlist")
            playlist.css({
                "left": ui.lft + "%"
            })

            if (i == ui.selectedId) {
                console.log("Zaznaczam jako aktywną wcześniej wybraną playlistę(Po dodaniu nowej).")
                playlist.addClass("activePlaylist")
                var addButton = $("<button>")
                var openButton = $("<button>")
                addButton.addClass("addButton")
                openButton.addClass("openButton")
                addButton.html("Dodaj")
                openButton.html("Otwórz")
                playlist.append(addButton, openButton)
            }
            playlist.attr("id", playlists.playlists[i][0])
            ui.lft += 25
            playlist.append($("<p>").html(playlists.playlists[i][1]))

            $(".playlistBox").append(playlist)
        }
        ui.addEvents()
        $(".playlist").on("click", function () {
            if (!$(this).hasClass("activePlaylist")) {
                $(".activePlaylist").find(".addButton").remove()
                $(".activePlaylist").find(".openButton").remove()
                $(".activePlaylist").removeClass("activePlaylist")
                var addButton = $("<button>")
                var openButton = $("<button>")
                addButton.addClass("addButton")
                openButton.addClass("openButton")
                addButton.html("Dodaj")
                openButton.html("Otwórz")
                $(this).append(addButton, openButton)
                ui.addEvents()
                $(".activePlaylist").css({
                    "background": "black"
                })
                $(this).addClass("activePlaylist")
                ui.selectedId = $(this).attr("id")
            }
            console.log(ui.selectedId)
        })
    }

    loadPlaylists(playlists) {
        this.createPlaylist(playlists)
    }

    addEvents() {
        console.log("Dodaję eventy.")
        $(".addButton").click(function () {
            console.log("Wywołanie: " + ui.song)
            net.addToPlaylist(ui.selectedId, ui.song)
            $(".addPlaylist").html("Dodano piosenkę " + ui.song + ".")
        })
        $(".openButton").click(function () {
            net.openPlaylist(ui.selectedId)
            console.log("Otwarcie playlisty.")
            $(".addPlaylist").html("Otwarto playlistę nr " + (parseInt(ui.selectedId) + 1) + ".")
        })
    }

    openPlaylist(playlist) {
        console.log(playlist)
        $("#content").html(" ")
        ui.files = []
        ui.clicked = false
        ui.albumName = playlist.names[0][1].split("/")[0]
        ui.indexOcf = 0

        var table = $("<table>")
        var th = $("<th>")
        th.attr("colspan", "3")
        th.html(playlist.names[0][0])
        table.append(th)
        $("#content").append(table)
        for (let i = 1; i < playlist.names[0].length; i++) {
            console.log(i)
            ui.files.push(playlist.names[0][i].split("/")[1])
            if (i == 1) {
                var tr = $("<tr>")
                tr.attr("id", i)
                tr.addClass("actual")
                tr.append($("<td>").html(playlist.names[0][i].split("/")[0]))
                tr.append($("<td>").html(playlist.names[0][i].split("/")[1]))
                tr.append(
                    $("<td>").html($("<img>").attr("id", playlist.names[0][i])
                        .addClass("playIt")
                        .css({
                            "width": "30px",
                            "height": "30px"
                        })
                        .attr("src", "graphics/play.png"))
                )
                table.append(tr)
            } else {
                var tr = $("<tr>")
                tr.attr("id", i)
                tr.append($("<td>").html(playlist.names[0][i].split("/")[0]))
                tr.append($("<td>").html(playlist.names[0][i].split("/")[1]))
                tr.append(
                    $("<td>").html($("<img>").attr("id", playlist.names[0][i])
                        .addClass("playIt")
                        .css({
                            "width": "30px",
                            "height": "30px"
                        })
                        .attr("src", "graphics/play.png"))
                )
                table.append(tr)
            }
        }
        ui.createControls(playlist.names[0][1])
        ui.hovers()
        ui.clickToPlay()
    }

    createTable(names) {
        var table = $("<table>")
        var th = $("<th>")
        th.attr("colspan", "5")
        th.html(names.dir)
        table.append(th)
        $("#content").append(table)
        for (let i = 0; i < names.files.length; i++) {
            ui.files.push(names.files[i].file)
            if (i == 0) {
                var tr = $("<tr>")
                tr.attr("id", i)
                tr.addClass("actual")
                tr.append($("<td>").html(names.dir))
                tr.append($("<td>").html(names.files[i].file))
                tr.append($("<td>").html(names.sizes[i].fileSize))
                tr.append(
                    $("<td>").html($("<img>").attr("id", names.dir + "/" + names.files[i].file)
                        .addClass("playIt")
                        .css({
                            "width": "30px",
                            "height": "30px"
                        })
                        .attr("src", "graphics/play.png"))
                )
                tr.append(
                    $("<td>").html($("<img>").attr("id", names.dir + "/" + names.files[i].file)
                        .addClass("addToPlaylist")
                        .css({
                            "width": "30px",
                            "height": "30px"
                        })
                        .attr("src", "graphics/add.png"))
                )
                table.append(tr)
            } else {
                var tr = $("<tr>")
                tr.attr("id", i)
                tr.append($("<td>").html(names.dir))
                tr.append($("<td>").html(names.files[i].file))
                tr.append($("<td>").html(names.sizes[i].fileSize))
                tr.append(
                    $("<td>").html($("<img>").attr("id", names.dir + "/" + names.files[i].file)
                        .addClass("playIt")
                        .css({
                            "width": "30px",
                            "height": "30px"
                        })
                        .attr("src", "graphics/play.png"))
                )
                tr.append(
                    $("<td>").html($("<img>").attr("id", names.dir + "/" + names.files[i].file)
                        .addClass("addToPlaylist")
                        .css({
                            "width": "30px",
                            "height": "30px"
                        })
                        .attr("src", "graphics/add.png"))
                )
                table.append(tr)
            }
        }
    }
}

function prettyTime(time) {
    // console.log("Czas " + time)
    var minutes = Math.floor(time / 60)
    var seconds = time - minutes * 60
    seconds = Math.round(seconds)
    if (seconds == 60) {
        seconds = 0
        minutes += 1
    }
    return minutes + ":" + seconds
}

function changeDuration() {
    $("#audio").on("loadedmetadata", function () {
        console.log("Zmiana trwania piosenki.")
        $("#duration").html(prettyTime(music.getDuration()))
    })
}
function changeProgress() {
    console.log("Zmiana progressu.")
    $("#currentTime").html(prettyTime(music.getCurrentTime()))
    updateProgressBar(music.getCurrentTime(), music.getDuration())
}

function isPaused(audio) {
    return audio.prop("paused")
}

function checkStatus() {
    var check = setInterval(function () {
        // console.log($("#audio").prop("currentTime"))
        if (!isPaused($("#audio"))) {
            changeProgress()
        } else {
            console.log("Czyszczę intervala.")
            clearInterval(check)
        }
    }, 1000)
}

function updateProgressBar(cProgress, duration) {
    $("#currentProgress").css({
        "width": cProgress / duration * 100 + "%"
    })
}