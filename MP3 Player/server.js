var http = require("http")
var fs = require("fs")
const qs = require("querystring")
const pretty = require("prettysize")

var types = {
    "mp4": "video/mp4",
    "mp3": "audio/mpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "css": "text/css",
    "js": "application/javascript",
    "ico": "image/x-icon",
    "txt": "text/plain"
}

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            readMimeType(req, res)
            break;
        case "POST":
            servResponse(req, res)
            break;
        default: break;
    }
})

server.listen(3000, function () {
    console.log("Serwer startuje na porcie 3000.")
});

function readMimeType(req, res) {
    var fileType
    var mimeType
    var filePath = decodeURI(req.url)

    if (filePath == "/") {
        fileType = "text/html"
        filePath = "/index.html"
        mimeType = "html"
    } else {
        index = filePath.lastIndexOf(".")
        mimeType = filePath.slice(index + 1, filePath.length)
        for (let i of Object.keys(types)) {
            if (i == mimeType) {
                fileType = types[i]
            }
        }
    }

    filePath = "static" + filePath

    if (fs.existsSync(filePath)) {

        if (filePath.endsWith("." + mimeType)) {
            fs.readFile(filePath, function (error, data) {
                res.writeHead(200, { 'Content-Type': fileType });
                res.write(data);
                res.end();
            })
        }
    } else {
        console.log("File not exists.")
    }
}

function servResponse(req, res) {
    var allData = ""

    req.on("data", function (data) {
        allData += data
    })

    req.on("end", function (data) {
        var finish = qs.parse(allData)

        if (finish.albums == "true") {
            sendCovers(res)
        }

        if (finish.id != undefined) {
            sendAlbum(finish.id, res)
        }

        if (finish.playlistName != undefined) {
            createPlaylist(res, finish.playlistName)
        }

        if (finish.songName != undefined) {
            console.log("Dodawanie piosenki.")
            addToPlaylist(res, finish.playlistId, finish.songName)
            // delete finish.songName
        }

        if (finish.load == "true") {
            updatePlaylists(res)
        }

        if (finish.plId != undefined) {
            console.log("Otwieram playlistę.")
            openPlaylist(res, finish.plId)
            // delete finish.playlistId
        }
    })
}

function sendCovers(res) {
    console.log("Wysyłam okładki")
    var folders = []
    var dirsAndFiles = {}

    fs.readdir("static/mp3", function (err, directories) {
        if (err) {
            return console.log(err);
        }

        directories.forEach(function (folderName) {
            folders.push(folderName)
        })
        dirsAndFiles.dirs = folders
        res.writeHead(200, { "content-type": "application/json;charset=utf-8" })
        res.end(JSON.stringify(dirsAndFiles))
    });
}

function sendAlbum(ordinal, res) {
    var folders = []
    var mpFiles = []
    var sizes = []
    var dirsAndFiles = {}

    fs.readdir("static/mp3", function (err, files) {
        if (err) {
            return console.log(err);
        }

        files.forEach(function (fileName) {
            folders.push(fileName)
        });

        dirsAndFiles.dir = folders[ordinal]

        fs.readdir("static/mp3/" + folders[ordinal], function (err, files) {
            if (err) {
                return console.log(err);
            }

            files.forEach(function (fileName) {
                if (!fileName.endsWith("jpg")) {
                    var stats = fs.statSync("static/mp3/" + folders[ordinal] + "/" + fileName);
                    mpFiles.push({ "file": fileName })
                    sizes.push({ "fileSize": pretty(stats.size) })
                }
            });
            dirsAndFiles.files = mpFiles
            dirsAndFiles.sizes = sizes

            res.writeHead(200, { "content-type": "application/json;charset=utf-8" })
            res.end(JSON.stringify(dirsAndFiles))
        });
    });
}

var playlists = {
    playlists: []
}

var id = 0

function createPlaylist(res, name) {
    playlist = []
    playlist.push(id)
    id++
    playlist.push(name)

    playlists.playlists.push(playlist)

    res.writeHead(200, { "content-type": "text/plain;charset=utf-8" })
    res.end(JSON.stringify(playlists))
}

function addToPlaylist(res, playlistId, name) {
    if (!playlists.playlists[playlistId].includes(name))
        playlists.playlists[playlistId].push(name)
    res.writeHead(200, { "content-type": "text/plain;charset=utf-8" })
    res.end(JSON.stringify(playlists))
}

function updatePlaylists(res) {
    res.writeHead(200, { "content-type": "text/plain;charset=utf-8" })
    res.end(JSON.stringify(playlists))
}

function openPlaylist(res, plId) {
    var playlist = {}
    playlist.names = []
    playlist.names.push(playlists.playlists[plId].slice(1))
    res.writeHead(200, { "content-type": "text/plain;charset=utf-8" })
    res.end(JSON.stringify(playlist))
}