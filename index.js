//Load HTTP module
const http = require("http"), fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
    //just load index.html for now ()
    fs.readFile("index.html", (err, data) => {
	res.writeHead( 200, {"Content-Type": "text/html", "Content-Length": data.length } );
	res.write(data);
	res.end();
    });
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
