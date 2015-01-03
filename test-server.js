var http = require('http'),
  path = require('path'),
  fs = require('fs'),
  express = require('express'),
  bodyParser = require('body-parser');

var app = module.exports = express();

app
  .set('port', process.env.PORT || 8000)
  .set('host', process.env.HOST || 'localhost');

app
  .use(express.static(__dirname))
  .use(bodyParser.json());

// TODO: routes for unit test fixures: post, put, patch, delete, cors xhr
app.post('/test/fixtures/soh', function(req, res){

  res.format({
    'text/plain': function(){
      // WORKAROUND: body parser is converts to json, and content type is text/html
      res.set('Content-Type', 'text/plain');
      res.send("hello\nworld!");
    },

    'application/json': function(){
      res.send(req.body);
    }
  });

});
app.put('/test/fixtures/soh', function(req, res){
  res.json(req.body);
});
app.delete('/test/fixtures/soh', function(req, res){
  res.sendStatus(204);
});
// for image dataURI post
app.post('/test/fixtures/bird', function(req, res){
  res.sendStatus(200);
});

app.all('/dev/null/:timeout', function(req, res){
  setTimeout(function(){
    res.sendStatus(200)
  }, req.params.timeout)

});

/*
app.get('/:filename', function(req, res){
  var filePath = path.join('/test/fixtures/', req.params.filename);

});
*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('test server at: http://' + app.get('host') + ':' + app.get('port') + '/test/');
});
