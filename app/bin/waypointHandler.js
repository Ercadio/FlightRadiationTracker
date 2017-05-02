var waypointList = [];
var selection = -1;
var counter = 4;
window.addEventListener('load', function() {
  const plus = document.getElementById('addPoint');
  const minus = document.getElementById('removePoint');
  const container = document.getElementById('waypointList-container-three');
  var obj;
  plus.addEventListener('mousedown', function(event) {
    obj = document.createElement('div');
    obj.className = 'pointlist';
    obj.style.display = 'none';
    obj.innerHTML = 'lat<input type=\'text\' class=\'coor\' id=\'lat' + counter + '\'/>     lon<input type=\'text\' class=\'coor\' id=\'lon' + counter + '\'/><br\>uptime<input class=\'coor\' id=\'time' + counter + '\'/>     alt<input type=\'text\' class=\'coor\' id=\'alt' + counter + '\'/><br\>';
    obj.id = 'point' + counter;
    waypointList.push(obj);
    container.appendChild(obj);
    appearify(obj);
    selection = obj.id;
    document.getElementById('lat' + counter).addEventListener('keyup', function() {
      selection = this.parentNode.id;
      updateMap();
    });
    document.getElementById('lon' + counter).addEventListener('keyup', function() {
      selection = this.parentNode.id;
      updateMap();
    });
    document.getElementById('time' + counter).addEventListener('keyup', function() {
      selection = this.parentNode.id;
      updateMap();
    });
    document.getElementById('alt' + counter).addEventListener('keyup', function() {
      selection = this.parentNode.id;
      updateMap();
    });
    counter++;
    updateMap();
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
