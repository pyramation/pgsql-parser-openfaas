const parser = require('pgsql-parser');

module.exports = (request, response) => {

  let contentType = null;
  let content = null;
  let statusCode = 200;

  try {
    switch (request.headers['content-type']) {
    case 'application/sql':
    case 'application/x-sql':
    case 'text/plain':
      content = JSON.stringify(parser.parse(request.body).query);
      contentType = 'application/json';
      break;
    case 'application/json':
      content = parser.deparse(JSON.parse(request.body));
      contentType = 'text/plain';
      break;
    default:
      throw new Error('unsupported type!');
    }
  } catch (e) {
    statusCode = 500;
    content = e.message;
    contentType = 'text/plain';
  }

  response.setHeader('Content-Type', contentType);
  response.statusCode = statusCode;
  response.end(content);

};