var http = require('http')
  , path = require('path')
  , fs = require('fs')
  , express = require('express');

var app = module.exports = express();

app
  .set('port', process.env.PORT || 8000)
  .set('host', process.env.HOST || 'localhost');

app
  .use(express.favicon())
  .use(express.logger('dev'))
  .use(express.static(__dirname))
  .use(express.bodyParser())
  .use(app.router)
  .use(express.errorHandler({showStack: true, dumpExceptions: true}));

// TODO: routes for unit test fixures: post, put, patch, delete, cors xhr
app.post('/test/fixtures/soh', function(req, res){
  /*
  res.format({
    'text/plain': function(){
      res.send(req.body);
    },

    'application/json': function(){
      res.send(req.body);
    }
  });
  */

  if (req.is('json')) {
    res.json(req.body)
  } else {
    // WORKAROUND: body parser is converting to json, and content type is text/html
    res.set('Content-Type', 'text/plain');
    res.send("hello\nworld!");
  }

});
app.put('/test/fixtures/soh', function(req, res){
  res.json(req.body);
});
app.del('/test/fixtures/soh', function(req, res){
  res.send(204);
});

/*
app.get('/:filename', function(req, res){
  var filePath = path.join('/test/fixtures/', req.params.filename);

});
*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('test server at: http://' + app.get('host') + ':' + app.get('port') + '/test/');
});
