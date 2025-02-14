const http = require("http");
const path = require("path");
const fs = require("fs");

const port = 3000;

// Set the base directory to your project's root
const baseDir = __dirname;

const server = http.createServer((req, res) => {
    // Normalize path and prevent directory traversal
    let requestPath = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');

    // Default to index.html for root
    if (requestPath === "/") requestPath = "index.html";

    // Construct absolute path
    const request = path.join(baseDir, requestPath);
    const exe = path.extname(request).toLowerCase();

    const module = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".png": "image/png"
    };

    const contentType = module[exe] || "application/octet-stream";

    console.log("Requested File Path:", request); // Debugging

    // Check if the file exists
    fs.access(request, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("File Not Found:", request); // Debugging
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("404: File Not Found!");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            const fileStream = fs.createReadStream(request);
            fileStream.pipe(res);
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
