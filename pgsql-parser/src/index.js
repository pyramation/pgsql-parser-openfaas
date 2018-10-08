const handler = require('./handler');

const http = require('http');

function middleware(request, response) {
  let body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    request.body = body;
    handler(request, response);
  });
}

http.createServer((request, response) => {
  if (request.method === 'POST' || request.method === 'GET') {
    middleware(request, response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(7777);
