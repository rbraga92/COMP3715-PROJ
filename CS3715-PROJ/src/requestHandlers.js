var querystring = require("querystring"),
fs = require("fs");
function start(response) {
	console.log("Request handler 'start' was called.");
	fs.readFile("./html/index.html", function(error, html){
		if(error){
			throw error;
		}
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
		
	});
	

}

function event(response){
	console.log("Request handler 'event' was called.");
	fs.readFile("./html/event/event.html", function(error, html){
		if(error){
			throw error;
		}
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
		
	});
}
function create(res){
	console.log("Request Handler 'create' was called");
	fs.writeFile("./html/event/event1/test.html", "<html><body><h1>If you can see this, everything worked.</h1></body></html>", function(error){
		
		if(error){
			console.log("Failure");
		}
		else{
			console.log("Success");
		}
		event(res);
	});
}

exports.start = start;
exports.event = event;
exports.create = create;