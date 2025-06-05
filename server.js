const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'Core', req.url === '/' ? 'index.html' : req.url);

  console.log(`Serving file: ${filePath}`);  // log request

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

 fs.readFile(filePath, (err, content) => {
  if (err) {
    console.error('Error reading file:', err);
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
    } else {
      res.writeHead(500);
      res.end(`Server error: ${err.code}`);
    }
  } else {
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);  // no encoding here
  }
});
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
