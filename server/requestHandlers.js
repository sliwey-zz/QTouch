var url = require("url"),
    util = require("util"),
    querystring = require("querystring");

function start(request, response) {
    console.log("strat method");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<div>Hello World</div>");
    response.end();
}

//POST
function check(request, response) {
    var str = '';

    request.on("data", function(chunk) {
        str += decodeURIComponent(chunk);
    });

    request.on("end", function() {
        var param = JSON.parse(str);
        var data = {};

        if (param.value == "hehe") {
            data.isUnique = false;
        } else {
            data.isUnique = true;
        }

        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(util.format('%j', data));
        response.end();
    });
}

//GET
function list(request, response) {
    var param = url.parse(request.url, true).query;

    console.log(param);
    if (param.callback) {
        var callback = param.callback;
        delete param.callback;
    }

    var resopnse = callback + "(" + util.format('%j', param) + ")";

    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(resopnse);
    response.end();

}

function getDistance(request, response) {
    var param = url.parse(request.url, true).query;
    var obj = {};
    var str;

    if (param.distance == "null") {
        obj.distance = 2000;
    } else {
        obj.distance = (param.distance - 600) > 0 ? (param.distance - 600) : 0;
    }

    if (param.callback) {
        str = param.callback + "(" + util.format('%j', obj) + ")";
    } else {
        str = util.format('%j', obj);
    }

    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(str);
    response.end();
}

exports.start = start;
exports.check = check;
exports.list = list;
exports.getDistance = getDistance;
