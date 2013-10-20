/**
 * wax - worker and xhr
 * An asychronous web worker using xhr synchronously.
 *
 * Currently supported content types:
 * json
 * text
 *
  */
self.addEventListener('message', function(e){
  var isVerb = /get|post|put|delete|patch/i;
  var verb = Object.keys(e.data).filter(isVerb.test, isVerb)[0];

  var mime = 'json';
  for(var p in mimeMap){
    if(e.data.hasOwnProperty(p)){
      mime = p;
      //data = e.data[p];
    }
  }
  // allow mime override
  if(e.data.mime) mime = e.data.mime;

  request({
    verb: verb.toUpperCase(),
    url: e.data[verb],
    mime: mime,
    json: e.data.json || null,
    text: e.data.text || null
  });

  self.close();
});

var mimeMap = {
  //form: 'application/x-www-form-urlencoded; charset=utf-8', // xhr default
  //form: 'multipart/form-data; charset=utf-8'
  json: 'application/json',
  text: 'text/plain'
};

var request = function request(options){
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onLoad, false);
  //xhr.addEventListener('error', onError, false);
  var data = null;

  if(options.json) data = JSON.stringify(options.json);
  if(options.text) data = options.text;

  // synchronous xhr since webworker has a thread
  xhr.open(options.verb, options.url, false);
  xhr.setRequestHeader('Content-Type', mimeMap[options.mime]);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send(data);

}

function onLoad(e){
  //currentTarget, srcElement, target,
  var xhr = e.target,
    resType = xhr.getResponseHeader('content-type'),
    isNotJson = resType && !/json/.test(resType);

  if(xhr.status < 300){
    self.postMessage(isNotJson ? xhr.responseText : JSON.parse(xhr.responseText));
  } else {
    // TODO: find a way to trigger error event
  }
}

function onError(e){
  //var xhr = e.target;
  // console.log('onError hit')
  //e.preventDefault();
  //throw new ErrorEvent('FOO')
  //throw e;
  //throw new Error();
  //self.dispatchEvent('error')
}