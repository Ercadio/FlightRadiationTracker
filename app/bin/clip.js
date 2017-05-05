window.addEventListener('load', function(e) {
  startAnim();
});

function startAnim(){
  var canvas = document.getElementById('clip');
  var ctx = canvas.getContext('2d');
  var time = 0;
  var clip = setInterval(function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    setClip(0,5 * 30,function(){
      setClip(60,70,function(){
        rotate(Math.PI / 2 /10);
        translate(0,50);
      });
      setClip(0,70,function(){
        putText('fleepy',canvas.width * 0.1,canvas.height * 0.2,canvas.width * 0.1);
      });
      setClip(15,70,function(){
        putText('is',canvas.width * 0.4,canvas.height * 0.2,canvas.width * 0.1);
      });
      setClip(20,70,function(){
        putText('a',canvas.width * 0.5,canvas.height * 0.2,canvas.width * 0.1);
      });
      setClip(25,70,function(){
        putText('web-based',canvas.width * 0.1,canvas.height * 0.5,canvas.width * 0.15);
      });
      setClip(40,70,function(){
        putText('application',canvas.width * 0.1,canvas.height * 0.7,canvas.width * 0.13);
      });
      if(time === 70){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      setClip(70,120,function(){
        putText('radiation',canvas.width * 0.1,canvas.height * 0.4,canvas.width * 0.13);
      });
      setClip(95,120,function(){
        putText('manager',canvas.width * 0.1,canvas.height * 0.7,canvas.width * 0.13);
      });
      setClip(120,150,function(){
        putText('(WARM)',canvas.width * 0.25,canvas.height * 0.6,canvas.width * 0.13);
      });
    });
    time += 1;
    if(time >= 30 * 30){
      clearInterval(clip);
      clip = false;
    }
  },1000/30);


  function setClip(start,end,call){
    if(time >= start && time <= end){
      call();
    }
  }

  function putText(txt,x,y,size){
    ctx.font = "900 " + size + "px 'Arimo', sans-serif";
    ctx.fillText(txt,x,y);
  }
  function rotate(angle){
    ctx.rotate(angle);
  }
  function translate(x,y){
    ctx.translate(x,y);
  }
}
