const http = require("http");
const fs = require("fs");
const path = require("path");

const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png" };

http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  const file = url === "/" ? "index.html" : url.slice(1);
  fs.readFile(path.join(process.cwd(), file), (err, data) => {
    if (err) { res.writeHead(404); res.end("404"); return; }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "text/plain" });
    res.end(data);
  });
}).listen(process.env.PORT || 3000, () => console.log("server ok"));
