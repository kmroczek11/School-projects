var net
var ui
var music
var visual
$(document).ready(function () {
    net = new Net()
    music = new Music()
    ui = new Ui()
    visual = new Visual()
    net.readAlbum(0)
})