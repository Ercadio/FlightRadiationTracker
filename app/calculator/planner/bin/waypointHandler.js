var waypointList = [document.getElementById('point0')];
var selection = -1;
var counter = 1;






window.addEventListener('load', function() {
  const plus = document.getElementById('addPoint');
  const minus = document.getElementById('removePoint');
  const container = document.getElementById('waypointList-container-three');
  var obj;
  plus.addEventListener('mousedown', function(event) {
    if(waypointList.length < 20){
      obj = document.createElement('div');
      obj.className = 'pointlist';
      obj.style.display = 'none';
      obj.innerHTML = 'lat(deg)<input type=\'text\' class=\'coor\' id=\'lat' + counter + '\'/>              lon(deg)<input type=\'text\' class=\'coor\' id=\'lon' + counter + '\'/>‌<br\>uptime (min)<input class=\'coor\' id=\'time' + counter + '\'/>     alt (ft)<input type=\'text\' class=\'coor\' id=\'alt' + counter + '\'/><br\>';
      obj.id = 'point' + counter;
      waypointList.push(obj);
      container.appendChild(obj);
      appearify(obj);
      selection = obj.id;
      document.getElementById('lat' + counter).addEventListener('keyup', function() {
        selection = this.parentNode.id;
        if(isNaN(Number(this.value))){
          this.style['border-bottom'] = '0.25vh solid #db7a7a';
          this.style['color'] = '#db7a7a';
        }
        else{
          this.style['border-bottom'] = '';
          this.style['color'] = '';
        }
        updateMap();
      });
      document.getElementById('lat' + counter).addEventListener('click', function() {
        selection = this.parentNode.id;
      });
      document.getElementById('lon' + counter).addEventListener('keyup', function() {
        selection = this.parentNode.id;
        if(isNaN(Number(this.value))){
          this.style['border-bottom'] = '0.25vh solid #db7a7a';
          this.style['color'] = '#db7a7a';
        }
        else{
          this.style['border-bottom'] = '';
          this.style['color'] = '';
        }
        updateMap();
      });
      document.getElementById('lon' + counter).addEventListener('click', function() {
        selection = this.parentNode.id;
      });
      document.getElementById('time' + counter).addEventListener('keyup', function() {
        selection = this.parentNode.id;
        if(isNaN(Number(this.value))){
          this.style['border-bottom'] = '0.25vh solid #db7a7a';
          this.style['color'] = '#db7a7a';
        }
        else{
          this.style['border-bottom'] = '';
          this.style['color'] = '';
        }
        updateMap();
      });
      document.getElementById('time' + counter).addEventListener('click', function() {
        selection = this.parentNode.id;
      });
      document.getElementById('alt' + counter).addEventListener('keyup', function() {
        selection = this.parentNode.id;
        if(isNaN(Number(this.value))){ // Error
          this.style['border-bottom'] = '0.25vh solid #db7a7a';
          this.style['color'] = '#db7a7a';
        }
        else{
          this.style['border-bottom'] = '';
          this.style['color'] = '';
        }
        updateMap();
      });
      document.getElementById('alt' + counter).addEventListener('click', function() {
        selection = this.parentNode.id;
      });
      counter++;
      updateMap();
    }
  });
  minus.addEventListener('mousedown', function(event) {
    if(selection != -1){
      var deletion = document.getElementById(selection);
      disappearify(deletion);
      deletion.parentNode.removeChild(deletion);
      waypointList.splice(waypointList.indexOf(deletion),1);
      selection = -1;
      updateMap();
    }
  });
});
