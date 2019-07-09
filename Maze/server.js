var express = require("express")
var app = express()
var bodyParser = require("body-parser")
const PORT = 3000;

//nasłuch na określonym porcie

app.listen(PORT, function () { 
    console.log("Start serwera na porcie " + PORT )
})

app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true })); 

var levels = []
var saved = false
var currentLevel = 0

app.post("/save", function (req, res) {
    levels.push(req.body.level)
    saved = true
    console.log("Levele na serwerze po save: ")
    console.log(JSON.stringify(levels))
    res.send(levels)
})

app.post("/update", function (req, res) {
    levels[req.body.id] = req.body.level
    console.log("Levele na serwerze po update: ")
    console.log(JSON.stringify(levels))
    res.send(levels)
})

app.get("/saved", function (req, res) {
    res.send(saved)
    console.log("Stan zapisu(saved):" + saved)
})

app.get("/added", function () {
    saved = false
    console.log("Stan zapisu(added):" + saved)
})

app.post("/changeLevel", function (req, res) {
    currentLevel = req.body.selectedLevel
    console.log("Obecnie wybrany level" + currentLevel)
})

app.get("/getLevelsQuantity", function (req, res) {
    console.log("Ile leveli:" + levels.length)
    res.send((levels.length).toString())
})

app.post("/load", function (req, res) {
    console.log("Zażądany level do załadowania:")
    console.log(JSON.stringify(levels[req.body.id]))
    res.send(levels[req.body.id])
})

app.post("/level", function (req, res) {
    console.log("Pobieranie leveli.")
    res.send(levels[req.body.id])
})

app.get("/getSelectedLevel", function (req, res) {
    res.send(currentLevel.toString())
    console.log("Pobieranie obecnego levela.")
    console.log(currentLevel)
})