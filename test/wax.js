/**
 * RequireJS configuration
 */
require.config({
  paths: {
    mocha: '../bower_components/mocha/mocha',
    chai: '../bower_components/chai/chai'
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

    it('should send text', function(done){
      var xhr = new Worker('/wax.js');
      var hello = "hello\nworld!";
      xhr.addEventListener('message', function(e){
        assert.equal(e.data, hello);
        done()
      });
      xhr.postMessage({post: '/test/fixtures/soh', text: hello});
    });

    it('should POST DataURL strings', function(done){
      var bird = "data:image/png;base64,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";
      var xhr = new Worker('/wax.js');

      xhr.addEventListener('message', function(e){
        done()
      });
      xhr.postMessage({post: '/test/fixtures/bird', text: bird});
    });

    it('should fire an error event', function(done){
      var xhr = new Worker('/wax.js');
      xhr.addEventListener('error', function(e){
        e.preventDefault();
        console.log('handle error', e.message, e.filename, e.lineno);
        assert.isTrue(/404/.test(e.message));
        done();
      });

      xhr.postMessage({ get: '/no/exist'});
    });

    it.skip('should POST FormData', function(done){
      var xhr = new Worker('/wax.js');
      var fd = new FormData();
      fd.append('id', 'soh');
      fd.append('title', 'South of Heaven');

      xhr.addEventListener('message', function(e){
        assert.deepEqual(e.data, soh);
        done()
      });
      xhr.postMessage({post: '/test/fixtures/soh', form: fd});
    });

  });

  // Start runner
  mocha.run();
});
