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

	var html = fs.readFileSync("./html/event/event.html", "utf8");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
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
	var comments = fs.readFileSync("./html/event/data/comments.html", "utf8");
	response.write("</div><div id='visitorsComments'>Comments\n<ul>");
	response.write(comments);
	response.write("</ul>");
	var posts = fs.readFileSync('./html/event/data/posts.html', "utf8");
	response.write("</div><div id= 'bloggerComments'>Posts!\n<ul>");
	response.write(posts);
	response.write("\n</ul></div></div></body></html>");
	response.end();
}
function saveComments(){
	console.log("Saving changes...");

	for(var i = 0; i < commentArray.length; i++){
		fs.appendFile('./html/event/data/comments.html',
					"<li class = 'comment'>"+
					commentArray[i][2]+"<br>"+
					commentArray[i][1]+
					"</li>"
				, function(err){
			if(err) throw err;
		});
	}
	for(var i = 0; i < postArray.length; i++){
		fs.appendFile('./html/event/data/posts.html',
					"<li class = 'post'>"+
					postArray[i][2]+"<br>"+
					postArray[i][1]+
					"</li>"
				, function(err){
			if(err) throw err;
		});
	}
	
	
	
	console.log("Done!");
}

exports.start = start;
exports.event = event;
exports.saveComments = saveComments;