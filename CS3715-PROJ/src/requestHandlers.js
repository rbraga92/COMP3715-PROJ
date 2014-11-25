var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var util = require("util");
var counter = 0;
var commentArray = {};
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
function submitComment(res, req){
	console.log("Request handler 'submitComment' was called");
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		var commentFile = fs.createWriteStream("./data/comments.txt");
		commentFile.on('error',function(error){
			console.log(error);
			
		});
		commentArray[counter] = fields.commentText;
		commentArray.forEach(function(v){
			commentFile.write(v.join(", ") + "\n");
		});
		
	});
}

exports.start = start;
exports.event = event;
exports.submitComment = submitComment;