window.addEventListener('load', function() {
  const oriedit = document.getElementById('originCode');
  const oricode = document.getElementById('oricode');
  oriedit.addEventListener('keyup', function() {
    oricode.innerHTML = oriedit.value;
    updateMap();
  });
  const desedit = document.getElementById('destinationCode');
  const descode = document.getElementById('descode');
  desedit.addEventListener('keyup', function() {
    descode.innerHTML = desedit.value;
    updateMap();
  });
});

window.addEventListener('keydown', function(e) {
  if(inRange(e.which,48,57) || inRange(e.which,65,90 || e.which == 46 || e.which == 8)){
    updateMap();
  }
});


function inRange(value, min, max){
  return (value >= min && value <= max);
}
