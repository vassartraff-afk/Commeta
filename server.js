const http = require("http");
const fs = require("fs");
const path = require("path");

const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };

http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  const file = url === "/" ? "index.html" : url.slice(1);
  fs.readFile(path.join(process.cwd(), file), (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain" }); res.end("404"); return; }
    const ext = path.extname(file);
    const headers = { "Content-Type": MIME[ext] || "text/plain" };
    if (ext === ".html") headers["Cache-Control"] = "no-store, no-cache, must-revalidate";
    else headers["Cache-Control"] = "public, max-age=300";
    res.writeHead(200, headers);
    res.end(data);
  });
}).listen(process.env.PORT || 3000, () => console.log("server ok"));
