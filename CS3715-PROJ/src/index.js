var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {};
handle["/"] = requestHandlers.start;
handle["/home"] = requestHandlers.start;
handle["/event"] = requestHandlers.event;
handle["/submitComment"] = requestHandlers.submitComment;
server.start(router.route, handle);