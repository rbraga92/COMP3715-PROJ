var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {};
handle["/"] = requestHandlers.start;
handle["/home"] = requestHandlers.start;
handle["/event"] = requestHandlers.event;
handle["/create"] = requestHandlers.create;
server.start(router.route, handle);