var http = require("http");
var fs = require("fs");
const qs = require("querystring");

var types = {
  mp4: "video/mp4",
  mp3: "audio/mpeg",
  jpg: "image/jpeg",
  png: "image/png",
  css: "text/css",
  js: "application/javascript",
  ico: "image/x-icon",
  txt: "text/plain",
  gif: "image/jpeg"
};

var server = http.createServer(function(req, res) {
  switch (req.method) {
    case "GET":
      readMimeType(req, res);
      break;
    case "POST":
      servResponse(req, res);
      break;
    default:
      break;
  }
});

server.listen(3000, function() {
  console.log("Serwer startuje na porcie 3000.");
});

function readMimeType(req, res) {
  var fileType;
  var mimeType;
  var filePath = decodeURI(req.url);

  if (filePath == "/") {
    fileType = "text/html";
    filePath = "/index.html";
    mimeType = "html";
  } else {
    index = filePath.lastIndexOf(".");
    mimeType = filePath.slice(index + 1, filePath.length);
    for (let i of Object.keys(types)) {
      if (i == mimeType) {
        fileType = types[i];
      }
    }
  }

  filePath = "static" + filePath;

  if (fs.existsSync(filePath)) {
    if (filePath.endsWith("." + mimeType)) {
      fs.readFile(filePath, function(error, data) {
        res.writeHead(200, { "Content-Type": fileType });
        res.write(data);
        res.end();
      });
    }
  } else {
    console.log("File not exists.");
  }
}

var users = [];

var colors = ["white", "black"];

function servResponse(req, res) {
  var allData = "";

  req.on("data", function(data) {
    allData += data;
  });

  req.on("end", function(data) {
    var finish = qs.parse(allData);
    switch (finish.action) {
      case "ADD_USER":
        addUser(res, finish);
        break;
      case "RESET":
        deleteUsers(res, finish);
        break;
    }

    if (finish.wait == "true") {
      if (users.length == 2) {
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify({ result: true }));
      } else {
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify({ result: false }));
      }
    }
  });
}

function addUser(res, finish) {
  if (users.includes(finish.user)) {
    var data = {
      action: "USER_ALREADY_EXISTS",
      user: ""
    };
    res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(data));
  } else {
    if (users.length < 2) {
      users.push(finish.user);
      console.log("Dodawanie usera.");
      console.log(users);
      if (colors.length == 2) {
        var position = Math.round(Math.random());
        console.log(position);
        finish.color = colors[position];
        colors.splice(position, 1);
        console.log(finish.color);
      } else {
        finish.color = colors[0];
        console.log(finish.color);
      }
      res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(finish));
    } else {
      var data = {
        action: "TOO_MANY_USERS",
        user: ""
      };
      res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(data));
    }
  }
}

function deleteUsers(res, finish) {
  console.log("Usuwanie userów.");
  users = [];
  colors = ["white", "black"];
  res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
  res.end(JSON.stringify(finish));
}
