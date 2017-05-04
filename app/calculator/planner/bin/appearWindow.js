
// trigger: what you're checking
// target: The box that triggers the trigger
// box: what's appearing
// condition (optional) : another condition. Takes the event parameters as argument
function disappearify(box){
  var runningAnim = false;
  if(!runningAnim){
    box.style.opacity = 1;
    runningAnim = setInterval(function(){
      box.style.opacity = Number(box.style.opacity) - 0.2;
      if(box.style.opacity <= 0){
        clearInterval(runningAnim);
        runningAnim = false;
        box.style.display = 'none';
      }
    },1000/30);
  }
}

// trigger: what you're checking e.g. 'click'
// target: The box that triggers the trigger
// box: what's disappearing
// condition (optional) : another condition. Takes the event parameters as argument
function appearify(box){
  var runningAnim = false;
  if(!runningAnim){
    box.style.opacity = 0;
    box.style.display = 'inherit';
    runningAnim = setInterval(function(){
      box.style.opacity = Number(box.style.opacity) + 0.2;
      if(box.style.opacity >= 1){
        clearInterval(runningAnim);
        runningAnim = false;
      }
    },1000/30);
  }
}
