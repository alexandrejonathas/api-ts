"use strict";
exports.__esModule = true;
var http = require("http");
var server = http.createServer();
var port = 3000;
server.listen(port, function () {
    console.log("Server rodando na porta " + port);
});
