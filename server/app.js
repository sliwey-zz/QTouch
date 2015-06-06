var server = require("./server"),
	router = require("./router"),
	requestHandlers = require("./requestHandlers");

var handle = {};

handle["/"] = "/index.html";
handle["/check"] = requestHandlers.check;
handle["/list"] = requestHandlers.list;

server.start(router.route, handle);