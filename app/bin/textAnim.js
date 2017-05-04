window.addEventListener('load', function(e) {
  document.getElementById('whatis').children[0].style['text-shadow'] = '0px 0px 6px #c5baff';
  var direction = 0.5;
  setInterval(function(){
    var val = Number(document.getElementById('whatis').children[0].style['text-shadow'].slice(27,-2));
    if(val >= 15 || val <= 5){
      direction *= -1;
    }
    val += direction;
    document.getElementById('whatis').children[0].style['text-shadow'] = '0px 0px ' + val + 'px #c5baff';
  },1000/30);
});
