window.addEventListener('load', function() {
  pushFlight();
  const adder = document.getElementById('adder');
  adder.addEventListener('click', function(e) {
    pushFlight();
  });
});


var counter = 1;
function pushFlight(){
  const empty = {'ocode':'','dcode':'','counter':counter,'isCustom':false,'exposure':''};
  const field = document.getElementById('flights');
  var obj = document.createElement('div');
  obj.id = 'flight' + counter;
  var ocode = document.createElement('div');
  ocode.className = 'input';
  ocode.innerHTML = 'origin code';
  var input = document.createElement('input');
  input.type = 'text';
  input.id='originCode' + counter;
  input.className = 'text-field';
  input.addEventListener('keypress', function() {
    if(inRange(e.which,97,122)){
      this.value = this.value + e.key.toUpperCase();
      e.preventDefault();
    }
  });
  input.addEventListener('keyup', function() {
    if(/\d/.test(this.value) || this.value.length > 3){
      this.style['border-left'] = '0.25vh solid #db7a7a';
      this.style['color'] = '#db7a7a';
    }
    else if (this.value.length < 3) {
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
          Number(this.id.slice(0,this.id.length -1)) -1
        }
      });
    }
  });
  ocode.appendChild(input);
  obj.appendChild(ocode);
  var dcode = document.createElement('div');
  dcode.className = 'input';
  dcode.innerHTML = 'destination code';
  input = document.createElement('input');
  input.type = 'text';
  input.id='destinationCode' + counter++;
  input.className = 'text-field';
  dcode.appendChild(input);
  obj.appendChild(dcode);
  obj.innerHTML += '<span class="link">Customized flight plan</span>';
  flights.push(empty);
  field.appendChild(obj);
}





function inRange(value, min, max){
  return (value >= min && value <= max);
}


function customized(flightID){
  var f = searchCounter(flightID.slice(0,flightID.length - 1));
  if(f != null && !f.isCustom){
    f.isCustom = true;
    createFrame(f.counter);
  }
}


function searchCounter(c){
  obj = null;
  flights.forEach(n){
    if(n.counter === c){
      obj = n;
    }
  }
  return obj;
}
