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
		if(newPost[0]=='visitor'){
			var comments = fs.readFileSync("./html/event/data/comments.html", "utf8");
			response.write("</div><div id='visitorsComments'>Comments\n<ul>");
			response.write("<li class='post'>"+newPost[2]+"<br>"+newPost[1]+"</li>");
			response.write(comments);
			response.write("</ul>");
			var posts = fs.readFileSync('./html/event/data/posts.html', "utf8");
			response.write("</div><div id= 'bloggerComments'>Posts!\n<ul>");
			response.write(posts);
			response.write("\n</ul></div></div></body></html>");
			response.end();
		}
		else if(newPost[0]=='blogger'){
			var comments = fs.readFileSync("./html/event/data/comments.html", "utf8");
			response.write("</div><div id='visitorsComments'>Comments\n<ul>");
			response.write(comments);
			response.write("</ul>");
			var posts = fs.readFileSync('./html/event/data/posts.html', "utf8");
			response.write("</div><div id= 'bloggerComments'>Posts!\n<ul>");
			response.write("<li class='post'>"+newPost[2]+"<br>"+newPost[1]+"</li>");
			response.write(posts);
			response.write("\n</ul></div></div></body></html>");
			response.end();
		}
		saveComments(url_parts.query.author, newPost);
	}
	else{
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
}
function loadImage(response, request){
	response.writeHead(200,{"Content-Type":"image/png"});
	response.end(fs.readFileSync(request.pathname), binary);
}
function saveComments(author, newPost){
	console.log("Saving changes...");
	
	if(author=="visitor"){
		var oldComments = fs.readFileSync('./html/event/data/comments.html', "utf8");
		
		fs.writeFile('./html/event/data/comments.html',
				"<li class='comment'>"+
				newPost[2]+"<br>"+
				newPost[1]+
				"</li>"+"\n"+oldComments
			, function(err){
				if(err) throw err;
		});
	}
	else if(author=="blogger"){
		var oldPosts = fs.readFileSync('./html/event/data/posts.html', "utf8");
		fs.writeFile('./html/event/data/posts.html',
				"<li class='post'>"+
				newPost[2]+"<br>"+
				newPost[1]+
				"</li>"+"\n"+oldPosts
			, function(err){
				if(err) throw err;
		});
	}	
	console.log("Done!");
}

exports.start = start;
exports.event = event;
exports.saveComments = saveComments;
exports.loadImage = loadImage;