# wax

**W**orker **a**nd **x**hr2.  
ajax actions on their own thread.

## Getting Started

```javascript
var wax = new Worker('wax.js');
wax.on('message', function(e){
  var greatAlbum = e.data;
});
wax.postMessage({post: 'slayer/albums', json: {year: 1986, title: 'Reign in Blood'}});
```

## Dependencies
A browser that supports [web workers](http://caniuse.com/#feat=webworkers). 
Tested in Chrome 30+, Firefox 26+, IE 10


## Test
`npm install`  
`bower install`  
`npm test`  

## TODO

* use supertest instead of adhock test server
* mow the lawn: grunt => gulp, requirejs => browserify
* add support for arraybuffer, blob, ??
    
  -  see: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data

 
* test CORS support 
  
  - see http://www.kendoui.com/blogs/teamblog/posts/11-10-03/using_cors_with_all_modern_browsers.aspx



-----------------------------

Copyright (c) 2014 tim walker

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
