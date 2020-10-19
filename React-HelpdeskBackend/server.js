var path = require("path");
var express = require("express");
const compression = require('compression');

var DIST_DIR = path.join(__dirname, "dist");
var PORT = 8082;
var app = express();

app.use(compression());
//Serving the files on the dist folder
console.log(DIST_DIR);
app.use(express.static(DIST_DIR));

app.use(express.static('public'));
app.get('*.js', (req, res, next) => {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	next();
});
//Send index.html when the user access the web
app.get("*", function (req, res) {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT);