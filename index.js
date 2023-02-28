//import JsonDB
import { JsonDB, Config } from "node-json-db";

// load standard library modules
const http = require("http"), fs = require("fs");

// address configuration
const hostname = "127.0.0.1";
const port = 3000;

// create database
const db = new JsonDB(new Config("db", true, true, "/"));

// database endpoint


// create server
const server = http.createServer((req, res) => {
    // 

    // 
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
