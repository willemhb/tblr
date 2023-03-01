// load standard library modules
const http = require("http"), fs = require("fs");

// address configuration
const hostname = "127.0.0.1";
const port = 3000;

function readDB(table, pk) {
    let out = null;

    fs.readFile("db.json", (err, data) => {
	let db = JSON.parse(data);

	out    = db?.[table]?.[pk];
    });

    return out;
}

function writeDB(table, pk, data) {
    let db, out;

    fs.readFile("db.json", (err, data) => {
	db = JSON.parse(data);
    });

    if (data === null) { // delete record
	delete db[table][pk];
	out = {
	    message: `record ${pk} in ${table} deleted successfully.`
	};
    }

    else if (pk == null) { // add record
	pk = `${Object.keys(db[table]).length}`; // TODO: decide how primary keys are created
	db[table][pk] = data;
	out = {
	    message: `record ${pk} in ${table} added successfully.`,
	    data: data
	};
    }

    else { // update record
	out = {
	    message: `record ${pk} in ${table} updated successfully.`,
	    data: Object.assign(db[table][pk], data)
	};
    }

    fs.writeFile("db.json", JSON.stringify(db), (err) => {
	if (err)
	    throw err;

	console.log("Successful db write.");
    });

    return out;
}

function api(req, res) {
    let [, table, pk ] = req.path.split("/");
}

// create server
const server = http.createServer((req, res) => {
    if (/api/gi.exec(req.path)) { // API
	api(req, res);
    } else {
	fs.readFile("index.html", (err, data) => { // serve home page
	    res.writeHead(200, { "Content-Type": "text/html", "Content-Length": data.length });
	    res.write(data);
	    res.end();
	});
    }
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
