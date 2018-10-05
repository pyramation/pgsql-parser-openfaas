'use strict';

const parser = require('pgsql-parser');

module.exports = (context, callback) => {
  let contentType = null;
  let content = null;

  switch (process.env.content_type) {
  case 'application/sql':
  case 'application/x-sql':
    content = parser.parse(context).query;
    contentType = 'application/json';
    break;
  case 'application/json':
    content = parser.deparse(context)
    contentType = 'text/plain';
    break;
  default:
    throw new Error('unsupported!');
  }

  callback(undefined, {
    contentType,
    content
  });
};