/**
 * RequireJS configuration
 */
require.config({
  paths: {
    mocha: '../lib/mocha/js/mocha',
    chai: '../lib/chai/chai'
  },

  shim: {
    mocha: {
      exports: 'mocha'
    }
  }
});

/**
 * Unit test
 */
require(['mocha', 'chai'], function(mocha, chai, wax){
  // Setup
  var assert = chai.assert
  mocha.setup('bdd');
  /*
  function send(msg){
    msg = msg || {get: '/api/eggs/blue'};
    var xhr = new Worker('/wax.js');
    xhr.addEventListener('message', function(e){console.log('Worker returned: ', e.data)});
    xhr.postMessage(msg);
  }

  send({get: '/test/fixtures/reign-in-blood.json'});
  send({post: '/test/fixtures', json: {title: 'South of Heaven', year:1988}});
  send({put: '/test/fixtures/reign-in-blood', text: 'text title');
  send({post: '/test/fixtures/reign-in-blood', form: new FormData(elForm));
  // TORESEARCH: xhr.send(new FormData());
  //  see https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/Sending_forms_through_JavaScript
  */

  describe('xhr worker is god damn hard to test', function() {

    it('should GET json', function(done){
      var xhr = new Worker('/wax.js');
      assert.isObject(xhr);

      xhr.addEventListener('message', function(e){
        console.log('Worker returned: ', e.data);
        assert.equal(e.data.id, 'rib');
        done()
      });
      xhr.postMessage({get: '/test/fixtures/reign-in-blood.json'});

    });

    it('should POST json', function(done){
      var xhr = new Worker('/wax.js');
      var soh = {id:"soh", title: "South of Heaven"};
      xhr.addEventListener('message', function(e){
        assert.deepEqual(e.data, soh);
        done()
      });
      xhr.postMessage({post: '/test/fixtures/soh', json: soh});
    });

    it('should PUT json', function(done){
      var xhr = new Worker('/wax.js');
      var soh = {id:"soh", title: "South of Heaven Updated"};
      xhr.addEventListener('message', function(e){
        assert.deepEqual(e.data, soh);
        done()
      });
      xhr.postMessage({post: '/test/fixtures/soh', json: soh});
    });

    it('should DELETE', function(done){
      var xhr = new Worker('/wax.js');
      xhr.addEventListener('message', function(e){
        done();
      });
      xhr.postMessage({"delete": '/test/fixtures/soh'});
    });

    it('should send text', function(){

    });

    it('should parse json but leave other content types alone', function(){

    });

    it('should PUT', function(){

    });

    it('should PATCH', function(){

    });

    it.skip('should fire an error event', function(done){
      var xhr = new Worker('/wax.js');
      xhr.addEventListener('error', function(e){
        //console.log('error happened', e);
        //e.message + ' (' + e.filename + ':' + e.lineno + ')');
        assert.isTrue(true);
        done()
      });

      xhr.postMessage({ get: '/no/exist'});

    });

  });

  // Start runner
  mocha.run();
});
