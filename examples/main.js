require([], function(){

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var img = new Image();
  img.addEventListener('load', function(e){
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
  }, false);
  img.src= 'cat-photo.jpg';

  var urlForm = document.querySelector('form.dataurl-form');
  var postCount = 0;
  urlForm.addEventListener('submit', function(e){
    console.log('dataurl submitted to worker');
    e.preventDefault();
    var wax = new Worker('/wax.js');
    wax.addEventListener('message', function(e){
      console.log('dataurl number '+ (postCount++) +' posted')
    });

    wax.postMessage({post: '/dev/null/10000', text: canvas.toDataURL()});

  }, false);

});
