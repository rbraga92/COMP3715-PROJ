var querystring = require("querystring");
var fs = require("fs");
var url = require("url");
var commentArray = new Array();
var postArray = new Array();
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
		response.end();
		if(Object.keys(url_parts.query).length == 2){
			var now = new Date();
			console.log("Data submitted: "+url_parts.query.comments+" "+url_parts.query.author);

			var newPost = [url_parts.query.author,url_parts.query.comments,now];
			if(url_parts.query.author == ("blogger")){
				postArray.push(newPost);
			}
			else if(url_parts.query.author == ("visitor")){
				commentArray.push(newPost);
			}
		    
			saveComments();
				
		}
		loadComments(response);

		
	});
}
function saveComments(){
	console.log("Saving changes...");
	fs.writeFile('./html/event/data/comments.txt',"<ul>", function(err){
		if(err) throw err;
	});
	for(var i = 0; i < commentArray.length; i++){
		fs.appendFile('./html/event/data/comments.txt',
					"<li class = 'comment'>"+
					commentArray[i][2]+"<br>"+
					commentArray[i][1]+
					"</li>"
				, function(err){
			if(err) throw err;
		});
	}
	fs.appendFile('./html/event/data/comments.txt', "</ul>", function(error){
		if(error){
			throw error;
		}
	});

	
	fs.writeFile('./html/event/data/posts.txt',"<ul>", function(err){
		if(err) throw err;
	});
	for(var i = 0; i < postArray.length; i++){
		fs.appendFile('./html/event/data/posts.txt',
					"<li class = 'post'>"+
					postArray[i][2]+"<br>"+
					postArray[i][1]+
					"</li>"
				, function(err){
			if(err) throw err;
		});
	}
	fs.appendFile('./html/event/data/posts.txt', "</ul>", function(error){
		if(error){
			throw error;
		}
	});
	
	
	
	console.log("Done!");
}
function loadComments(res){
	fs.readFile('./html/event/data/comments.txt', function(error, commentString){
		if(error){
			throw error;
		}
		
		res.writeHead(200,{"Content-Type":"text/html"});
		res.write(commentString.toString());
		
		res.end();
	});
}
exports.start = start;
exports.event = event;
exports.loadComments = loadComments;
exports.saveComments = saveComments;