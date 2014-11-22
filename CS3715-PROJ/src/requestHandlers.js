var querystring = require("querystring"),
fs = require("fs");
function start(response) {
	console.log("Request handler 'start' was called.");
	var body = fs.readFile("./html/index.html", function(error){
		if(error){
			throw error;
		}
	});

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}
	exports.start = start;