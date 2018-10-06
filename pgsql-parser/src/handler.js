'use strict';

const parser = require('pgsql-parser');

const handler = (context, callback) => {
  let contentType = null;
  let content = null;

  try {
    switch (context.contentType) {
    case 'application/sql':
    case 'application/x-sql':
      content = parser.parse(context.content).query;
      contentType = 'application/json';
      break;
    case 'application/json':
      content = parser.deparse(JSON.parse(context.content));
      contentType = 'text/plain';
      break;
    default:
      throw new Error('unsupported!');
    }
  } catch (e) {
    return callback(e);
  }

  callback(undefined, {
    contentType,
    content
  });
};

const getStdin = require('get-stdin');

getStdin().then(content => {
  handler({content, contentType: process.env.Http_Content_Type}, (err, res) => {
    if (err) {
      return process.stderr.write(err);
    }
    if (isArray(res) || isObject(res)) {
      process.stdout.write(JSON.stringify(res));
    } else {
      process.stdout.write(res);
    }
  });
}).catch(e => {
  process.stderr.write(e.stack + '');
});

const isArray = (a) => {
  return (!!a) && (a.constructor === Array);
};

const isObject = (a) => {
  return (!!a) && (a.constructor === Object);
};
