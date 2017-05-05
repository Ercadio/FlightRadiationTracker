const averageSpeed = 250;


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

  const flightID = document.getElementById('flightID');
  flightID.addEventListener('keyup', function() {
    if(isNaN(Number(this.value))){
      this.style['border-left'] = '0.25vh solid #db7a7a';
      this.style['color'] = '#db7a7a';
    }
    else if(this.value != ''){
      this.style['border-left'] = '';
      this.style['color'] = '';
      var routeRequest = new XMLHttpRequest();
      routeRequest.open('GET','../../flight?flightID=' + this.value);
      routeRequest.onreadystatechange = function(){
        if(routeRequest.responseText != ''){
          const route = JSON.parse(routeRequest.responseText);
          const totalTime = route.distance / averageSpeed / 60;
          if(route.fromICAO){
            document.getElementById('waypointList-container-three').innerHTML = '';
            waypointList = [];
            document.getElementById('originCode').value = route.fromICAO;
            document.getElementById('destinationCode').value = route.toICAO;
            document.getElementById('oricode').innerHTML = route.fromICAO;
            document.getElementById('descode').innerHTML = route.toICAO;
            document.getElementById('oritime').value = totalTime * 0.02;
            document.getElementById('destime').value = totalTime * 0.02;
            const list = route.route.nodes;
            var index = Math.floor((list.length - 20)/2);
            if(index < 1) index = 1;
            document.getElementById('lat0').value = list[index].lat;
            document.getElementById('lon0').value = list[index].lon;
            document.getElementById('alt0').value = list[index].alt;
            const len = list.length - 2;
            if(len > 20) len = 20;
            document.getElementById('time0').value = totalTime * 0.96 / len;
            for(var i = index + 1; i < index + len; i++){
              var ul = addWay();
              document.getElementById('lat' + ul).value = list[i].lat;
              document.getElementById('lon' + ul).value = list[i].lon;
              document.getElementById('alt' + ul).value = list[i].alt;
              document.getElementById('time' + ul).value = totalTime * 0.96 / len;
            }
            validateCode(route.fromICAO,function(res){
                document.getElementById('originCode').style['border-left'] = '';
                document.getElementById('originCode').style['color'] = '';
                oridesPoints[0] = {'lat':Number(res.lat),'lng':Number(res.lon)};
            });
            validateCode(route.toICAO,function(res){
                document.getElementById('destinationCode').style['border-left'] = '';
                document.getElementById('destinationCode').style['color'] = '';
                oridesPoints[1] = {'lat':Number(res.lat),'lng':Number(res.lon)};
            });
            var midpoints = document.getElementById('waypointList-container-three').children;
            for(var child in midpoints){
              waypointList.push(child);
            }
            if(fullField()){
              var radiationRequest = new XMLHttpRequest();
              radiationRequest.open('GET','../../grad?' + getFormParam());
              radiationRequest.onreadystatechange = function(){
                document.getElementById('tExpo').innerHTML = Number(radiationRequest.responseText).toFixed(5);
                document.getElementById('totalDuration').innerHTML = timeSum();
              }
              radiationRequest.send();
            }
            updateMap();
          }
        }
      }
      routeRequest.send();
    }
  });
});

window.addEventListener('keydown', function(e) {
  if(inRange(e.which,48,57) || inRange(e.which,65,90 || e.which == 46 || e.which == 8)){
    updateMap();
    if(fullField()){
      var radiationRequest = new XMLHttpRequest();
      radiationRequest.open('GET','../../grad?' + getFormParam());
      radiationRequest.onreadystatechange = function(){
        document.getElementById('tExpo').innerHTML = Number(radiationRequest.responseText).toFixed(5);
        document.getElementById('totalDuration').innerHTML = timeSum();
      }
      radiationRequest.send();
    }
  }
});
window.addEventListener('load', function() {
  document.getElementById('originCode').addEventListener('keypress', function(e){
    if(inRange(e.which,97,122)){
      this.value = this.value + e.key.toUpperCase();
      e.preventDefault();
    }
  });
  document.getElementById('originCode').addEventListener('keyup', function(e) {
    if(/\d/.test(this.value) || this.value.length > 4){
      this.style['border-left'] = '0.25vh solid #db7a7a';
      this.style['color'] = '#db7a7a';
    }
    else if (this.value.length < 4) {
      this.style['border-left'] = '';
      this.style['color'] = '';
    }
    else{
      validateCode(this.value,function(res){
        if(!res.isValid){
          document.getElementById('originCode').style['border-left'] = '0.25vh solid #db7a7a';
          document.getElementById('originCode').style['color'] = '#db7a7a';
        }
        else{
          document.getElementById('originCode').style['border-left'] = '';
          document.getElementById('originCode').style['color'] = '';
          oridesPoints[0] = {'lat':Number(res.lat),'lng':Number(res.lon)};
        }
      });
    }
  });

  document.getElementById('destinationCode').addEventListener('keypress', function(e){
    if(inRange(e.which,97,122)){
      this.value = this.value + e.key.toUpperCase();
      e.preventDefault();
    }
  });
  document.getElementById('destinationCode').addEventListener('keyup', function(e) {
    if(/\d/.test(this.value) || this.value.length > 4){
      this.style['border-left'] = '0.25vh solid #db7a7a';
      this.style['color'] = '#db7a7a';
    }
    else if (this.value.length < 4) {
      this.style['border-left'] = '';
      this.style['color'] = '';
    }
    else{
      validateCode(this.value,function(res){
        if(!res.isValid){
          document.getElementById('destinationCode').style['border-left'] = '0.25vh solid #db7a7a';
          document.getElementById('destinationCode').style['color'] = '#db7a7a';
        }
        else{
          document.getElementById('destinationCode').style['border-left'] = '';
          document.getElementById('destinationCode').style['color'] = '';
          oridesPoints[1] = {'lat':Number(res.lat),'lng':Number(res.lon)};
        }
      });
    }
  });
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



function validateCode(code,callback){
  var codeRequest = new XMLHttpRequest();
  codeRequest.open('GET','../../aircode?code=' + code);
  codeRequest.onreadystatechange = function(){
    if(codeRequest.responseText != ''){
      callback(JSON.parse(codeRequest.responseText));
    }
  }
  codeRequest.send();
}
