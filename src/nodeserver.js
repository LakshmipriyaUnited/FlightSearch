var http = require('http');
var fs = require('fs');
const path = require("path");
//const file = fs.readFileSync();
http.createServer(function (req, res) {
  fs.readFile(path.resolve('..//src//flight-docs', "../flight-sample.json"), function(err, data) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.writeHead(200, {'Content-Type': 'json'});
    res.write(data);
    res.end();
  });
}).listen(3000);