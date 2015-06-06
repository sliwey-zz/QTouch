var http = require("http"),
	url = require("url");

var port = 8888;

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;

        route(handle, pathname, request, response);
    }

    http.createServer(onRequest).listen(port);
    console.log("Server has started on port " + port);
}

exports.start = start;