/* Import node's http module: */
var http = require('http');
var handler = require('./request-handler.js');
var express = require('express');
var app = express();

var port = 3000;

var ip = '127.0.0.1';

var send = {
  results: [
    {
      username: 'justin',
      message: 'hello world'
    }

  ] 
};

app.get('/classes/messages', function(req, res) {
  console.log(req);
  res.json(send);
  
});


app.post('/classes/messages', function(req, res) {

  send.push({
    username: req.body.username,
    message: req.body.message
  });

  res.redirect('/classes/messages');
});
// var server = http.createServer(handler.requestHandler);


console.log('Listening on http://' + ip + ':' + port);
app.listen(port, ip);



