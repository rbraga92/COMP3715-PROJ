var querystring = require("querystring");
var fs = require("fs");
var url = require("url");
var commentArray = [];

function GET(response, path){
    console.log("Data submitted by the user name:  " + path.query.name);

}

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

function event(response, request){
	var url_parts = url.parse(request.url,true);
	console.log("Request handler 'event' was called.");

	fs.readFile("./html/event/event.html", function(error, html){
		if(error){
			throw error;
		}
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(html);
		if(Object.keys(url_parts.query).length!=0){
			console.log("Data submitted: "+url_parts.query.comments+" "+url_parts.query.author);
			var newString = url_parts.query.author+ ","+url_parts.query.comments + ","+new Date();
		    commentArray.push(newString);
		}
		saveComments();
		response.end();
		
	});
}
function saveComments(){
	console.log("Saving changes...");
	console.log(commentArray.length);
	for(var i = 0; i < commentArray.length; i++){
		fs.appendFile("./html/event/data/comments.txt", commentArray[i], function(err){
			if(error){
				console.log(error);
			}
			console.log(commentArray[i]);
		});
		fs.end();
	}
}

exports.start = start;
exports.event = event;