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
    if(fullField()){

      var radiationRequest = new XMLHttpRequest();
      radiationRequest.open('GET',window.location.href + 'grad?' + getFormParam());
      radiationRequest.onreadystatechange = function(){
        document.getElementById('tExpo').innerHTML = Number(radiationRequest.responseText).toFixed(5);
        document.getElementById('totalDuration').innerHTML = timeSum();
      }
      radiationRequest.send();
    }
  }
});
document.getElementById('originCode').addEventListener('keypress', function(e){
  if(inRange(e.which,65,90)){
    this.value = this.value + e.key.toUpperCase();
    e.preventDefault();
  }
});
document.getElementById('originCode').addEventListener('keyup', function(e) {
  if(/\d/.test(this.value)){
    this.style['border-left'] = '0.25vh solid #db7a7a';
    this.style['color'] = '#db7a7a';
  }
  else{
    this.style['border-left'] = '';
    this.style['color'] = '';
  }
});
document.getElementById('destinationCode').addEventListener('keydown', function(e) {
  var val = this.value;
  if(e.which === 8){
    val = this.value.slice(0,-1);
  }
  if(inRange(e.which,65,90)){
    e.preventDefault();
    this.value += e.key.toUpperCase();
  }
  else if(/\d/.test(val + e.key)){
    this.style['border-left'] = '0.25vh solid #db7a7a';
    this.style['color'] = '#db7a7a';
  }
  else{
    this.style['border-bottom'] = '';
    this.style['color'] = '';
  }
});

function inRange(value, min, max){
  return (value >= min && value <= max);
}

function getFormParam(){
  var fields = 'DateOfFlight=' + '00%2F2017' + '&Ocode=' + String(document.getElementById('originCode').value) + '&DCode=' + String(document.getElementById('destinationCode').value) + '&NumOfSteps=' + String(waypointList.length) + '&ClimbTime=' + String(document.getElementById('oritime').value) + '&MinDown=' + String(document.getElementById('destime').value);
  var i = 1;
  waypointList.forEach(function(elm){
    fields += '&StepAlt_' + String(i) + '=' + String(elm.children[4].value);
    fields += '&StepMin_' + String(i) + '=' + String(elm.children[3].value);
    i++;
  });
  fields += '&btnSubmit=Continue';
  return fields;
}


function timeSum(){
  var sum = 0;
  waypointList.forEach(function(point){
    sum += Number(point.children[3].value);
  });
  sum += Number(document.getElementById('oritime').value);
  sum += Number(document.getElementById('destime').value);
  return sum;
}
