var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var sent = {
  results: []
};

var send = function(response, statusCode) {

  data = statusCode !== 404 ? JSON.stringify(sent) : null;

  response.writeHead(statusCode, headers);
  response.end(data);
};

exports.requestHandler = function(request, response) {
  var methods = ['GET', 'POST', 'OPTIONS'];
  var statusCode;
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (request.options === 'OPTIONS') {
    statusCode = 202;
  } else if (request.url !== '/classes/messages' || methods.indexOf(request.method) === -1) {
    statusCode = 404;

  } else if (request.method === 'GET') {
    statusCode = 200;

  } else if (request.method === 'POST') {
    statusCode = 201;

    request.on('data', (chunk) => {
      sent.results.push(JSON.parse(chunk));
    });

  }

  send(response, statusCode);

};

