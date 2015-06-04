var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = "/index.html";
handle["/check"] = requestHandlers.check;
handle["/list"] = requestHandlers.list;

handle["/api/getDistance"] = requestHandlers.getDistance;

server.start(router.route, handle);